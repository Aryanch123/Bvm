require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');

const categoriesData = [
    {
        title: 'Hospital Beds & Patient Care',
        slug: 'hospital-beds-patient-care',
        description: 'Hospital beds, stretchers, examination tables, and patient care furniture designed for comfort, safety, and clinical efficiency.',
        order: 1,
    },
    {
        title: 'Trolleys & Carts',
        slug: 'trolleys-carts',
        description: 'Crash carts, dressing trolleys, medicine trolleys, and utility carts built for mobility, hygiene, and hospital workflows.',
        order: 2,
    },
    {
        title: 'Ward Furniture & Accessories',
        slug: 'ward-furniture-accessories',
        description: 'Bedside lockers, overbed tables, ward screens, stools, foot steps, stands, and practical ward accessories.',
        order: 3,
    },
    {
        title: 'Storage & Utility',
        slug: 'storage-utility',
        description: 'Storage and utility furniture for organized medicine handling and day-to-day hospital operations.',
        order: 4,
    },
    {
        title: 'Seating & Waiting Area',
        slug: 'seating-waiting-area',
        description: 'Durable public seating and waiting area solutions for healthcare facilities and institutions.',
        order: 5,
    },
];

const productCatalog = [
    ['BVM-0501', 'Semi-Fowler Bed with Mattress', 'hospital-beds-patient-care'],
    ['BVM-0502', 'Fowler Bed with Mattress', 'hospital-beds-patient-care'],
    ['BVM-0503', 'General Hospital Bed', 'hospital-beds-patient-care'],
    ['BVM-0504', 'ICU Bed (Manual)', 'hospital-beds-patient-care'],
    ['BVM-0505', 'ICU Bed (Motorized)', 'hospital-beds-patient-care'],
    ['BVM-0506', 'Patient Stretcher Trolley', 'hospital-beds-patient-care'],
    ['BVM-0507', 'Emergency Recovery Trolley', 'hospital-beds-patient-care'],
    ['BVM-0508', 'Clinical Couch', 'hospital-beds-patient-care'],
    ['BVM-0509', 'Examination Table', 'hospital-beds-patient-care'],
    ['BVM-0510', 'Labour & Delivery Table', 'hospital-beds-patient-care'],
    ['BVM-0511', 'Pediatric Bed', 'hospital-beds-patient-care'],
    ['BVM-0512', 'Attendant Bed', 'hospital-beds-patient-care'],
    ['BVM-0513', 'Crash Cart Trolley', 'trolleys-carts'],
    ['BVM-0514', 'Instrument Trolley', 'trolleys-carts'],
    ['BVM-0515', 'Mayo Trolley', 'trolleys-carts'],
    ['BVM-0516', 'ECG Trolley', 'trolleys-carts'],
    ['BVM-0517', 'Dressing Trolley', 'trolleys-carts'],
    ['BVM-0518', 'Medicine Trolley', 'trolleys-carts'],
    ['BVM-0519', 'Linen Trolley', 'trolleys-carts'],
    ['BVM-0520', 'Utility Trolley', 'trolleys-carts'],
    ['BVM-0521', 'Anesthesia Trolley', 'trolleys-carts'],
    ['BVM-0522', 'Food Serving Trolley', 'trolleys-carts'],
    ['BVM-0523', 'Bedside Locker', 'ward-furniture-accessories'],
    ['BVM-0524', 'Overbed Table', 'ward-furniture-accessories'],
    ['BVM-0525', 'Saline Stand', 'ward-furniture-accessories'],
    ['BVM-0526', 'Ward Screen', 'ward-furniture-accessories'],
    ['BVM-0527', 'Medical Stool', 'ward-furniture-accessories'],
    ['BVM-0528', 'Foot Step', 'ward-furniture-accessories'],
    ['BVM-0529', 'Oxygen Cylinder Stand', 'ward-furniture-accessories'],
    ['BVM-0530', 'Kick Bucket', 'ward-furniture-accessories'],
    ['BVM-0531', 'IV Pole/Saline Stand', 'ward-furniture-accessories'],
    ['BVM-0532', 'Public Seating Chair', 'seating-waiting-area'],
    ['BVM-0533', 'Clinical Couch', 'hospital-beds-patient-care'],
    ['BVM-0534', 'Anesthesia Trolley', 'trolleys-carts'],
    ['BVM-0535', 'Utility Trolley', 'trolleys-carts'],
    ['BVM-0536', 'Food Trolley', 'trolleys-carts'],
    ['BVM-0537', 'Laundry Trolley', 'trolleys-carts'],
    ['BVM-0538', 'Kick Bucket', 'ward-furniture-accessories'],
    ['BVM-0539', 'Oxygen Cylinder Stand', 'ward-furniture-accessories'],
    ['BVM-0540', 'Medicine Rack', 'storage-utility'],
];

const slugify = (value) =>
    value
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const buildDescription = (title) =>
    `${title} designed for hospital use ensuring durability, hygiene, and performance.`;

const buildFeatures = () => ([
    'Available in Stainless Steel (SS) and Mild Steel (Powder Coated)',
    'Hospital-grade ergonomic design',
    'Smooth hygienic finish for easy cleaning',
    'Customizable in size, design, and configuration',
]);

const buildSpecifications = () => ([
    { name: 'Material', value: 'Stainless Steel (SS) / Mild Steel (Powder Coated)' },
    { name: 'Finish', value: 'Smooth / Powder Coated' },
    { name: 'Load Capacity', value: '150–250 kg (depending on product)' },
    { name: 'Design', value: 'Ergonomic and hospital-grade' },
    { name: 'Customization', value: 'Available in size, design, and configuration as per client requirements' },
]);

async function upsertCategories() {
    const categoryMap = {};

    for (const categoryData of categoriesData) {
        const category = await Category.findOneAndUpdate(
            { slug: categoryData.slug },
            {
                $set: {
                    title: categoryData.title,
                    description: categoryData.description,
                    order: categoryData.order,
                },
                $setOnInsert: {
                    image: { url: '', publicId: '' },
                },
            },
            { new: true, upsert: true }
        );

        categoryMap[categoryData.slug] = category._id;
        console.log(`Category ready: ${category.title}`);
    }

    return categoryMap;
}

async function upsertProducts(categoryMap) {
    for (const [model, title, categorySlug] of productCatalog) {
        const existing = await Product.findOne({ model });

        const payload = {
            title,
            slug: `${slugify(title)}-${model.toLowerCase()}`,
            model,
            category: categoryMap[categorySlug],
            reviews: existing?.reviews ?? 0,
            rating: existing?.rating ?? 5,
            description: buildDescription(title),
            features: buildFeatures(),
            specifications: buildSpecifications(),
            isActive: existing?.isActive ?? true,
        };

        if (existing) {
            Object.assign(existing, payload);
            await existing.save();
            console.log(`Updated product: ${model} - ${title}`);
            continue;
        }

        await Product.create({
            ...payload,
            images: [],
        });
        console.log(`Created product: ${model} - ${title}`);
    }
}

async function run() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const categoryMap = await upsertCategories();
    await upsertProducts(categoryMap);

    console.log('Hospital catalog import complete.');
    process.exit(0);
}

run().catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
});
