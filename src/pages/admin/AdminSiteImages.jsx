import { useEffect, useState } from 'react';
import { getSiteImages, uploadSiteImage, deleteSiteImage, updateSiteImage } from '../../services/api';

const SECTIONS = ['homepage', 'gallery'];

const AdminSiteImages = () => {
    const [images, setImages] = useState([]);
    const [section, setSection] = useState('homepage');
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ label: '', order: 0, section: 'homepage' });
    const [imageFile, setImageFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const load = () => {
        setLoading(true);
        getSiteImages().then(r => setImages(r.data.data)).finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const filtered = images.filter(img => img.section === section);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!imageFile) { setError('Please select an image file.'); return; }
        setSubmitting(true); setError('');
        try {
            const fd = new FormData();
            fd.append('image', imageFile);
            fd.append('section', form.section);
            fd.append('label', form.label);
            fd.append('order', form.order);
            await uploadSiteImage(fd);
            setShowForm(false);
            setForm({ label: '', order: 0, section: 'homepage' }); setImageFile(null);
            load();
        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id, label) => {
        if (!window.confirm(`Delete "${label}"? This will remove it from Cloudinary.`)) return;
        await deleteSiteImage(id);
        load();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Site Images</h2>
                    <p className="text-neutral-400 text-sm mt-0.5">Manage homepage and gallery images</p>
                </div>
                <button onClick={() => { setShowForm(true); setError(''); }} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
                    <span className="material-icons-outlined text-base">upload</span> Upload Image
                </button>
            </div>

            {/* Section tabs */}
            <div className="flex gap-2 mb-6">
                {SECTIONS.map(s => (
                    <button key={s} onClick={() => setSection(s)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${section === s ? 'bg-primary text-white' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}>{s}</button>
                ))}
            </div>

            {/* Upload Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6">
                        <h3 className="text-white font-bold text-lg mb-5">Upload Site Image</h3>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div>
                                <label className="text-sm text-neutral-300 mb-1 block">Section *</label>
                                <select value={form.section} onChange={e => setForm(p => ({ ...p, section: e.target.value }))} className="w-full bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary capitalize">
                                    {SECTIONS.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-neutral-300 mb-1 block">Label *</label>
                                <input required value={form.label} onChange={e => setForm(p => ({ ...p, label: e.target.value }))} placeholder="e.g. Hero Background" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div>
                                <label className="text-sm text-neutral-300 mb-1 block">Display Order</label>
                                <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: e.target.value }))} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div>
                                <label className="text-sm text-neutral-300 mb-1 block">Image File *</label>
                                <input type="file" required accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full text-neutral-400 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer" />
                            </div>
                            {error && <p className="text-red-400 text-sm">{error}</p>}
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-neutral-700 text-neutral-300 rounded-xl py-2.5 text-sm hover:bg-neutral-800 transition-all">Cancel</button>
                                <button type="submit" disabled={submitting} className="flex-1 bg-primary text-white rounded-xl py-2.5 text-sm font-semibold disabled:opacity-60">{submitting ? 'Uploading...' : 'Upload'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Grid */}
            {loading ? <p className="text-neutral-500">Loading...</p> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map(img => (
                        <div key={img._id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group">
                            <div className="relative aspect-video overflow-hidden">
                                <img src={img.url} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="text-white text-sm font-medium">{img.label}</p>
                                    <p className="text-neutral-500 text-xs mt-0.5">Order: {img.order}</p>
                                </div>
                                <button onClick={() => handleDelete(img._id, img.label)} className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-all">
                                    <span className="material-icons-outlined text-base">delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-3 bg-neutral-900 border border-dashed border-neutral-700 rounded-2xl p-12 text-center">
                            <span className="material-icons-outlined text-neutral-600 text-5xl mb-3 block">photo_library</span>
                            <p className="text-neutral-500">No {section} images yet. Upload one to get started.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminSiteImages;
