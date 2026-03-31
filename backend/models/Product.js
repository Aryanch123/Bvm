const mongoose = require('mongoose');

const SpecificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
}, { _id: false });

const ImageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    publicId: { type: String, required: true },
}, { _id: false });

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    model: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    reviews: { type: Number, default: 0 },
    rating: { type: Number, default: 5, min: 0, max: 5 },
    description: { type: String, default: '' },
    features: [{ type: String }],
    specifications: [SpecificationSchema],
    images: [ImageSchema],
    isActive: { type: Boolean, default: true },
}, { timestamps: true });



module.exports = mongoose.model('Product', ProductSchema);
