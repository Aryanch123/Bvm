import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { getProducts, getCategories } from '../services/api';
import { FadeIn, SlideInLeft, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortBy, setSortBy] = useState('Featured');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getProducts(), getCategories()])
            .then(([productsResponse, categoriesResponse]) => {
                setProducts(productsResponse.data.data);
                setCategories(categoriesResponse.data.data);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const categoryFromQuery = searchParams.get('category');
        if (!categoryFromQuery) {
            setActiveCategory('all');
            return;
        }

        const matchedCategory = categories.find((category) => category.slug === categoryFromQuery);
        setActiveCategory(matchedCategory?.slug || 'all');
    }, [searchParams, categories]);

    const categoryFilters = [
        { label: 'All Products', value: 'all' },
        ...categories.map((category) => ({
            label: category.title,
            value: category.slug,
        })),
    ];

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        if (activeCategory !== 'all') {
            result = result.filter((product) => product.category?.slug === activeCategory);
        }

        switch (sortBy) {
            case 'Name (A-Z)':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'Newest':
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'Featured':
            default:
                break;
        }

        return result;
    }, [activeCategory, sortBy, products]);

    const handleCategoryChange = (categorySlug) => {
        setActiveCategory(categorySlug);

        if (categorySlug === 'all') {
            setSearchParams({});
            return;
        }

        setSearchParams({ category: categorySlug });
    };

    return (
        <>
            <header className="pt-32 pb-12 bg-background-subtle dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SlideInLeft delay={0.1} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                                <Link to="/" className="hover:text-primary">Home</Link>
                                <span className="material-icons-outlined text-xs">chevron_right</span>
                                <span className="text-neutral-800 dark:text-white font-medium">Products</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4">
                                Patient Ward Solutions
                            </h1>
                            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                Comprehensive furnishing solutions for modern patient rooms. Our ISO-certified beds, cabinets, and seating are engineered for patient comfort, safety, and infection control efficiency.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded bg-white text-primary hover:bg-neutral-100 transition-all shadow-sm">
                                Contact Sales
                            </Link>
                        </div>
                    </SlideInLeft>
                </div>
            </header>

            <div className="sticky top-20 z-40 bg-white dark:bg-background-dark border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center overflow-x-auto no-scrollbar py-4 gap-2">
                        {categoryFilters.map((category) => (
                            <button
                                key={category.value}
                                onClick={() => handleCategoryChange(category.value)}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.value
                                    ? 'bg-primary text-white'
                                    : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <section className="py-12 bg-background-light dark:bg-background-dark min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-sm text-neutral-500">
                            Showing {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'}
                        </span>
                        <div className="flex items-center gap-2">
                            <label htmlFor="sort" className="text-sm text-neutral-600 dark:text-neutral-400">Sort by:</label>
                            <select
                                id="sort"
                                className="form-select text-sm border-neutral-300 rounded-md focus:border-primary focus:ring-primary dark:bg-neutral-800 dark:border-neutral-700"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option>Featured</option>
                                <option>Newest</option>
                                <option>Name (A-Z)</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <FadeIn className="text-center py-20 text-neutral-500">Loading products...</FadeIn>
                    ) : filteredAndSortedProducts.length > 0 ? (
                        <StaggerContainer
                            key={`${activeCategory}-${sortBy}-${filteredAndSortedProducts.length}`}
                            staggerDelay={0.1}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredAndSortedProducts.map((product) => (
                                <StaggerItem key={product._id}>
                                    <ProductCard product={product} />
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    ) : (
                        <FadeIn className="text-center py-20 text-neutral-500">
                            No products found for this category.
                        </FadeIn>
                    )}
                </div>
            </section>

            <section className="py-12 bg-primary dark:bg-primary-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] opacity-10"></div>
                <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h2 className="text-2xl font-bold text-white mb-2">Need a Custom Solution?</h2>
                            <p className="text-blue-100 max-w-xl">
                                We specialize in bulk orders and custom manufacturing specifications for hospital networks. Request a tailored quote today.
                            </p>
                        </div>
                        <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded bg-white text-primary hover:bg-neutral-100 transition-colors shadow-lg">
                            Contact Sales
                        </Link>
                    </div>
                </FadeIn>
            </section>
        </>
    );
};

export default Products;
