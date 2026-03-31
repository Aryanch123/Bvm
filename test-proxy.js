const https = require('https');
const url = require('url');

const signedUrl = "https://res.cloudinary.com/dzdmbf7bw/raw/upload/s--b1F-u5l2--/v1774703616/bvm/certificates/pdfs/ablabnvdqjr9suxtugel.pdf";

https.get(signedUrl, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log('Body:', data.substring(0, 200)));
});
