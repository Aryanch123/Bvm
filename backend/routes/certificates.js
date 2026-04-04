const express = require('express');
const multer = require('multer');
const Certificate = require('../models/Certificate');
const { protect } = require('../middleware/auth');
const { cloudinary } = require('../config/cloudinary');

const router = express.Router();
const IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: Number(process.env.MAX_CERTIFICATE_UPLOAD_BYTES || 10 * 1024 * 1024) },
    fileFilter: (req, file, cb) => {
        if (!IMAGE_MIME_TYPES.has(file.mimetype)) {
            return cb(new Error('Certificate uploads must be JPG, PNG, or WEBP images.'));
        }
        cb(null, true);
    },
});

const uploadFields = upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'image', maxCount: 1 },
]);

// Upload a memory buffer to Cloudinary so cert files can use the same image flow as the rest of the site.
const uploadToCloudinary = (buffer, options) =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
        stream.end(buffer);
    });

// GET /api/certificates
router.get('/', async (req, res) => {
    const certs = await Certificate.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: certs });
});

// GET /api/certificates/:id
router.get('/:id', async (req, res) => {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) {
        return res.status(404).json({ success: false, message: 'Certificate not found.' });
    }
    res.json({ success: true, data: cert });
});

// GET /api/certificates/:id/download
router.get('/:id/download', async (req, res) => {
    const cert = await Certificate.findById(req.params.id);
    if (!cert || !cert.pdf?.url) {
        return res.status(404).json({ success: false, message: 'Document not found.' });
    }
    res.redirect(cert.pdf.url);
});

// POST /api/certificates
router.post('/', protect, uploadFields, async (req, res) => {
    const { title, issuingBody, year, validUntil, description, status, order } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required.' });

    let pdfData = { url: '', publicId: '' };
    let imageData = { url: '', publicId: '' };

    if (req.files?.pdf?.[0]) {
        const result = await uploadToCloudinary(req.files.pdf[0].buffer, {
            folder: 'bvm/certificates/images',
            resource_type: 'image',
        });
        pdfData = { url: result.secure_url, publicId: result.public_id };
    }

    if (req.files?.image?.[0]) {
        const result = await uploadToCloudinary(req.files.image[0].buffer, {
            folder: 'bvm/certificates/images',
            resource_type: 'image',
            transformation: [{ width: 800, height: 600, crop: 'limit', quality: 'auto' }],
        });
        imageData = { url: result.secure_url, publicId: result.public_id };
    }

    const cert = await Certificate.create({
        title,
        issuingBody: issuingBody || '',
        year: year || '',
        validUntil: validUntil || '',
        description: description || '',
        status: status || 'Active',
        order: order ? Number(order) : 0,
        pdf: pdfData,
        image: imageData,
    });

    res.status(201).json({ success: true, data: cert });
});

// PUT /api/certificates/:id
router.put('/:id', protect, uploadFields, async (req, res) => {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ success: false, message: 'Not found.' });

    const { title, issuingBody, year, validUntil, description, status, order } = req.body;
    if (title) cert.title = title;
    if (issuingBody !== undefined) cert.issuingBody = issuingBody;
    if (year !== undefined) cert.year = year;
    if (validUntil !== undefined) cert.validUntil = validUntil;
    if (description !== undefined) cert.description = description;
    if (status !== undefined) cert.status = status;
    if (order !== undefined) cert.order = Number(order);

    if (req.files?.pdf?.[0]) {
        if (cert.pdf?.publicId) {
            await cloudinary.uploader.destroy(cert.pdf.publicId).catch(() => {});
        }
        const result = await uploadToCloudinary(req.files.pdf[0].buffer, {
            folder: 'bvm/certificates/images',
            resource_type: 'image',
        });
        cert.pdf = { url: result.secure_url, publicId: result.public_id };
    }

    if (req.files?.image?.[0]) {
        if (cert.image?.publicId) {
            await cloudinary.uploader.destroy(cert.image.publicId).catch(() => {});
        }
        const result = await uploadToCloudinary(req.files.image[0].buffer, {
            folder: 'bvm/certificates/images',
            resource_type: 'image',
        });
        cert.image = { url: result.secure_url, publicId: result.public_id };
    }

    await cert.save();
    res.json({ success: true, data: cert });
});

// DELETE /api/certificates/:id
router.delete('/:id', protect, async (req, res) => {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ success: false, message: 'Not found.' });

    if (cert.pdf?.publicId) {
        await cloudinary.uploader.destroy(cert.pdf.publicId).catch(() => {});
    }
    if (cert.image?.publicId) {
        await cloudinary.uploader.destroy(cert.image.publicId).catch(() => {});
    }
    await cert.deleteOne();
    res.json({ success: true, message: 'Certificate deleted.' });
});

module.exports = router;
