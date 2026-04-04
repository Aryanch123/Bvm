import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
// import TrustIndicators from '../components/sections/TrustIndicators';
import TrustedInstitutions from '../components/sections/TrustedInstitutions';
import FeatureSection from '../components/sections/FeatureSection';
import CTASection from '../components/sections/CTASection';
import ProductCategoryCard from '../components/ui/ProductCategoryCard';
import { getCategories } from '../services/api';

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        getCategories()
            .then((response) => setCategories(response.data.data))
            .catch(() => setCategories([]))
            .finally(() => setLoadingCategories(false));
    }, []);

    return (
        <>
            <HeroSection />
            {/* <TrustIndicators /> */}

            {/* Product Categories Section */}
            <section className="py-24 bg-background-light dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-neutral-800 dark:text-white mb-4">Hospital Furniture Solutions for Modern Healthcare Facilities</h2>
                            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mb-4">
                                BVM Industries manufactures a wide range of hospital furniture solutions designed to support patient care environments and clinical workflows. Our products are engineered for durability, ease of maintenance and long term reliability in demanding healthcare environments.
                            </p>
                            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
                                Our product range includes hospital beds, medical trolleys, bedside cabinets, IV stands, crash carts and other clinical furniture required across hospital departments such as wards, ICUs and treatment rooms.
                            </p>
                        </div>
                        <Link
                            to="/products"
                            className="hidden md:inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors"
                        >
                            View All Categories <span className="material-icons-outlined ml-1 text-sm">arrow_forward</span>
                        </Link>
                    </div>

                    {loadingCategories ? (
                        <div className="py-12 text-center text-neutral-500 dark:text-neutral-400">Loading categories...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {categories.map((category) => (
                                <ProductCategoryCard key={category._id || category.id} category={category} />
                            ))}
                        </div>
                    )}

                    <div className="mt-8 text-center md:hidden">
                        <Link
                            to="/products"
                            className="inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors"
                        >
                            View All Categories <span className="material-icons-outlined ml-1 text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            <FeatureSection />
            <TrustedInstitutions />
            <CTASection />
        </>
    );
};

export default Home;
