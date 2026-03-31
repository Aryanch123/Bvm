require('express-async-errors');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const siteImageRoutes = require('./routes/siteImages');
const certificateRoutes = require('./routes/certificates');

const path = require('path');

const app = express();

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS — allow the React dev server
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/site-images', siteImageRoutes);
app.use('/api/certificates', certificateRoutes);

// Health check
app.get('/', (req, res) => res.json({ message: 'BVM Industries API is running.' }));

// Global error handler
app.use((err, req, res, next) => {
    console.error('🚨 Global Error:', err);
    // Cloudinary errors sometimes don't have a standard message property
    const errMsg = err.message || err.error?.message || (typeof err === 'string' ? err : 'Internal Server Error');
    res.status(err.http_code || err.status || 500).json({
        success: false,
        message: String(errMsg),
    });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });
