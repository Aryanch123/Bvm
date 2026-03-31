import { useEffect, useState } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/api';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [form, setForm] = useState({ title: '', description: '', order: 0 });
    const [imageFile, setImageFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const load = () => {
        setLoading(true);
        getCategories().then(r => setCategories(r.data.data)).finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const openCreate = () => { setEditTarget(null); setForm({ title: '', description: '', order: 0 }); setImageFile(null); setError(''); setShowForm(true); };
    const openEdit = (cat) => { setEditTarget(cat); setForm({ title: cat.title, description: cat.description, order: cat.order }); setImageFile(null); setError(''); setShowForm(true); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const fd = new FormData();
            fd.append('title', form.title);
            fd.append('description', form.description);
            fd.append('order', form.order);
            if (imageFile) fd.append('image', imageFile);

            if (editTarget) { await updateCategory(editTarget._id, fd); }
            else { await createCategory(fd); }

            setShowForm(false);
            load();
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving category.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this category? This cannot be undone.')) return;
        await deleteCategory(id);
        load();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Categories</h2>
                    <p className="text-neutral-400 text-sm mt-0.5">{categories.length} categories</p>
                </div>
                <button onClick={openCreate} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
                    <span className="material-icons-outlined text-base">add</span> New Category
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6">
                        <h3 className="text-white font-bold text-lg mb-5">{editTarget ? 'Edit Category' : 'New Category'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-neutral-300 mb-1 block">Title *</label>
                                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-neutral-300 mb-1 block">Description</label>
                                <textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-neutral-300 mb-1 block">Display Order</label>
                                <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: e.target.value }))} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-neutral-300 mb-1 block">Category Image {editTarget ? '(leave blank to keep current)' : ''}</label>
                                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full text-neutral-400 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer" />
                                {editTarget?.image?.url && !imageFile && (
                                    <img src={editTarget.image.url} alt="Current" className="mt-2 h-20 rounded-lg object-cover" />
                                )}
                            </div>
                            {error && <p className="text-red-400 text-sm">{error}</p>}
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-neutral-700 text-neutral-300 rounded-xl py-2.5 text-sm hover:bg-neutral-800 transition-all">Cancel</button>
                                <button type="submit" disabled={submitting} className="flex-1 bg-primary text-white rounded-xl py-2.5 text-sm font-semibold disabled:opacity-60 transition-all">{submitting ? 'Saving...' : 'Save'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Table */}
            {loading ? <p className="text-neutral-500">Loading...</p> : (
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="border-b border-neutral-800">
                            <tr className="text-neutral-400 text-left">
                                <th className="px-5 py-3 font-medium">Category</th>
                                <th className="px-5 py-3 font-medium hidden md:table-cell">Description</th>
                                <th className="px-5 py-3 font-medium hidden sm:table-cell">Order</th>
                                <th className="px-5 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {categories.map(cat => (
                                <tr key={cat._id} className="hover:bg-neutral-800/40 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            {cat.image?.url ? <img src={cat.image.url} alt={cat.title} className="w-10 h-10 rounded-lg object-cover" /> : <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center"><span className="material-icons-outlined text-neutral-500 text-sm">image</span></div>}
                                            <div>
                                                <p className="font-medium text-white">{cat.title}</p>
                                                <p className="text-neutral-500 text-xs">{cat.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-neutral-400 hidden md:table-cell max-w-xs truncate">{cat.description || '—'}</td>
                                    <td className="px-5 py-4 text-neutral-400 hidden sm:table-cell">{cat.order}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEdit(cat)} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-all"><span className="material-icons-outlined text-base">edit</span></button>
                                            <button onClick={() => handleDelete(cat._id)} className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-all"><span className="material-icons-outlined text-base">delete</span></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && <tr><td colSpan={4} className="px-5 py-10 text-center text-neutral-500">No categories yet.</td></tr>}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminCategories;
