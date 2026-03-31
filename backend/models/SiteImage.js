const mongoose = require('mongoose');

const SiteImageSchema = new mongoose.Schema({
    section: {
        type: String,
        required: true,
        enum: ['homepage', 'gallery'],
    },
    label: { type: String, required: true, trim: true }, // e.g. "Hero Background", "Gallery Image 1"
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('SiteImage', SiteImageSchema);
