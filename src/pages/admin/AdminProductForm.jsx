import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getCategories, createProduct, updateProduct,
    addProductImages, deleteProductImage
} from '../../services/api';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const AdminProductForm = () => {
    const { id } = useParams(); // id = product _id when editing
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        title: '', model: '', category: '', reviews: 0, rating: 5, description: '',
        features: [''], specifications: [{ name: '', value: '' }],
    });
    const [existingImages, setExistingImages] = useState([]);
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('bvm_admin_token');
        getCategories().then(r => setCategories(r.data.data));
        if (isEdit) {
            axios.get(`${BASE_URL}/products`, { headers: { Authorization: `Bearer ${token}` } })
                .then(r => {
                    const product = r.data.data.find(p => p._id === id);
                    if (!product) { navigate('/admin/products'); return; }
                    setForm({
                        title: product.title, model: product.model,
                        category: product.category?._id || '',
                        reviews: product.reviews, rating: product.rating,
                        description: product.description,
                        features: product.features.length ? product.features : [''],
                        specifications: product.specifications.length ? product.specifications : [{ name: '', value: '' }],
                    });
                    setExistingImages(product.images || []);
                })
                .finally(() => setLoading(false));
        } else { setLoading(false); }
    }, [id, isEdit, navigate]);

    const setField = (key, value) => setForm(p => ({ ...p, [key]: value }));

    // Features helpers
    const addFeature = () => setForm(p => ({ ...p, features: [...p.features, ''] }));
    const updateFeature = (i, v) => setForm(p => { const f = [...p.features]; f[i] = v; return { ...p, features: f }; });
    const removeFeature = (i) => setForm(p => ({ ...p, features: p.features.filter((_, idx) => idx !== i) }));

    // Specs helpers
    const addSpec = () => setForm(p => ({ ...p, specifications: [...p.specifications, { name: '', value: '' }] }));
    const updateSpec = (i, key, v) => setForm(p => { const s = [...p.specifications]; s[i] = { ...s[i], [key]: v }; return { ...p, specifications: s }; });
    const removeSpec = (i) => setForm(p => ({ ...p, specifications: p.specifications.filter((_, idx) => idx !== i) }));

    const handleDeleteExistingImage = async (publicId) => {
        if (!window.confirm('Remove this image?')) return;
        await deleteProductImage(id, publicId);
        setExistingImages(prev => prev.filter(img => img.publicId !== publicId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const cleanFeatures = form.features.filter(f => f.trim());
            const cleanSpecs = form.specifications.filter(s => s.name.trim() && s.value.trim());

            if (!isEdit) {
                // Create: send all as FormData (includes images)
                const fd = new FormData();
                fd.append('title', form.title); fd.append('model', form.model);
                fd.append('category', form.category); fd.append('reviews', form.reviews);
                fd.append('rating', form.rating); fd.append('description', form.description);
                fd.append('features', JSON.stringify(cleanFeatures));
                fd.append('specifications', JSON.stringify(cleanSpecs));
                newImageFiles.forEach(f => fd.append('images', f));
                await createProduct(fd);
            } else {
                // Update details (JSON)
                await updateProduct(id, {
                    title: form.title, model: form.model, category: form.category,
                    reviews: form.reviews, rating: form.rating, description: form.description,
                    features: JSON.stringify(cleanFeatures),
                    specifications: JSON.stringify(cleanSpecs),
                });
                // Upload any new images separately
                if (newImageFiles.length) {
                    const fd = new FormData();
                    newImageFiles.forEach(f => fd.append('images', f));
                    await addProductImages(id, fd);
                }
            }
            navigate('/admin/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving product.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-neutral-500 p-6">Loading...</div>;

    return (
        <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
                <button onClick={() => navigate('/admin/products')} className="text-neutral-400 hover:text-white transition-colors">
                    <span className="material-icons-outlined">arrow_back</span>
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-white">{isEdit ? 'Edit Product' : 'New Product'}</h2>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                    <h3 className="text-white font-semibold">Basic Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-neutral-300 mb-1 block">Title *</label>
                            <input required value={form.title} onChange={e => setField('title', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="text-sm text-neutral-300 mb-1 block">Model Number *</label>
                            <input required value={form.model} onChange={e => setField('model', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="text-sm text-neutral-300 mb-1 block">Category *</label>
                            <select required value={form.category} onChange={e => setField('category', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                                <option value="">Select category</option>
                                {categories.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-neutral-300 mb-1 block">Reviews</label>
                                <input type="number" min={0} value={form.reviews} onChange={e => setField('reviews', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div>
                                <label className="text-sm text-neutral-300 mb-1 block">Rating (0-5)</label>
                                <input type="number" step="0.5" min={0} max={5} value={form.rating} onChange={e => setField('rating', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-neutral-300 mb-1 block">Description</label>
                        <textarea rows={4} value={form.description} onChange={e => setField('description', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </div>

                {/* Features */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Key Features</h3>
                        <button type="button" onClick={addFeature} className="text-primary text-sm flex items-center gap-1 hover:opacity-80"><span className="material-icons-outlined text-base">add</span>Add</button>
                    </div>
                    <div className="space-y-3">
                        {form.features.map((f, i) => (
                            <div key={i} className="flex gap-2">
                                <input value={f} onChange={e => updateFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`} className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                <button type="button" onClick={() => removeFeature(i)} className="p-2.5 text-neutral-500 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-all"><span className="material-icons-outlined text-base">remove</span></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Specifications */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Technical Specifications</h3>
                        <button type="button" onClick={addSpec} className="text-primary text-sm flex items-center gap-1 hover:opacity-80"><span className="material-icons-outlined text-base">add</span>Add Row</button>
                    </div>
                    <div className="space-y-3">
                        {form.specifications.map((s, i) => (
                            <div key={i} className="flex gap-2">
                                <input value={s.name} onChange={e => updateSpec(i, 'name', e.target.value)} placeholder="Parameter (e.g. Height)" className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                <input value={s.value} onChange={e => updateSpec(i, 'value', e.target.value)} placeholder="Value (e.g. 1200mm)" className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                <button type="button" onClick={() => removeSpec(i)} className="p-2.5 text-neutral-500 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-all"><span className="material-icons-outlined text-base">remove</span></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Images */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4">Product Images</h3>
                    {existingImages.length > 0 && (
                        <div className="mb-4">
                            <p className="text-neutral-400 text-sm mb-3">Current images (click ✕ to remove)</p>
                            <div className="flex flex-wrap gap-3">
                                {existingImages.map(img => (
                                    <div key={img.publicId} className="relative group">
                                        <img src={img.url} alt="" className="w-20 h-20 object-cover rounded-xl border border-neutral-700" />
                                        <button type="button" onClick={() => handleDeleteExistingImage(img.publicId)}
                                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700">✕</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div>
                        <label className="text-sm text-neutral-300 mb-1 block">Upload new images (multiple allowed)</label>
                        <input type="file" multiple accept="image/*" onChange={e => setNewImageFiles(Array.from(e.target.files))}
                            className="w-full text-neutral-400 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer" />
                        {newImageFiles.length > 0 && <p className="text-primary text-xs mt-2">{newImageFiles.length} file(s) selected</p>}
                    </div>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <div className="flex gap-4">
                    <button type="button" onClick={() => navigate('/admin/products')} className="flex-1 border border-neutral-700 text-neutral-300 rounded-xl py-3 text-sm hover:bg-neutral-800 transition-all">Cancel</button>
                    <button type="submit" disabled={submitting} className="flex-1 bg-primary text-white rounded-xl py-3 text-sm font-semibold disabled:opacity-60 transition-all">
                        {submitting ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProductForm;
