import { Link } from 'react-router-dom';

const ProductCategoryCard = ({ category }) => {
    const imageUrl = category.image?.url || category.image;

    return (
        <div className="group relative bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-soft">
            <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <img
                    src={imageUrl}
                    alt={category.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-2">{category.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6 line-clamp-2">
                    {category.description}
                </p>
                <Link
                    to={`/products?category=${encodeURIComponent(category.slug || '')}`}
                    className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-primary-dark"
                >
                    Explore Products <span className="material-icons-outlined ml-1 text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                </Link>
            </div>
        </div>
    );
};

export default ProductCategoryCard;
