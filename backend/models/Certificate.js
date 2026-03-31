const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    issuingBody: { type: String, default: '' },
    year: { type: String, default: '' },
    validUntil: { type: String, default: '' },
    description: { type: String, default: '' },
    status: { type: String, enum: ['Active', 'Expired', 'Pending'], default: 'Active' },
    // PDF file hosted on Cloudinary (raw type)
    pdf: {
        url: { type: String, default: '' },
        publicId: { type: String, default: '' },
    },
    // Optional certificate thumbnail image
    image: {
        url: { type: String, default: '' },
        publicId: { type: String, default: '' },
    },
    order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', CertificateSchema);
