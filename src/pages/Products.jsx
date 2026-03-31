import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { getProducts, getCategories } from '../services/api';
import { FadeIn, SlideInLeft, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';

const Products = () => {
	const [activeCategory, setActiveCategory] = useState('All Products');
	const [sortBy, setSortBy] = useState('Featured');
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Promise.all([getProducts(), getCategories()])
			.then(([p, c]) => { setProducts(p.data.data); setCategories(c.data.data); })
			.finally(() => setLoading(false));
	}, []);

	// Derive all category titles
	const categoryFilters = ['All Products', ...categories.map(c => c.title)];

	const filteredAndSortedProducts = useMemo(() => {
		let result = [...products];

		// Filter — API products have category as object with .title
		if (activeCategory !== 'All Products') {
			result = result.filter(p => p.category?.title === activeCategory);
		}

		// Sort
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

			{/* Sticky Category Nav */}
			<div className="sticky top-20 z-40 bg-white dark:bg-background-dark border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center overflow-x-auto no-scrollbar py-4 gap-2">
						{categoryFilters.map((cat) => (
							<button
								key={cat}
								onClick={() => setActiveCategory(cat)}
								className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat
									? 'bg-primary text-white'
									: 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
									}`}
							>
								{cat}
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
						<StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{filteredAndSortedProducts.map(product => (
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
