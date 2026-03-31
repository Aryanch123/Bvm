import { useState, useEffect } from 'react';
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from '../../services/api';

const EMPTY = {
    title: '', issuingBody: '', year: '', validUntil: '', description: '', status: 'Active', order: 0,
};

const AdminCertificates = () => {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null); // cert object or null
    const [form, setForm] = useState(EMPTY);
    const [pdfFile, setPdfFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const load = () => {
        setLoading(true);
        getCertificates()
            .then(r => setCerts(r.data.data))
            .catch(() => setError('Failed to load certificates.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const openNew = () => {
        setEditing(null);
        setForm(EMPTY);
        setPdfFile(null);
        setImageFile(null);
        setError('');
        setShowForm(true);
    };

    const openEdit = (cert) => {
        setEditing(cert);
        setForm({
            title: cert.title,
            issuingBody: cert.issuingBody,
            year: cert.year,
            validUntil: cert.validUntil,
            description: cert.description,
            status: cert.status,
            order: cert.order,
        });
        setPdfFile(null);
        setImageFile(null);
        setError('');
        setShowForm(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) { setError('Title is required.'); return; }
        setSaving(true);
        setError('');
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            if (pdfFile) fd.append('pdf', pdfFile);
            if (imageFile) fd.append('image', imageFile);

            if (editing) {
                await updateCertificate(editing._id, fd);
                setSuccess('Certificate updated.');
            } else {
                await createCertificate(fd);
                setSuccess('Certificate created.');
            }
            setShowForm(false);
            load();
        } catch (err) {
            setError(err.response?.data?.message || 'Save failed.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this certificate?')) return;
        try {
            await deleteCertificate(id);
            setSuccess('Deleted.');
            load();
        } catch {
            setError('Delete failed.');
        }
    };

    const inputCls = 'w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded text-white text-sm focus:outline-none focus:border-blue-500';
    const labelCls = 'block text-sm font-medium text-neutral-300 mb-1';

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Certificates</h1>
                    <p className="text-neutral-400 text-sm mt-1">Upload and manage certification documents</p>
                </div>
                <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    <span className="material-icons-outlined text-sm">add</span> New Certificate
                </button>
            </div>

            {success && <div className="mb-4 p-3 bg-green-900/30 border border-green-700 rounded text-green-400 text-sm">{success}</div>}
            {error && !showForm && <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded text-red-400 text-sm">{error}</div>}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-neutral-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-neutral-700">
                            <h2 className="text-lg font-bold text-white">{editing ? 'Edit Certificate' : 'New Certificate'}</h2>
                            <button onClick={() => setShowForm(false)} className="text-neutral-400 hover:text-white">
                                <span className="material-icons-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            {error && <div className="p-3 bg-red-900/30 border border-red-700 rounded text-red-400 text-sm">{error}</div>}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className={labelCls}>Title *</label>
                                    <input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. ISO 13485:2016" />
                                </div>
                                <div>
                                    <label className={labelCls}>Issuing Body</label>
                                    <input className={inputCls} value={form.issuingBody} onChange={e => setForm(f => ({ ...f, issuingBody: e.target.value }))} placeholder="e.g. Bureau Veritas" />
                                </div>
                                <div>
                                    <label className={labelCls}>Year</label>
                                    <input className={inputCls} value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="e.g. 2024" />
                                </div>
                                <div>
                                    <label className={labelCls}>Valid Until</label>
                                    <input className={inputCls} value={form.validUntil} onChange={e => setForm(f => ({ ...f, validUntil: e.target.value }))} placeholder="e.g. Dec 2026" />
                                </div>
                                <div>
                                    <label className={labelCls}>Status</label>
                                    <select className={inputCls} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                                        <option>Active</option>
                                        <option>Expired</option>
                                        <option>Pending</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className={labelCls}>Description</label>
                                    <textarea className={inputCls} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description of what this certification covers..." />
                                </div>
                                <div>
                                    <label className={labelCls}>Display Order</label>
                                    <input type="number" className={inputCls} value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} />
                                </div>
                            </div>

                            <div className="border-t border-neutral-700 pt-4">
                                <p className="text-sm font-semibold text-neutral-300 mb-3">Files</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelCls}>Certificate Document (Image) {editing?.pdf?.publicId && <span className="text-green-400 ml-1">(uploaded)</span>}</label>
                                        <input type="file" accept="image/*" className="w-full text-sm text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
                                            onChange={e => setPdfFile(e.target.files[0])} />
                                        {editing?.pdf?.publicId && !pdfFile && (
                                            <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/certificates/${editing._id}/download`} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline mt-1 block">View current Document</a>
                                        )}
                                    </div>
                                    <div>
                                        <label className={labelCls}>Thumbnail Image (optional) {editing?.image?.url && <span className="text-green-400 ml-1">(uploaded)</span>}</label>
                                        <input type="file" accept="image/*" className="w-full text-sm text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:bg-neutral-600 file:text-white file:cursor-pointer hover:file:bg-neutral-500"
                                            onChange={e => setImageFile(e.target.files[0])} />
                                        {editing?.image?.url && !imageFile && (
                                            <img src={editing.image.url} alt="thumb" className="mt-2 h-16 w-auto rounded border border-neutral-600" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors">
                                    {saving ? 'Saving...' : editing ? 'Update Certificate' : 'Create Certificate'}
                                </button>
                                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* List */}
            {loading ? (
                <div className="text-neutral-400 text-center py-16">Loading...</div>
            ) : certs.length === 0 ? (
                <div className="text-center py-16 text-neutral-500">
                    <span className="material-icons-outlined text-5xl mb-3 block">workspace_premium</span>
                    No certificates yet. Add your first one.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certs.map(cert => (
                        <div key={cert._id} className="bg-neutral-800 border border-neutral-700 rounded-xl p-5 flex gap-4">
                            {cert.image?.url ? (
                                <img src={cert.image.url} alt={cert.title} className="w-16 h-20 object-cover rounded border border-neutral-600 flex-shrink-0" />
                            ) : (
                                <div className="w-16 h-20 bg-neutral-700 rounded flex items-center justify-center flex-shrink-0">
                                    <span className="material-icons-outlined text-neutral-500">workspace_premium</span>
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cert.status === 'Active' ? 'bg-green-900/40 text-green-400' : cert.status === 'Expired' ? 'bg-red-900/40 text-red-400' : 'bg-yellow-900/40 text-yellow-400'}`}>
                                            {cert.status}
                                        </span>
                                        <h3 className="font-bold text-white mt-1">{cert.title}</h3>
                                        <p className="text-neutral-400 text-xs">{cert.issuingBody} {cert.validUntil && `· Valid until ${cert.validUntil}`}</p>
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0">
                                        {cert.pdf?.publicId && (
                                            <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/certificates/${cert._id}/download`} target="_blank" rel="noreferrer" className="p-1.5 text-blue-400 hover:text-blue-300" title="View Document">
                                                <span className="material-icons-outlined text-sm">image</span>
                                            </a>
                                        )}
                                        <button onClick={() => openEdit(cert)} className="p-1.5 text-neutral-400 hover:text-white">
                                            <span className="material-icons-outlined text-sm">edit</span>
                                        </button>
                                        <button onClick={() => handleDelete(cert._id)} className="p-1.5 text-neutral-400 hover:text-red-400">
                                            <span className="material-icons-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-neutral-500 text-xs mt-2 line-clamp-2">{cert.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminCertificates;
