import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct, getCategories } from '../../services/api';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterCat, setFilterCat] = useState('');
    const [loading, setLoading] = useState(true);

    const load = () => {
        setLoading(true);
        Promise.all([getProducts(), getCategories()])
            .then(([p, c]) => { setProducts(p.data.data); setCategories(c.data.data); })
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Delete "${title}"? All images will be removed from Cloudinary.`)) return;
        await deleteProduct(id);
        load();
    };

    const filtered = filterCat ? products.filter(p => p.category?.slug === filterCat) : products;

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Products</h2>
                    <p className="text-neutral-400 text-sm mt-0.5">{filtered.length} products</p>
                </div>
                <div className="flex items-center gap-3">
                    <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="bg-neutral-800 border border-neutral-700 text-neutral-300 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c._id} value={c.slug}>{c.title}</option>)}
                    </select>
                    <Link to="/admin/products/new" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
                        <span className="material-icons-outlined text-base">add</span> New Product
                    </Link>
                </div>
            </div>

            {loading ? <p className="text-neutral-500">Loading...</p> : (
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="border-b border-neutral-800">
                            <tr className="text-neutral-400 text-left">
                                <th className="px-5 py-3 font-medium">Product</th>
                                <th className="px-5 py-3 font-medium hidden md:table-cell">Category</th>
                                <th className="px-5 py-3 font-medium hidden sm:table-cell">Model</th>
                                <th className="px-5 py-3 font-medium hidden lg:table-cell">Images</th>
                                <th className="px-5 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {filtered.map(product => (
                                <tr key={product._id} className="hover:bg-neutral-800/40 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            {product.images?.[0]?.url
                                                ? <img src={product.images[0].url} alt={product.title} className="w-11 h-11 rounded-lg object-cover" />
                                                : <div className="w-11 h-11 rounded-lg bg-neutral-800 flex items-center justify-center"><span className="material-icons-outlined text-neutral-500 text-sm">image</span></div>
                                            }
                                            <div>
                                                <p className="font-medium text-white">{product.title}</p>
                                                <p className="text-neutral-500 text-xs">{product.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-neutral-400 hidden md:table-cell">{product.category?.title || '—'}</td>
                                    <td className="px-5 py-4 text-neutral-400 hidden sm:table-cell font-mono text-xs">{product.model}</td>
                                    <td className="px-5 py-4 text-neutral-400 hidden lg:table-cell">{product.images?.length || 0} image(s)</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link to={`/admin/products/${product._id}/edit`} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-all">
                                                <span className="material-icons-outlined text-base">edit</span>
                                            </Link>
                                            <button onClick={() => handleDelete(product._id, product.title)} className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-all">
                                                <span className="material-icons-outlined text-base">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && <tr><td colSpan={5} className="px-5 py-10 text-center text-neutral-500">No products found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
