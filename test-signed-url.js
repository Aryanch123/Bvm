require('dotenv').config({ path: './backend/.env' });
const { cloudinary } = require('./backend/config/cloudinary');

const signedUrl = cloudinary.utils.url('bvm/certificates/pdfs/ablabnvdqjr9suxtugel', {
    resource_type: 'raw',
    sign_url: true,
    secure: true,
});
console.log('URL:', signedUrl);
