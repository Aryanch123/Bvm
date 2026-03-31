import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug, getProducts } from '../services/api';

const ProductDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        getProductBySlug(slug)
            .then(r => {
                setProduct(r.data.data);
                setActiveImage(0);
                setIsZoomed(false);
                setZoomPosition({ x: 50, y: 50 });
                // Fetch related products in same category
                return getProducts(r.data.data.category?.slug);
            })
            .then(r => {
                setRelatedProducts(
                    r.data.data.filter(p => p.slug !== slug).slice(0, 3)
                );
            })
            .catch(() => navigate('/products'))
            .finally(() => setLoading(false));
    }, [slug, navigate]);

    if (loading) return (
        <div className="min-h-screen pt-20 flex items-center justify-center text-neutral-500">Loading...</div>
    );
    if (!product) return null;

    const activeImageUrl = product.images[activeImage]?.url || product.images[activeImage];

    const handleImageHover = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setZoomPosition({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });
    };

    const handleViewProduct = () => {
        if (activeImageUrl) {
            window.open(activeImageUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <>
            <main className="pt-20">
                <div className="bg-background-subtle dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                        <nav aria-label="Breadcrumb" className="flex text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            <ol className="flex items-center space-x-2">
                                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                                <li><span className="text-neutral-300 dark:text-neutral-600">/</span></li>
                                <li><Link to="/products" className="hover:text-primary transition-colors">Products</Link></li>
                                <li><span className="text-neutral-300 dark:text-neutral-600">/</span></li>
                                <li><Link to={`/products?category=${encodeURIComponent(product.category?.slug || '')}`} className="hover:text-primary transition-colors">{product.category?.title || product.category}</Link></li>
                                <li><span className="text-neutral-300 dark:text-neutral-600">/</span></li>
                                <li><span aria-current="page" className="text-primary font-semibold truncate max-w-[200px] inline-block align-bottom">{product.title}</span></li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <section className="py-12 lg:py-16 bg-background-light dark:bg-background-dark">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-start">

                            {/* Image Gallery */}
                            <div className="flex flex-col space-y-4">
                                <div
                                    className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-soft group"
                                    onMouseEnter={() => setIsZoomed(true)}
                                    onMouseLeave={() => {
                                        setIsZoomed(false);
                                        setZoomPosition({ x: 50, y: 50 });
                                    }}
                                    onMouseMove={handleImageHover}
                                >
                                    <img
                                        src={activeImageUrl}
                                        alt={`${product.title} - Main View`}
                                        className={`w-full h-full object-cover object-center transition-transform duration-300 ${isZoomed ? 'scale-[1.9]' : 'scale-100'}`}
                                        style={{ transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }}
                                    />
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent px-4 py-3 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        Hover to zoom
                                    </div>
                                    {product.isBestSeller && (
                                        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider shadow-sm">
                                            Best Seller
                                        </div>
                                    )}
                                    {product.isNewArrival && (
                                        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider shadow-sm">
                                            New Arrival
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-4 gap-4">
                                    {product.images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setActiveImage(index);
                                                setIsZoomed(false);
                                                setZoomPosition({ x: 50, y: 50 });
                                            }}
                                            className={`relative aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden cursor-pointer transition-all ${activeImage === index
                                                ? 'border-2 border-primary opacity-100'
                                                : 'border border-neutral-200 dark:border-neutral-700 opacity-70 hover:opacity-100 hover:border-primary'
                                                }`}
                                        >
                                            <img src={img?.url || img} alt={`${product.title} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}

                                    {/* Optional Video Thumbnail if needed, omitting for dynamic data unless specified */}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="mt-10 lg:mt-0">
                                <div className="mb-2 text-sm font-semibold text-primary uppercase tracking-wide">Model: {product.model}</div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-white mb-4">{product.title}</h1>

                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star} className="material-icons-outlined text-lg">
                                                {star <= 4 ? 'star' : 'star_half'}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-sm text-neutral-500 dark:text-neutral-400">({product.reviews} Institutional Reviews)</span>
                                </div>

                                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                                    {product.description}
                                </p>

                                <div className="border-t border-b border-neutral-200 dark:border-neutral-700 py-6 mb-8">
                                    <h3 className="text-sm font-bold text-neutral-800 dark:text-white uppercase tracking-wider mb-4">Key Features</h3>
                                    <ul className="space-y-3">
                                        {product.features.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="material-icons-outlined text-primary mr-3 mt-0.5">check_circle</span>
                                                <span className="text-neutral-600 dark:text-neutral-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to="/contact" className="flex-1 inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded bg-primary text-white hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40">
                                        Inquiry Now
                                    </Link>
                                    <button
                                        onClick={handleViewProduct}
                                        className="flex-1 inline-flex items-center justify-center px-8 py-3.5 border border-neutral-300 dark:border-neutral-600 text-base font-medium rounded bg-white dark:bg-neutral-800 text-neutral-700 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all"
                                    >
                                        <span className="material-icons-outlined mr-2">visibility</span>
                                        View Product
                                    </button>
                                </div>

                                <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400 text-center sm:text-left">
                                    <span className="material-icons-outlined text-sm align-middle mr-1">verified</span> Official Manufacturer Warranty Included
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Specifications */}
                {product.specifications && product.specifications.length > 0 && (
                    <section className="py-16 bg-background-subtle dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">Technical Specifications</h2>
                                <p className="text-neutral-600 dark:text-neutral-400">Detailed dimensions and operational parameters.</p>
                            </div>
                        </div>

                            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                                        <thead className="bg-neutral-50 dark:bg-neutral-900">
                                            <tr>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Parameter</th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Specification</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                            {product.specifications.map((spec, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-neutral-800' : 'bg-neutral-50/50 dark:bg-neutral-900/50'}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-white">{spec.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-300">{spec.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="py-16 bg-background-light dark:bg-background-dark">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-8">Related Products</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedProducts.map(rel => (
                                    <div key={rel.id} className="group relative bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-soft flex flex-col h-full">
                                        <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                                            <img
                                                src={rel.images?.[0]?.url || rel.images?.[0]}
                                                alt={rel.title}
                                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-5 flex flex-col flex-grow">
                                            <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-2">{rel.title}</h3>
                                            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4 line-clamp-2">{rel.description}</p>
                                            <Link to={`/products/${rel.slug}`} className="mt-auto text-primary font-medium text-sm hover:underline">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
};

export default ProductDetail;
