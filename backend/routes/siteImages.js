const express = require('express');
const SiteImage = require('../models/SiteImage');
const { protect } = require('../middleware/auth');
const { cloudinary, uploadSiteImage } = require('../config/cloudinary');

const router = express.Router();

// GET /api/site-images — public (optional: ?section=homepage|gallery)
router.get('/', async (req, res) => {
    let query = {};
    if (req.query.section) query.section = req.query.section;
    const images = await SiteImage.find(query).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: images });
});

// POST /api/site-images — admin
router.post('/', protect, uploadSiteImage.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'Image file is required.' });
    const { section, label, order } = req.body;
    if (!section || !label) return res.status(400).json({ success: false, message: 'section and label are required.' });

    const siteImage = await SiteImage.create({
        section,
        label,
        url: req.file.path,
        publicId: req.file.filename,
        order: order ? Number(order) : 0,
    });
    res.status(201).json({ success: true, data: siteImage });
});

// PUT /api/site-images/:id — admin (update label/order, or replace image)
router.put('/:id', protect, uploadSiteImage.single('image'), async (req, res) => {
    const siteImage = await SiteImage.findById(req.params.id);
    if (!siteImage) return res.status(404).json({ success: false, message: 'Image not found.' });

    const { label, order, section } = req.body;
    if (label !== undefined) siteImage.label = label;
    if (order !== undefined) siteImage.order = Number(order);
    if (section !== undefined) siteImage.section = section;

    if (req.file) {
        await cloudinary.uploader.destroy(siteImage.publicId);
        siteImage.url = req.file.path;
        siteImage.publicId = req.file.filename;
    }

    await siteImage.save();
    res.json({ success: true, data: siteImage });
});

// DELETE /api/site-images/:id — admin
router.delete('/:id', protect, async (req, res) => {
    const siteImage = await SiteImage.findById(req.params.id);
    if (!siteImage) return res.status(404).json({ success: false, message: 'Image not found.' });

    await cloudinary.uploader.destroy(siteImage.publicId);
    await siteImage.deleteOne();
    res.json({ success: true, message: 'Image deleted.' });
});

module.exports = router;
