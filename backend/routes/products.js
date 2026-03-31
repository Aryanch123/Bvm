const express = require('express');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const { cloudinary, uploadProductImages } = require('../config/cloudinary');

const router = express.Router();

// GET /api/products — public (optional: ?category=slug)
router.get('/', async (req, res) => {
    let query = {};
    if (req.query.category) {
        const Category = require('../models/Category');
        const cat = await Category.findOne({ slug: req.query.category });
        if (cat) query.category = cat._id;
    }
    const products = await Product.find({ ...query, isActive: true })
        .populate('category', 'title slug')
        .sort({ createdAt: -1 });
    res.json({ success: true, data: products });
});

// GET /api/products/:slug — public
router.get('/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true })
        .populate('category', 'title slug');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    res.json({ success: true, data: product });
});

// POST /api/products — admin (create with images)
router.post('/', protect, uploadProductImages.array('images', 10), async (req, res) => {
    const { title, model, category, reviews, rating, description, features, specifications } = req.body;
    if (!title || !model || !category) {
        return res.status(400).json({ success: false, message: 'title, model, and category are required.' });
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const images = (req.files || []).map(file => ({ url: file.path, publicId: file.filename }));

    // Parse JSON strings (sent from FormData)
    let parsedFeatures = [];
    let parsedSpecs = [];
    try { parsedFeatures = features ? JSON.parse(features) : []; } catch { parsedFeatures = []; }
    try { parsedSpecs = specifications ? JSON.parse(specifications) : []; } catch { parsedSpecs = []; }

    const product = await Product.create({
        title, slug, model, category,
        reviews: reviews ? Number(reviews) : 0,
        rating: rating ? Number(rating) : 5,
        description: description || '',
        features: parsedFeatures,
        specifications: parsedSpecs,
        images,
    });

    const populated = await product.populate('category', 'title slug');
    res.status(201).json({ success: true, data: populated });
});

// PUT /api/products/:id — admin (update details, no images)
router.put('/:id', protect, async (req, res) => {
    const { title, model, category, reviews, rating, description, features, specifications, isActive } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

    if (title) { product.title = title; product.slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''); }
    if (model) product.model = model;
    if (category) product.category = category;
    if (reviews !== undefined) product.reviews = Number(reviews);
    if (rating !== undefined) product.rating = Number(rating);
    if (description !== undefined) product.description = description;
    if (isActive !== undefined) product.isActive = isActive;

    if (features) {
        try { product.features = JSON.parse(features); } catch { product.features = []; }
    }
    if (specifications) {
        try { product.specifications = JSON.parse(specifications); } catch { product.specifications = []; }
    }

    await product.save();
    const populated = await product.populate('category', 'title slug');
    res.json({ success: true, data: populated });
});

// POST /api/products/:id/images — admin (add images to existing product)
router.post('/:id/images', protect, uploadProductImages.array('images', 10), async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

    const newImages = (req.files || []).map(file => ({ url: file.path, publicId: file.filename }));
    product.images.push(...newImages);
    await product.save();
    res.json({ success: true, data: product });
});

// DELETE /api/products/:id/images/:publicId — admin (remove one image)
router.delete('/:id/images/:publicId', protect, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

    // publicId may contain slashes, decode it
    const publicId = decodeURIComponent(req.params.publicId);

    await cloudinary.uploader.destroy(publicId);
    product.images = product.images.filter(img => img.publicId !== publicId);
    await product.save();
    res.json({ success: true, data: product });
});

// DELETE /api/products/:id — admin (delete product + all images)
router.delete('/:id', protect, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

    // Delete all Cloudinary images
    for (const img of product.images) {
        await cloudinary.uploader.destroy(img.publicId);
    }
    await product.deleteOne();
    res.json({ success: true, message: 'Product deleted.' });
});

module.exports = router;
