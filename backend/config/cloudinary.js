const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const createImageFileFilter = () => (req, file, cb) => {
    if (!IMAGE_MIME_TYPES.has(file.mimetype)) {
        return cb(new Error('Only JPG, PNG, and WEBP image uploads are allowed.'));
    }
    cb(null, true);
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for product images
const productStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'bvm/products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
    },
});

// Storage for category images
const categoryStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'bvm/categories',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 600, crop: 'limit', quality: 'auto' }],
    },
});

// Storage for site images (homepage, gallery)
const siteImageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'bvm/site',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1920, height: 1200, crop: 'limit', quality: 'auto' }],
    },
});

// Storage for certificate PDFs (raw type)
const certificatePdfStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'bvm/certificates/pdfs',
        resource_type: 'raw',
        allowed_formats: ['pdf'],
    },
});

// Storage for certificate thumbnail images
const certificateImageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'bvm/certificates/images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 600, crop: 'limit', quality: 'auto' }],
    },
});

const uploadProductImages = multer({
    storage: productStorage,
    limits: { fileSize: Number(process.env.MAX_IMAGE_UPLOAD_BYTES || 8 * 1024 * 1024) },
    fileFilter: createImageFileFilter(),
});
const uploadCategoryImage = multer({
    storage: categoryStorage,
    limits: { fileSize: Number(process.env.MAX_IMAGE_UPLOAD_BYTES || 8 * 1024 * 1024) },
    fileFilter: createImageFileFilter(),
});
const uploadSiteImage = multer({
    storage: siteImageStorage,
    limits: { fileSize: Number(process.env.MAX_SITE_IMAGE_UPLOAD_BYTES || 10 * 1024 * 1024) },
    fileFilter: createImageFileFilter(),
});
const uploadCertificatePdf = multer({ storage: certificatePdfStorage });
const uploadCertificateImage = multer({ storage: certificateImageStorage });

module.exports = {
    cloudinary,
    uploadProductImages,
    uploadCategoryImage,
    uploadSiteImage,
    uploadCertificatePdf,
    uploadCertificateImage,
};
