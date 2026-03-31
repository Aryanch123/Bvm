const express = require('express');
const Category = require('../models/Category');
const { protect } = require('../middleware/auth');
const { cloudinary, uploadCategoryImage } = require('../config/cloudinary');

const router = express.Router();

// GET /api/categories — public
router.get('/', async (req, res) => {
    const categories = await Category.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: categories });
});

// GET /api/categories/:slug — public
router.get('/:slug', async (req, res) => {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found.' });
    res.json({ success: true, data: category });
});

// POST /api/categories — admin
router.post('/', protect, uploadCategoryImage.single('image'), async (req, res) => {
    const { title, description, order } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required.' });

    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const imageData = req.file
        ? { url: req.file.path, publicId: req.file.filename }
        : { url: '', publicId: '' };

    const category = await Category.create({
        title,
        slug,
        description: description || '',
        image: imageData,
        order: order ? Number(order) : 0,
    });

    res.status(201).json({ success: true, data: category });
});

// PUT /api/categories/:id — admin
router.put('/:id', protect, uploadCategoryImage.single('image'), async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found.' });

    const { title, description, order } = req.body;
    if (title) {
        category.title = title;
        category.slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    if (description !== undefined) category.description = description;
    if (order !== undefined) category.order = Number(order);

    if (req.file) {
        // Delete old image from Cloudinary
        if (category.image.publicId) {
            await cloudinary.uploader.destroy(category.image.publicId);
        }
        category.image = { url: req.file.path, publicId: req.file.filename };
    }

    await category.save();
    res.json({ success: true, data: category });
});

// DELETE /api/categories/:id — admin
router.delete('/:id', protect, async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found.' });

    if (category.image.publicId) {
        await cloudinary.uploader.destroy(category.image.publicId);
    }
    await category.deleteOne();
    res.json({ success: true, message: 'Category deleted.' });
});

module.exports = router;
