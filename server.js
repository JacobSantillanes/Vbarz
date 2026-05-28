// Fix SSL handshake issues with MongoDB Atlas on Render
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const session = require('express-session');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');
const cloudinary = require('cloudinary').v2;

const app = express();
const PORT = process.env.PORT || 3000;

// ── Admin credentials ─────────────────────────────────────────────────────────
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('vbarz2024', 10);

// ── Cloudinary config (set via env vars on Render) ────────────────────────────
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── MongoDB ───────────────────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI;
let db;

async function connectDB() {
    if (!MONGO_URI) {
        console.warn('⚠️  No MONGO_URI set — running in local file mode');
        return;
    }
    const client = new MongoClient(MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
    });
    await client.connect();
    db = client.db('vbarz');
    console.log('✅ MongoDB connected');

    // Seed from products.json if collection is empty
    const count = await db.collection('products').countDocuments();
    if (count === 0) {
        const productsFile = path.join(__dirname, 'products.json');
        if (fs.existsSync(productsFile)) {
            const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
            await db.collection('products').insertMany(products);
            console.log(`✅ Seeded ${products.length} products from products.json`);
        }
    }
}

// ── Multer — memory storage (files go to Cloudinary, not disk) ────────────────
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
    if (req.path.endsWith('.js')) {
        res.setHeader('Cache-Control', 'no-store');
    }
    next();
});
app.use(express.static(__dirname));

// ── Helpers ───────────────────────────────────────────────────────────────────

// Upload a buffer to Cloudinary and return the secure URL
function uploadToCloudinary(buffer, filename) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'vbarz', public_id: path.parse(filename).name, overwrite: true },
            (err, result) => err ? reject(err) : resolve(result.secure_url)
        );
        stream.end(buffer);
    });
}

// Fallback: read/write products.json when no MongoDB
const PRODUCTS_FILE = path.join(__dirname, 'products.json');
const readLocal  = () => JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
const writeLocal = (p) => fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(p, null, 2));

const requireAuth = (req, res, next) => {
    if (req.session && req.session.admin) return next();
    res.status(401).json({ error: 'Unauthorized' });
};

// ── Auth routes ───────────────────────────────────────────────────────────────
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

// GET all products (public)
app.get('/api/products', async (req, res) => {
    try {
        if (db) {
            const products = await db.collection('products').find({}).sort({ id: 1 }).toArray();
            // Remove internal _id from response
            res.json(products.map(({ _id, ...p }) => p));
        } else {
            res.json(readLocal());
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create product (admin)
app.post('/api/products', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const body = req.body;
        let prices = {};
        try { prices = JSON.parse(body.prices || '{}'); } catch {}
        let flavors;
        try { const f = JSON.parse(body.flavors || 'null'); if (f && Object.keys(f).length) flavors = f; } catch {}

        // Upload image to Cloudinary if provided
        let imgUrl = body.existingImg || '';
        if (req.file && process.env.CLOUDINARY_CLOUD_NAME) {
            imgUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);
        } else if (req.file) {
            // Fallback: save locally
            const filename = `${path.parse(req.file.originalname).name}_${Date.now()}${path.extname(req.file.originalname)}`;
            fs.writeFileSync(path.join(__dirname, filename), req.file.buffer);
            imgUrl = filename;
        }

        const newProduct = {
            id: Date.now(), // unique numeric id
            name: body.name,
            type: body.type || 'Flower',
            category: body.category || 'Flower',
            price: parseFloat(body.price) || 0,
            prices,
            img: imgUrl,
        };
        if (flavors) newProduct.flavors = flavors;
        if (body.priceRange) newProduct.priceRange = body.priceRange;

        if (db) {
            await db.collection('products').insertOne(newProduct);
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

// PUT update product (admin)
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

        const update = {
            name: body.name,
            type: body.type,
            category: body.category,
            price: parseFloat(body.price) || 0,
            prices,
            img: imgUrl,
        };
        if (flavors !== undefined) update.flavors = flavors;
        if (body.priceRange) update.priceRange = body.priceRange;

        if (db) {
            const result = await db.collection('products').findOneAndUpdate(
                { id },
                { $set: update, $unset: flavors ? {} : { flavors: '' } },
                { returnDocument: 'after' }
            );
            if (!result) return res.status(404).json({ error: 'Not found' });
            const { _id, ...p } = result;
            res.json(p);
        } else {
            const products = readLocal();
            const idx = products.findIndex(p => p.id === id);
            if (idx === -1) return res.status(404).json({ error: 'Not found' });
            products[idx] = { ...products[idx], ...update };
            if (!flavors) delete products[idx].flavors;
            writeLocal(products);
            res.json(products[idx]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE product (admin)
app.delete('/api/products/:id', requireAuth, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (db) {
            const result = await db.collection('products').deleteOne({ id });
            if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
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

// ── Start ─────────────────────────────────────────────────────────────────────
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`\n🔥 VBARZ server running at http://localhost:${PORT}`);
        console.log(`🔐 Admin panel: http://localhost:${PORT}/admin.html\n`);
    });
}).catch(err => {
    console.error('DB connection failed:', err.message);
    app.listen(PORT, () => {
        console.log(`🔥 VBARZ running (no DB) at http://localhost:${PORT}`);
    });
});
