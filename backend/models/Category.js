const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, default: '' },
    image: {
        url: { type: String, default: '' },
        publicId: { type: String, default: '' },
    },
    order: { type: Number, default: 0 },
}, { timestamps: true });



module.exports = mongoose.model('Category', CategorySchema);
