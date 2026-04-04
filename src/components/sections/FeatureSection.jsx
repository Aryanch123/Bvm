import { FadeIn, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from '../ui/AnimatedSection';
import homeFeatureImage from '../../assets/images/imag2.jpeg';

const FeatureSection = () => {
    return (
        <section className="py-24 bg-background-subtle dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <SlideInLeft delay={0.1}>
                        <div>
                            <span className="text-primary font-semibold tracking-wide text-sm mb-2 block">
                                Highlights and USPs
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-8">
                                Why Healthcare Institutions Choose BVM Industries
                            </h2>
                            <StaggerContainer className="space-y-6">
                                <StaggerItem className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                                            <span className="material-icons-outlined">precision_manufacturing</span>
                                        </div>
                                    </div>
                                    <h3 className="ml-4 text-base font-bold text-neutral-800 dark:text-white">Advanced laser cutting and laser welding technology</h3>
                                </StaggerItem>

                                <StaggerItem className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                                            <span className="material-icons-outlined">factory</span>
                                        </div>
                                    </div>
                                    <h3 className="ml-4 text-base font-bold text-neutral-800 dark:text-white">Complete in house manufacturing and finishing</h3>
                                </StaggerItem>

                                <StaggerItem className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                                            <span className="material-icons-outlined">handyman</span>
                                        </div>
                                    </div>
                                    <h3 className="ml-4 text-base font-bold text-neutral-800 dark:text-white">Customization based on project requirements</h3>
                                </StaggerItem>

                                <StaggerItem className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                                            <span className="material-icons-outlined">account_balance</span>
                                        </div>
                                    </div>
                                    <h3 className="ml-4 text-base font-bold text-neutral-800 dark:text-white">Experience working with government institutions and PSUs</h3>
                                </StaggerItem>

                                <StaggerItem className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                                            <span className="material-icons-outlined">shield</span>
                                        </div>
                                    </div>
                                    <h3 className="ml-4 text-base font-bold text-neutral-800 dark:text-white">Durable designs suited for high usage hospital environments</h3>
                                </StaggerItem>

                                <StaggerItem className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                                            <span className="material-icons-outlined">support_agent</span>
                                        </div>
                                    </div>
                                    <h3 className="ml-4 text-base font-bold text-neutral-800 dark:text-white">Reliable after sales support and customer focused service</h3>
                                </StaggerItem>
                            </StaggerContainer>
                        </div>
                    </SlideInLeft>

                    {/* Image Composition */}
                    <SlideInRight delay={0.2} className="relative hidden lg:block">
                        <div className="relative hidden lg:block">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-700">
                                <img
                                    src={homeFeatureImage}
                                    alt="Detail shot of high tech medical equipment interface"
                                    className="w-full h-96 object-cover"
                                />
                                {/* Floating Stat Card */}
                                <FadeIn delay={0.5} className="absolute bottom-8 left-8 bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl max-w-xs border-l-4 border-primary">
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Service Reliability</p>
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-bold text-neutral-800 dark:text-white">24/7</span>
                                        <span className="text-sm font-medium text-primary mb-1">Global Support</span>
                                    </div>
                                </FadeIn>
                            </div>
                            {/* Decorative pattern */}
                            <div className="absolute -z-10 top-[-20px] right-[-20px] w-full h-full border-2 border-primary/20 rounded-2xl"></div>
                        </div>
                    </SlideInRight>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
