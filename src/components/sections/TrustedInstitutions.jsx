import { FadeIn, SlideInLeft } from '../ui/AnimatedSection';

const logoImports = import.meta.glob('../../assets/images/asset*.jpeg', {
    eager: true,
    import: 'default',
});

const logos = Object.entries(logoImports)
    .map(([path, src]) => {
        const match = path.match(/asset(\d+)\.jpeg$/i);
        return {
            id: match ? Number(match[1]) : 0,
            src,
            alt: match ? `Trusted Institution ${match[1]}` : 'Trusted Institution',
        };
    })
    .sort((a, b) => a.id - b.id);

const TrustedInstitutions = () => {
    return (
        <section className="py-24 bg-white dark:bg-background-dark border-y border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <SlideInLeft delay={0.1}>
                    <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-2 block">
                        Our Partners
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4">
                        Trusted by Leading Healthcare Institutions and Government Organizations
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-300 text-lg">
                        BVM Industries has supplied hospital furniture and healthcare infrastructure products to several reputed government organizations, public sector undertakings and healthcare institutions across India.
                    </p>
                </SlideInLeft>
            </div>

            <FadeIn delay={0.2} className="relative w-full">
                {/* Auto-scrolling logo track */}
                <div className="flex w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                    <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-12 items-center px-6">
                        {/* First set of logos */}
                        {logos.map((logo) => (
                            <div key={`logo-1-${logo.id}`} className="flex-shrink-0 w-40 h-24 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 flex items-center justify-center bg-white rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 p-2">
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="max-w-full max-h-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {logos.map((logo) => (
                            <div key={`logo-2-${logo.id}`} className="flex-shrink-0 w-40 h-24 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 flex items-center justify-center bg-white rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 p-2">
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="max-w-full max-h-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center italic">
                        *This institutional experience reflects our capability to meet strict quality requirements and deliver reliable hospital furniture for large healthcare projects.
                    </p>
                </div>
            </FadeIn>
        </section>
    );
};

export default TrustedInstitutions;
