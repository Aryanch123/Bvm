require('express-async-errors');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {
    buildAllowedOrigins,
    createRateLimiter,
    isAllowedOrigin,
    parseMs,
    setSecurityHeaders,
} = require('./middleware/security');

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const siteImageRoutes = require('./routes/siteImages');
const certificateRoutes = require('./routes/certificates');

const path = require('path');

const app = express();
const allowedOrigins = buildAllowedOrigins();
const apiRateLimiter = createRateLimiter({
    windowMs: parseMs(process.env.API_RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    maxRequests: Number(process.env.API_RATE_LIMIT_MAX || 300),
    message: 'Too many requests. Please try again later.',
});
const authRateLimiter = createRateLimiter({
    windowMs: parseMs(process.env.AUTH_RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    maxRequests: Number(process.env.AUTH_RATE_LIMIT_MAX || 10),
    message: 'Too many login attempts. Please wait and try again.',
});

app.set('trust proxy', 1);
app.use(setSecurityHeaders);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: (origin, callback) => {
        if (isAllowedOrigin(origin, allowedOrigins)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
}));

app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || '1mb' }));
app.use(express.urlencoded({ extended: true, limit: process.env.URLENCODED_BODY_LIMIT || '1mb' }));
app.use('/api', apiRateLimiter);
app.use('/api/auth/login', authRateLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/site-images', siteImageRoutes);
app.use('/api/certificates', certificateRoutes);

app.get('/', (req, res) => res.json({ message: 'BVM Industries API is running.' }));

app.use((err, req, res, next) => {
    console.error('Global Error:', err);
    const errMsg = err.message || err.error?.message || (typeof err === 'string' ? err : 'Internal Server Error');
    res.status(err.http_code || err.status || 500).json({
        success: false,
        message: String(errMsg),
    });
});

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });
