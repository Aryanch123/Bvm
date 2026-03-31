/**
 * seedData.js — Seeds the 3 categories and 4 products from the old static data.
 * Run: node seedData.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');

const categoriesData = [
    {
        title: 'Patient Ward Solutions',
        slug: 'patient-ward-solutions',
        description: 'Ergonomic beds, bedside cabinets, and overbed tables designed for patient comfort and recovery.',
        order: 1,
    },
    {
        title: 'Surgical Equipment',
        slug: 'surgical-equipment',
        description: 'High-precision operating tables and surgical lights engineered for complex procedures.',
        order: 2,
    },
    {
        title: 'Clinical Mobility',
        slug: 'clinical-mobility',
        description: 'Durable medical carts, stretchers, and wheelchairs for efficient patient transport and care.',
        order: 3,
    },
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing categories and products');

    // Insert categories
    const cats = await Category.insertMany(categoriesData);
    const catMap = {};
    cats.forEach(c => { catMap[c.slug] = c._id; });
    console.log(`✅ Created ${cats.length} categories`);

    const productsData = [
        {
            title: 'Pro-Care Advance Series Bed',
            slug: 'pro-care-advance-series-bed',
            model: 'PC-5000X',
            category: catMap['patient-ward-solutions'],
            reviews: 24,
            rating: 4.5,
            description: 'Engineered for critical care environments, the Pro-Care Advance Series combines intelligent ergonomics with robust durability. Features our patented antimicrobial coating and a fully electric adjustment system for optimal patient recovery and caregiver efficiency.',
            features: [
                'Fully electric 5-function adjustment control',
                'BioGuard antimicrobial surface coating',
                'Integrated scale and patient exit alarm system',
                'CPR quick release functionality',
                'ISO 13485 and CE Certified',
            ],
            specifications: [
                { name: 'Overall Length', value: '2200mm ± 10mm' },
                { name: 'Overall Width', value: '1050mm ± 10mm' },
                { name: 'Height Adjustment', value: '450mm - 750mm' },
                { name: 'Safe Working Load', value: '250 kg' },
                { name: 'Backrest Angle', value: '0° - 75°' },
                { name: 'Knee Rest Angle', value: '0° - 40°' },
                { name: 'Power Supply', value: 'AC 110V/220V 50/60Hz' },
                { name: 'Caster Diameter', value: '125mm Central Locking' },
            ],
            images: [],
        },
        {
            title: 'Adjustable Overbed Table',
            slug: 'adjustable-overbed-table',
            model: 'OB-100',
            category: catMap['patient-ward-solutions'],
            reviews: 12,
            rating: 4.5,
            description: 'Hydraulic height adjustment with antimicrobial top surface. Built for heavy use in clinical environments.',
            features: [
                'Hydraulic height adjustment',
                'Antimicrobial top surface',
                'C-shape base for easy positioning',
                'Smooth-rolling casters with brakes',
            ],
            specifications: [
                { name: 'Height Adjustment', value: '700mm - 1100mm' },
                { name: 'Table Top Size', value: '600mm x 400mm' },
                { name: 'Load Capacity', value: '15 kg' },
                { name: 'Material', value: 'Medical grade ABS top, SS frame' },
            ],
            images: [],
        },
        {
            title: 'Smart Bedside Cabinet',
            slug: 'smart-bedside-cabinet',
            model: 'BC-200S',
            category: catMap['patient-ward-solutions'],
            reviews: 18,
            rating: 4.5,
            description: 'Integrated storage with biometric lock options. Smart tracking capabilities for hospital asset management.',
            features: [
                'Biometric lock option',
                'Smart asset tracking',
                'Antibacterial laminate surfaces',
                'Silent close drawers',
                'Waterproof top surface',
            ],
            specifications: [
                { name: 'Dimensions', value: '500mm x 500mm x 800mm' },
                { name: 'Material', value: 'Cold rolled steel, powder coated' },
                { name: 'Drawers', value: '2 lockable drawers' },
                { name: 'Load Capacity per Drawer', value: '15 kg' },
            ],
            images: [],
        },
        {
            title: 'Heavy Duty IV Stand',
            slug: 'heavy-duty-iv-stand',
            model: 'IV-50',
            category: catMap['clinical-mobility'],
            reviews: 30,
            rating: 4.5,
            description: 'Stainless steel construction with 5-leg stable base and telescopic height adjustment for versatile clinical use.',
            features: [
                'Stainless steel 304 grade pole',
                '5-leg weighted base for stability',
                'Telescopic height adjustment',
                '4 hook options',
                '75mm smooth-rolling casters',
            ],
            specifications: [
                { name: 'Height Range', value: '1200mm - 2100mm' },
                { name: 'Base Diameter', value: '500mm' },
                { name: 'Material', value: 'Stainless Steel 304' },
                { name: 'Hooks', value: '4 adjustable hooks' },
                { name: 'Weight', value: '3.5 kg' },
            ],
            images: [],
        },
    ];

    const prods = await Product.insertMany(productsData);
    console.log(`✅ Created ${prods.length} products`);
    prods.forEach(p => console.log(`  - ${p.title} (slug: ${p.slug})`));

    console.log('\n🎉 Seed complete! Visit http://localhost:5173/products to verify.');
    process.exit(0);
}

seed().catch(err => {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
});
