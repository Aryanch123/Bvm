import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: BASE_URL });

// Attach JWT to every request if present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('bvm_admin_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ── Auth ─────────────────────────────────────────────
export const loginAdmin = (email, password) =>
    api.post('/auth/login', { email, password });

export const verifyToken = () => api.get('/auth/verify');

// ── Categories ───────────────────────────────────────
export const getCategories = () => api.get('/categories');
export const getCategoryBySlug = (slug) => api.get(`/categories/${slug}`);
export const createCategory = (formData) =>
    api.post('/categories', formData); // FormData
export const updateCategory = (id, formData) =>
    api.put(`/categories/${id}`, formData); // FormData
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// ── Products ─────────────────────────────────────────
export const getProducts = (categorySlug) =>
    api.get('/products', { params: categorySlug ? { category: categorySlug } : {} });
export const getProductBySlug = (slug) => api.get(`/products/${slug}`);
export const createProduct = (formData) =>
    api.post('/products', formData); // FormData (includes images)
export const updateProduct = (id, data) =>
    api.put(`/products/${id}`, data); // JSON (no images)
export const addProductImages = (id, formData) =>
    api.post(`/products/${id}/images`, formData); // FormData
export const deleteProductImage = (id, publicId) =>
    api.delete(`/products/${id}/images/${encodeURIComponent(publicId)}`);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// ── Site Images ──────────────────────────────────────
export const getSiteImages = (section) =>
    api.get('/site-images', { params: section ? { section } : {} });
export const uploadSiteImage = (formData) =>
    api.post('/site-images', formData); // FormData
export const updateSiteImage = (id, formData) =>
    api.put(`/site-images/${id}`, formData);
export const deleteSiteImage = (id) => api.delete(`/site-images/${id}`);

// ── Certificates ─────────────────────────────────────
export const getCertificates = () => api.get('/certificates');
export const getCertificate = (id) => api.get(`/certificates/${id}`);
export const createCertificate = (formData) => api.post('/certificates', formData);
export const updateCertificate = (id, formData) => api.put(`/certificates/${id}`, formData);
export const deleteCertificate = (id) => api.delete(`/certificates/${id}`);

export default api;
