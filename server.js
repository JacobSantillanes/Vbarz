const express = require('express');
const session = require('express-session');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const cloudinary = require('cloudinary').v2;

const app = express();
const PORT = process.env.PORT || 3000;

// ── Admin credentials ─────────────────────────────────────────────────────────
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('vbarz2024', 10);

// ── Supabase (uses HTTPS — no SSL socket issues) ──────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
let supabase = null;

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
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only image files allowed'));
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
app.use(express.static(__dirname));

// ── Helpers ───────────────────────────────────────────────────────────────────
function uploadToCloudinary(buffer, filename) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'vbarz', public_id: path.parse(filename).name, overwrite: true },
            (err, result) => err ? reject(err) : resolve(result.secure_url)
        );
        stream.end(buffer);
    });
}

// Local file fallback
const PRODUCTS_FILE = path.join(__dirname, 'products.json');
const readLocal  = () => JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
const writeLocal = (p) => fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(p, null, 2));

// Supabase helpers
async function dbGetAll() {
    const { data, error } = await supabase
        .from('products')
        .select('data')
        .order('id', { ascending: true });
    if (error) throw error;
    return data.map(row => row.data);
}

async function dbInsert(product) {
    const { error } = await supabase
        .from('products')
        .insert({ id: product.id, data: product });
    if (error) throw error;
}

async function dbUpdate(id, product) {
    const { error } = await supabase
        .from('products')
        .update({ data: product })
        .eq('id', id);
    if (error) throw error;
}

async function dbDelete(id) {
    const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        .select();
    if (error) throw error;
    return data.length > 0;
}

async function dbSeedIfEmpty() {
    const { count, error } = await supabase
        .from('products')
        .select('id', { count: 'exact', head: true });
    if (error || count > 0) return;
    const products = readLocal();
    for (const p of products) {
        await supabase.from('products').insert({ id: p.id, data: p });
    }
    console.log(`✅ Seeded ${products.length} products into Supabase`);
}

const requireAuth = (req, res, next) => {
    if (req.session && req.session.admin) return next();
    res.status(401).json({ error: 'Unauthorized' });
};

// ── Auth ──────────────────────────────────────────────────────────────────────
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
        req.session.admin = true;
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

app.get('/api/auth-status', (req, res) => {
    res.json({ authenticated: !!(req.session && req.session.admin) });
});

// ── Products API ──────────────────────────────────────────────────────────────
app.get('/api/products', async (req, res) => {
    try {
        if (supabase) {
            res.json(await dbGetAll());
        } else {
            res.json(readLocal());
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
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
        if (req.file && process.env.CLOUDINARY_CLOUD_NAME) {
            imgUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);
        } else if (req.file) {
            const filename = `${path.parse(req.file.originalname).name}_${Date.now()}${path.extname(req.file.originalname)}`;
            fs.writeFileSync(path.join(__dirname, filename), req.file.buffer);
            imgUrl = filename;
        }

        const newProduct = {
            id: Date.now(),
            name: body.name,
            type: body.type || 'Flower',
            category: body.category || 'Flower',
            price: parseFloat(body.price) || 0,
            prices,
            img: imgUrl,
        };
        if (flavors) newProduct.flavors = flavors;
        if (body.priceRange) newProduct.priceRange = body.priceRange;

        if (supabase) {
            await dbInsert(newProduct);
        } else {
            const products = readLocal();
            const maxId = products.reduce((m, p) => Math.max(m, p.id || 0), 0);
            newProduct.id = maxId + 1;
            products.push(newProduct);
            writeLocal(products);
        }
        res.json(newProduct);
    } catch (err) {
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
        if (req.file && process.env.CLOUDINARY_CLOUD_NAME) {
            imgUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);
        } else if (req.file) {
            const filename = `${path.parse(req.file.originalname).name}_${Date.now()}${path.extname(req.file.originalname)}`;
            fs.writeFileSync(path.join(__dirname, filename), req.file.buffer);
            imgUrl = filename;
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

        if (supabase) {
            await dbUpdate(id, updated);
        } else {
            const products = readLocal();
            const idx = products.findIndex(p => p.id === id);
            if (idx === -1) return res.status(404).json({ error: 'Not found' });
            products[idx] = { ...products[idx], ...updated };
            writeLocal(products);
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', requireAuth, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (supabase) {
            const found = await dbDelete(id);
            if (!found) return res.status(404).json({ error: 'Not found' });
        } else {
            const products = readLocal();
            const filtered = products.filter(p => p.id !== id);
            if (filtered.length === products.length) return res.status(404).json({ error: 'Not found' });
            writeLocal(filtered);
        }
        res.json({ success: true });
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
