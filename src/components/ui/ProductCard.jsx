import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="group relative bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-soft flex flex-col h-full">
            <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 relative">
                {product.isBestSeller && (
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">Best Seller</span>
                )}
                {product.isNewArrival && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">New Arrival</span>
                )}
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-2 text-xs font-semibold text-primary uppercase tracking-wide">{product.category}</div>
                <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4 line-clamp-2 flex-grow">
                    {product.description}
                </p>
                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-700 flex justify-between items-center">
                    <span className="text-xs text-neutral-400">Model: {product.model}</span>
                    <Link
                        to={`/products/${product.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-primary-dark"
                    >
                        View Details <span className="material-icons-outlined ml-1 text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
