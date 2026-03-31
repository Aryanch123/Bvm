/**
 * seedAdmin.js — Run once to create the admin account in MongoDB.
 * Usage: node seedAdmin.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    const existing = await Admin.findOne({ email });
    if (existing) {
        console.log(`Admin "${email}" already exists. Nothing to do.`);
        process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await Admin.create({ email, passwordHash });
    console.log(`✅ Admin "${email}" created successfully!`);
    process.exit(0);
}

seed().catch(err => {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
});
