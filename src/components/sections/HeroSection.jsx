import { Link } from 'react-router-dom';
import { FadeIn, SlideInLeft } from '../ui/AnimatedSection';

const HeroSection = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent dark:from-background-dark/95 dark:via-background-dark/80 dark:to-transparent z-10 w-full lg:w-3/4"></div>
                <FadeIn duration={1.5} className="w-full h-full">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMPNfAM1DMADb_QVWhqg1sk-_7KF_ZVIVqtbSG_i03GMGaA2mc6R2J0--I1sZ4K6DfW-z5Q1PrcorOF0OkxY4vlobT2lOV-cpvt6gLHWcgYQYdghI3kLDjC43jdzH9fuBKwfbEhwpVUzGfavtGl9-GuF0F9rLyWUJeWoIgigY5hcQhz72L7VlcO88TW7-vuo9P6cpLfIDUmR7a7l5MOU1cakiq8w0jJpovbHDkfB1rL_ZIDk6qXaY6pnaedPxSPTEeLPTPh7ViNAI"
                        alt="Modern clean hospital ward with advanced medical equipment"
                        className="w-full h-full object-cover object-center transform scale-105"
                    />
                </FadeIn>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <SlideInLeft delay={0.2}>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase mb-6">
                            ISO 13485 Certified Manufacturing
                        </div>
                    </SlideInLeft>

                    <SlideInLeft delay={0.3}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-white leading-tight mb-6">
                            Engineering Reliable Hospital Furniture for <span className="text-primary">Modern Healthcare</span>
                        </h1>
                    </SlideInLeft>

                    <SlideInLeft delay={0.4}>
                        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed max-w-lg">
                            BVM Industries manufactures durable and thoughtfully engineered hospital furniture designed to support patient care, clinical efficiency and long term performance. Our products are trusted by healthcare institutions, government organizations and medical infrastructure projects across India.
                        </p>
                    </SlideInLeft>

                    <SlideInLeft delay={0.5}>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded bg-primary text-white hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
                            >
                                View Product Range
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-8 py-3.5 border border-neutral-300 dark:border-neutral-600 text-base font-medium rounded bg-white dark:bg-neutral-800 text-neutral-700 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all hover:border-primary/50"
                            >
                                Request a Quote
                            </Link>
                        </div>
                    </SlideInLeft>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
