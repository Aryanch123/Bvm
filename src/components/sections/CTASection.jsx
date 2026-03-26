import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/AnimatedSection';

const CTASection = () => {
    return (
        <section className="py-20 relative overflow-hidden bg-primary">
            {/* Abstract Background Pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            ></div>

            <FadeIn className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to upgrade your facility?</h2>
                <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                    Contact our sales team for a consultation and discover how our manufacturing solutions can fit your specific clinical needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded bg-white text-primary hover:bg-neutral-100 transition-colors shadow-lg"
                    >
                        Request a Quote
                    </Link>
                    <a
                        href="#"
                        className="inline-flex items-center justify-center px-8 py-3.5 border border-white text-base font-medium rounded bg-transparent text-white hover:bg-white/10 transition-colors"
                    >
                        Download Brochure
                    </a>
                </div>
            </FadeIn>
        </section>
    );
};

export default CTASection;
