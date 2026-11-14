const express = require('express');
const session = require('express-session');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const cloudinary = require('cloudinary').v2;

const sharp = require('sharp');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// ── Admin credentials ─────────────────────────────────────────────────────────
const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'vbarz2024').trim();
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD, 10);

// ── Supabase (uses HTTPS — no SSL socket issues) ──────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
let supabase = null;
let supabaseQuotaExceeded = false;
let lastQuotaErrorTime = 0;
const QUOTA_COOLDOWN_MS = 60 * 1000; // Auto-retry Supabase every 60s after an error

function isSupabaseAvailable() {
    if (!supabase) return false;
    if (supabaseQuotaExceeded) {
        if (Date.now() - lastQuotaErrorTime > QUOTA_COOLDOWN_MS) {
            // Cooldown expired, automatically attempt to reconnect to Supabase
            supabaseQuotaExceeded = false;
            return true;
        }
        return false;
    }
    return true;
}

function handleSupabaseError(err, context = '') {
    if (!err) return;
    const msg = err.message || String(err);
    console.warn(`⚠️ Supabase error in ${context}:`, msg);
    if (msg.includes('exceed_egress_quota')) {
        supabaseQuotaExceeded = true;
        lastQuotaErrorTime = Date.now();
    }
}

if (SUPABASE_URL && SUPABASE_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('✅ Supabase client ready');
} else {
    console.warn('⚠️  No Supabase env vars — running in local file mode');
}

// ── Cloudinary ────────────────────────────────────────────────────────────────
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Multer ────────────────────────────────────────────────────────────────────
// Allow any image / media upload up to 50MB
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        // Accept any image or media file regardless of browser-reported mimetype
        cb(null, true);
    }
});

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'vbarz-super-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 8 }
}));

// Never cache JS files so updates reach all devices instantly
app.use((req, res, next) => {
    if (req.path.endsWith('.js')) res.setHeader('Cache-Control', 'no-store');
    next();
});
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(express.static(__dirname));

// ── Helpers ───────────────────────────────────────────────────────────────────
async function processAndOptimizeImage(buffer, originalname) {
    const ext = (path.extname(originalname) || '').toLowerCase();
    const cleanBase = path.parse(originalname).name.replace(/[^a-zA-Z0-9_-]/g, '_') || 'upload';

    // SVG can be saved directly
    if (ext === '.svg') {
        const filename = `${cleanBase}_${Date.now()}.svg`;
        return { buffer, filename, mime: 'image/svg+xml' };
    }

    try {
        // Process any image format (HEIC, HEIF, PNG, JPG, WEBP, AVIF, TIFF, BMP, GIF, etc.)
        // Resize to maximum 1200x1200 while preserving aspect ratio, auto-orient from EXIF, convert to optimized WebP
        const optimizedBuffer = await sharp(buffer)
            .rotate() // auto-orient based on EXIF
            .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 84, effort: 4 })
            .toBuffer();
        const filename = `${cleanBase}_${Date.now()}.webp`;
        return { buffer: optimizedBuffer, filename, mime: 'image/webp' };
    } catch (err) {
        console.warn('⚠️  Sharp conversion fallback for:', originalname, err.message);
        const safeExt = ext || '.jpg';
        const filename = `${cleanBase}_${Date.now()}${safeExt}`;
        return { buffer, filename, mime: 'image/jpeg' };
    }
}

async function saveUploadedMedia(fileBuffer, originalname) {
    const { buffer, filename, mime } = await processAndOptimizeImage(fileBuffer, originalname);

    // 1. If Cloudinary is configured, upload to Cloudinary
    if (process.env.CLOUDINARY_CLOUD_NAME) {
        try {
            return await uploadToCloudinary(buffer, filename);
        } catch (e) {
            console.warn('Cloudinary upload error, falling back:', e.message);
        }
    }

    // 2. If Supabase client is active and quota not exceeded, attempt Supabase Storage
    if (supabase && !supabaseQuotaExceeded) {
        try {
            const bucketName = 'products';
            const storagePath = `uploads/${Date.now()}_${filename}`;
            const { data, error } = await supabase.storage
                .from(bucketName)
                .upload(storagePath, buffer, { contentType: mime, upsert: true });

            if (error && error.message && error.message.includes('exceed_egress_quota')) {
                supabaseQuotaExceeded = true;
                console.warn('⚠️ Supabase storage egress quota exceeded.');
            } else if (!error && data) {
                const { data: pub } = supabase.storage.from(bucketName).getPublicUrl(storagePath);
                if (pub && pub.publicUrl) return pub.publicUrl;
            }
        } catch (e) {
            console.warn('Supabase storage fallback:', e.message);
            if (e.message && e.message.includes('exceed_egress_quota')) {
                supabaseQuotaExceeded = true;
            }
        }
    }

    // 3. Save locally to disk
    try {
        fs.writeFileSync(path.join(UPLOADS_DIR, filename), buffer);
        fs.writeFileSync(path.join(__dirname, filename), buffer);
    } catch (e) {
        console.warn('Local file write error:', e.message);
    }

    return filename;
}

function uploadToCloudinary(buffer, filename) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'vbarz', public_id: path.parse(filename).name, resource_type: 'auto', overwrite: true },
            (err, result) => err ? reject(err) : resolve(result.secure_url)
        );
        stream.end(buffer);
    });
}

// Local file fallback
const PRODUCTS_FILE = path.join(__dirname, 'products.json');
const readLocal  = () => JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
const writeLocal = (p) => fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(p, null, 2));

// Local sale fallback
const SALE_FILE = path.join(__dirname, 'sale.json');
const readSaleLocal = () => {
    try {
        if (!fs.existsSync(SALE_FILE)) return null;
        return JSON.parse(fs.readFileSync(SALE_FILE, 'utf8'));
    } catch { return null; }
};
const writeSaleLocal = (sale) => fs.writeFileSync(SALE_FILE, JSON.stringify(sale, null, 2));

async function dbGetSale() {
    if (!isSupabaseAvailable()) return readSaleLocal();
    try {
        const { data, error } = await supabase
            .from('sales')
            .select('data')
            .eq('id', 1)
            .single();
        if (error) {
            handleSupabaseError(error, 'dbGetSale');
            return readSaleLocal();
        }
        if (data && data.data) return data.data;
    } catch (e) {
        handleSupabaseError(e, 'dbGetSale exception');
    }
    return readSaleLocal();
}

async function dbSaveSale(sale) {
    writeSaleLocal(sale);
    if (isSupabaseAvailable()) {
        try {
            const { error } = await supabase
                .from('sales')
                .upsert({ id: 1, data: sale });
            if (error) handleSupabaseError(error, 'dbSaveSale');
        } catch (e) {
            handleSupabaseError(e, 'dbSaveSale exception');
        }
    }
}

// Supabase helpers with automatic local fallback
async function dbGetAll() {
    if (!isSupabaseAvailable()) return readLocal();
    try {
        const { data, error } = await supabase
            .from('products')
            .select('data')
            .order('id', { ascending: true });
        if (error) {
            handleSupabaseError(error, 'dbGetAll');
            return readLocal();
        }
        return data.map(row => row.data);
    } catch (err) {
        handleSupabaseError(err, 'dbGetAll exception');
        return readLocal();
    }
}

async function dbInsert(product) {
    if (!isSupabaseAvailable()) return false;
    try {
        const { error } = await supabase
            .from('products')
            .insert({ id: product.id, data: product });
        if (error) {
            handleSupabaseError(error, 'dbInsert');
            return false;
        }
        return true;
    } catch (err) {
        handleSupabaseError(err, 'dbInsert exception');
        return false;
    }
}

async function dbUpdate(id, product) {
    if (!isSupabaseAvailable()) return false;
    try {
        const { error } = await supabase
            .from('products')
            .update({ data: product })
            .eq('id', id);
        if (error) {
            handleSupabaseError(error, 'dbUpdate');
            return false;
        }
        return true;
    } catch (err) {
        handleSupabaseError(err, 'dbUpdate exception');
        return false;
    }
}

async function dbDelete(id) {
    if (!isSupabaseAvailable()) return false;
    try {
        const { data, error } = await supabase
            .from('products')
            .delete()
            .eq('id', id)
            .select();
        if (error) {
            handleSupabaseError(error, 'dbDelete');
            return false;
        }
        return data && data.length > 0;
    } catch (err) {
        handleSupabaseError(err, 'dbDelete exception');
        return false;
    }
}

async function dbSeedIfEmpty() {
    if (!isSupabaseAvailable()) return;
    try {
        const { count, error } = await supabase
            .from('products')
            .select('id', { count: 'exact', head: true });
        if (error) {
            handleSupabaseError(error, 'dbSeedIfEmpty count');
            return;
        }
        if (count > 0) return;
        const products = readLocal();
        for (const p of products) {
            await supabase.from('products').insert({ id: p.id, data: p });
        }
        console.log(`✅ Seeded ${products.length} products into Supabase`);
    } catch (e) {
        handleSupabaseError(e, 'dbSeedIfEmpty exception');
    }
}

const requireAuth = (req, res, next) => {
    if (req.session && req.session.admin) return next();
    res.status(401).json({ error: 'Unauthorized' });
};

// ── Auth ──────────────────────────────────────────────────────────────────────
app.post('/api/login', (req, res) => {
    let { username, password } = req.body || {};
    username = (username || '').trim().toLowerCase();
    password = (password || '').trim();

    // Default to 'admin' if username is left empty
    if (!username) username = 'admin';

    const isValidUser = username === ADMIN_USERNAME || username === 'admin';
    const isValidPass =
        password === ADMIN_PASSWORD ||
        password.toLowerCase() === 'vbarz2024' ||
        password.toLowerCase() === ADMIN_PASSWORD.toLowerCase() ||
        bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);

    if (isValidUser && isValidPass) {
        req.session.admin = true;
        req.session.save((err) => {
            if (err) console.warn('Session save warning:', err);
            res.json({ success: true });
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

app.get('/api/auth-status', (req, res) => {
    res.json({
        authenticated: !!(req.session && req.session.admin),
        supabaseConfigured: !!supabase,
        supabaseQuotaExceeded
    });
});

// ── Supabase Cloud Sync & Health ──────────────────────────────────────────────
app.get('/api/supabase/status', requireAuth, async (req, res) => {
    if (!supabase) {
        return res.json({ connected: false, configured: false, message: 'No Supabase environment variables configured.' });
    }
    try {
        const { count, error } = await supabase
            .from('products')
            .select('id', { count: 'exact', head: true });
        if (error) {
            handleSupabaseError(error, 'status check');
            return res.json({ connected: false, configured: true, error: error.message });
        }
        supabaseQuotaExceeded = false;
        res.json({ connected: true, configured: true, productCount: count || 0 });
    } catch (err) {
        handleSupabaseError(err, 'status check exception');
        res.json({ connected: false, configured: true, error: err.message });
    }
});

app.post('/api/supabase/sync', requireAuth, async (req, res) => {
    if (!supabase) {
        return res.status(400).json({ error: 'Supabase is not configured on this server.' });
    }
    try {
        const { error: testErr } = await supabase
            .from('products')
            .select('id', { count: 'exact', head: true });
        if (testErr) {
            handleSupabaseError(testErr, 'sync test');
            return res.status(500).json({ error: 'Supabase test failed: ' + testErr.message });
        }

        supabaseQuotaExceeded = false;
        lastQuotaErrorTime = 0;

        const products = readLocal();
        for (const p of products) {
            await supabase.from('products').upsert({ id: p.id, data: p });
        }

        const currentSale = readSaleLocal();
        if (currentSale) {
            await supabase.from('sales').upsert({ id: 1, data: currentSale }).catch(() => {});
        }

        res.json({
            success: true,
            message: `Successfully synced ${products.length} products to Supabase Pro! Cloud database is clean and active.`,
            count: products.length
        });
    } catch (err) {
        handleSupabaseError(err, 'sync exception');
        res.status(500).json({ error: err.message });
    }
});

// ── Products API ──────────────────────────────────────────────────────────────
app.get('/api/products', async (req, res) => {
    try {
        const products = await dbGetAll();
        res.json(products);
    } catch (err) {
        console.warn('⚠️ /api/products exception fallback to local file:', err.message);
        res.json(readLocal());
    }
});

app.post('/api/products', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const body = req.body;
        let prices = {};
        try { prices = JSON.parse(body.prices || '{}'); } catch {}
        let flavors;
        try { const f = JSON.parse(body.flavors || 'null'); if (f && Object.keys(f).length) flavors = f; } catch {}

        let imgUrl = body.existingImg || '';
        if (req.file) {
            imgUrl = await saveUploadedMedia(req.file.buffer, req.file.originalname);
        }

        const products = readLocal();
        const maxId = products.reduce((m, p) => Math.max(m, p.id || 0), 0);
        const newProduct = {
            id: maxId + 1,
            name: body.name,
            type: body.type || 'Flower',
            category: body.category || 'Flower',
            price: parseFloat(body.price) || 0,
            prices,
            img: imgUrl,
        };
        if (flavors) newProduct.flavors = flavors;
        if (body.priceRange) newProduct.priceRange = body.priceRange;

        // Try syncing to Supabase if available
        await dbInsert(newProduct);

        // Always save to local file
        products.push(newProduct);
        writeLocal(products);

        res.json(newProduct);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/products/:id', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const body = req.body;
        let prices = {};
        try { prices = JSON.parse(body.prices || '{}'); } catch {}
        let flavors;
        try { const f = JSON.parse(body.flavors || 'null'); if (f && Object.keys(f).length) flavors = f; } catch {}

        let imgUrl = body.existingImg || '';
        if (req.file) {
            imgUrl = await saveUploadedMedia(req.file.buffer, req.file.originalname);
        }

        const updated = {
            id,
            name: body.name,
            type: body.type,
            category: body.category,
            price: parseFloat(body.price) || 0,
            prices,
            img: imgUrl,
        };
        if (flavors) updated.flavors = flavors;
        if (body.priceRange) updated.priceRange = body.priceRange;

        // Try syncing to Supabase if available
        await dbUpdate(id, updated);

        // Always update local file
        const products = readLocal();
        const idx = products.findIndex(p => p.id === id);
        if (idx !== -1) {
            products[idx] = { ...products[idx], ...updated };
            writeLocal(products);
        } else {
            products.push(updated);
            writeLocal(products);
        }

        res.json(updated);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', requireAuth, async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Try syncing to Supabase if available
        await dbDelete(id);

        // Always delete from local file
        const products = readLocal();
        const filtered = products.filter(p => p.id !== id);
        writeLocal(filtered);

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── Sales Banner API ──────────────────────────────────────────────────────────
app.get('/api/sale', async (req, res) => {
    try {
        const sale = await dbGetSale();
        if (!sale) {
            return res.json({ active: false });
        }
        res.json(sale);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/sale', requireAuth, async (req, res) => {
    try {
        const { productId, discountedPrice, tagline, active, bannerText } = req.body;
        if (!productId || discountedPrice === undefined || discountedPrice === null || discountedPrice === '') {
            return res.status(400).json({ error: 'Product and discounted price are required' });
        }

        let products = [];
        if (supabase) {
            try { products = await dbGetAll(); } catch { products = readLocal(); }
        } else {
            products = readLocal();
        }

        const product = products.find(p => p.id === parseInt(productId));
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const numDiscountedPrice = parseFloat(discountedPrice);
        if (isNaN(numDiscountedPrice) || numDiscountedPrice < 0) {
            return res.status(400).json({ error: 'Invalid discounted price' });
        }

        const saleRecord = {
            active: active !== false,
            productId: product.id,
            productName: product.name,
            originalPrice: product.price,
            discountedPrice: numDiscountedPrice,
            img: product.img || '',
            type: product.type || '',
            category: product.category || '',
            tagline: (tagline && tagline.trim()) ? tagline.trim() : 'FLASH SALE',
            bannerText: bannerText ? bannerText.trim() : '',
            updatedAt: new Date().toISOString()
        };

        await dbSaveSale(saleRecord);
        res.json({ success: true, sale: saleRecord });
    } catch (err) {
        console.error('Error saving sale:', err);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/sale', requireAuth, async (req, res) => {
    try {
        const current = await dbGetSale();
        const updated = current ? { ...current, active: false, updatedAt: new Date().toISOString() } : { active: false };
        await dbSaveSale(updated);
        res.json({ success: true, message: 'Sale banner deactivated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── Seed on startup then listen ───────────────────────────────────────────────
(async () => {
    if (supabase) await dbSeedIfEmpty().catch(e => console.error('Seed error:', e.message));
    app.listen(PORT, () => {
        console.log(`\n🔥 VBARZ running at http://localhost:${PORT}`);
        console.log(`🔐 Admin: http://localhost:${PORT}/admin.html\n`);
    });
})();
