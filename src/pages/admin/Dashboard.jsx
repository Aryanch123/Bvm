import { useEffect, useState } from 'react';
import { getCategories, getProducts, getSiteImages } from '../../services/api';

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-center gap-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            <span className="material-icons-outlined text-2xl text-white">{icon}</span>
        </div>
        <div>
            <p className="text-neutral-400 text-sm">{label}</p>
            <p className="text-white text-3xl font-bold">{value}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({ products: 0, categories: 0, siteImages: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getProducts(), getCategories(), getSiteImages()])
            .then(([p, c, s]) => {
                setStats({
                    products: p.data.data.length,
                    categories: c.data.data.length,
                    siteImages: s.data.data.length,
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">Overview</h2>
                <p className="text-neutral-400 text-sm mt-1">Manage your website content from here.</p>
            </div>

            {loading ? (
                <p className="text-neutral-500">Loading stats...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <StatCard icon="inventory_2" label="Total Products" value={stats.products} color="bg-blue-600" />
                    <StatCard icon="category" label="Categories" value={stats.categories} color="bg-violet-600" />
                    <StatCard icon="photo_library" label="Site Images" value={stats.siteImages} color="bg-emerald-600" />
                </div>
            )}

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { to: '/admin/categories', icon: 'category', label: 'Manage Categories', desc: 'Add, edit, or delete product categories' },
                    { to: '/admin/products', icon: 'inventory_2', label: 'Manage Products', desc: 'Full CRUD for all products and images' },
                    { to: '/admin/site-images', icon: 'photo_library', label: 'Site Images', desc: 'Update homepage and gallery images' },
                ].map(card => (
                    <a
                        key={card.to}
                        href={card.to}
                        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-primary/40 transition-all group"
                    >
                        <span className="material-icons-outlined text-primary text-3xl mb-3 block">{card.icon}</span>
                        <h3 className="text-white font-semibold text-base group-hover:text-primary transition-colors">{card.label}</h3>
                        <p className="text-neutral-500 text-sm mt-1">{card.desc}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
