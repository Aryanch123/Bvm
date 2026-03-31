require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');
const { cloudinary } = require('./backend/config/cloudinary');
const Certificate = require('./backend/models/Certificate');

async function test() {
    await mongoose.connect(process.env.MONGO_URI);
    const cert = await Certificate.findOne({ "pdf.url": { $ne: "" } });
    if (!cert) { console.log('No cert with PDF found'); process.exit(0); }
    
    console.log('Cert:', cert.title);
    console.log('Public ID:', cert.pdf.publicId);
    
    const signedUrl = cloudinary.utils.url(cert.pdf.publicId, {
        resource_type: 'raw',
        type: 'upload',
        sign_url: true,
        secure: true,
        expires_at: Math.floor(Date.now() / 1000) + 3600
    });
    console.log('Signed URL:', signedUrl);
    
    // Test fetch
    const http = require('https');
    http.get(signedUrl, (res) => {
        console.log('Status Code:', res.statusCode);
        process.exit(0);
    });
}
test();
