import { Link } from 'react-router-dom';
import { FadeIn, SlideInLeft, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';

const Certifications = () => {
    return (
        <>
            <div className="pt-32 pb-12 bg-background-subtle dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
                <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                            <span className="material-icons-outlined text-xs">chevron_right</span>
                            <span>Quality &amp; Compliance</span>
                            <span className="material-icons-outlined text-xs">chevron_right</span>
                            <span className="text-primary font-medium">Certifications</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4">Quality and Compliance</h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">
                            BVM Industries follows structured quality inspection procedures throughout fabrication, assembly and finishing stages to ensure durability and reliability of every product manufactured. As the company continues to grow, certification and compliance documentation will reflect our commitment to maintaining strong manufacturing standards and product reliability.
                        </p>
                    </div>
                </FadeIn>
            </div>

            <section className="py-16 bg-background-light dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <StaggerItem className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-soft flex flex-col h-full">
                            <div className="relative bg-neutral-100 dark:bg-neutral-900 p-8 flex items-center justify-center border-b border-neutral-100 dark:border-neutral-700">
                                <div className="w-32 h-44 bg-white shadow-md border border-neutral-200 flex flex-col items-center justify-center relative transform group-hover:-translate-y-1 transition-transform duration-300">
                                    <div className="absolute top-0 w-full h-1 bg-primary"></div>
                                    <div className="p-2 text-center w-full">
                                        <div className="w-8 h-8 mx-auto bg-neutral-100 rounded-full mb-2"></div>
                                        <div className="w-3/4 h-1 bg-neutral-200 mx-auto mb-1"></div>
                                        <div className="w-1/2 h-1 bg-neutral-200 mx-auto mb-3"></div>
                                        <div className="w-full h-px bg-neutral-100 mb-2"></div>
                                        <div className="w-full h-px bg-neutral-100 mb-2"></div>
                                        <div className="w-full h-px bg-neutral-100 mb-2"></div>
                                    </div>
                                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                                        <span className="material-icons-outlined text-sm">verified</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-2">
                                        Active
                                    </span>
                                    <h3 className="text-xl font-bold text-neutral-800 dark:text-white">ISO 13485:2016</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Medical Devices Quality Management</p>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 flex-grow">
                                    Certifies that our quality management system demonstrates the ability to provide medical devices and related services that consistently meet customer and applicable regulatory requirements.
                                </p>
                                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-700 flex justify-between items-center">
                                    <div className="text-xs text-neutral-500">Valid until: Dec 2026</div>
                                    <a href="#" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                                        <span className="material-icons-outlined mr-2">download</span> Download PDF
                                    </a>
                                </div>
                            </div>
                        </StaggerItem>

                        <StaggerItem className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-soft flex flex-col h-full">
                            <div className="relative bg-neutral-100 dark:bg-neutral-900 p-8 flex items-center justify-center border-b border-neutral-100 dark:border-neutral-700">
                                <div className="w-32 h-44 bg-white shadow-md border border-neutral-200 flex flex-col items-center justify-center relative transform group-hover:-translate-y-1 transition-transform duration-300">
                                    <div className="absolute top-0 w-full h-1 bg-neutral-800"></div>
                                    <div className="text-4xl font-bold text-neutral-800 opacity-20">CE</div>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-2">
                                        Active
                                    </span>
                                    <h3 className="text-xl font-bold text-neutral-800 dark:text-white">CE Declaration of Conformity</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">European Medical Device Regulation</p>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 flex-grow">
                                    Declaration that our products comply with the essential health, safety, and environmental protection requirements for products sold within the European Economic Area (EEA).
                                </p>
                                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-700 flex justify-between items-center">
                                    <div className="text-xs text-neutral-500">Updated: Jan 2024</div>
                                    <a href="#" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                                        <span className="material-icons-outlined mr-2">download</span> Download PDF
                                    </a>
                                </div>
                            </div>
                        </StaggerItem>

                        <StaggerItem className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-soft flex flex-col h-full">
                            <div className="relative bg-neutral-100 dark:bg-neutral-900 p-8 flex items-center justify-center border-b border-neutral-100 dark:border-neutral-700">
                                <div className="w-32 h-44 bg-white shadow-md border border-neutral-200 flex flex-col items-center justify-center relative transform group-hover:-translate-y-1 transition-transform duration-300">
                                    <div className="absolute top-0 w-full h-1 bg-blue-800"></div>
                                    <div className="text-2xl font-bold text-blue-900 opacity-20">FDA</div>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-2">
                                        Active
                                    </span>
                                    <h3 className="text-xl font-bold text-neutral-800 dark:text-white">FDA Establishment Registration</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">US Food &amp; Drug Administration</p>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 flex-grow">
                                    Confirmation of our establishment registration and device listing with the US FDA, authorizing distribution of our medical equipment in the United States.
                                </p>
                                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-700 flex justify-between items-center">
                                    <div className="text-xs text-neutral-500">FY 2024</div>
                                    <a href="#" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                                        <span className="material-icons-outlined mr-2">download</span> Download PDF
                                    </a>
                                </div>
                            </div>
                        </StaggerItem>

                        <StaggerItem className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-soft flex flex-col h-full">
                            <div className="relative bg-neutral-100 dark:bg-neutral-900 p-8 flex items-center justify-center border-b border-neutral-100 dark:border-neutral-700">
                                <div className="w-32 h-44 bg-white shadow-md border border-neutral-200 flex flex-col items-center justify-center relative transform group-hover:-translate-y-1 transition-transform duration-300">
                                    <div className="absolute top-0 w-full h-1 bg-primary"></div>
                                    <div className="p-2 text-center w-full opacity-30">
                                        <span className="material-icons-outlined text-4xl">assignment</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-2">
                                        Active
                                    </span>
                                    <h3 className="text-xl font-bold text-neutral-800 dark:text-white">ISO 9001:2015</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Quality Management System</p>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 flex-grow">
                                    General quality management certification ensuring consistent product quality and customer satisfaction across all our manufacturing operations.
                                </p>
                                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-700 flex justify-between items-center">
                                    <div className="text-xs text-neutral-500">Valid until: Oct 2025</div>
                                    <a href="#" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                                        <span className="material-icons-outlined mr-2">download</span> Download PDF
                                    </a>
                                </div>
                            </div>
                        </StaggerItem>

                        <StaggerItem className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-soft flex flex-col h-full">
                            <div className="relative bg-neutral-100 dark:bg-neutral-900 p-8 flex items-center justify-center border-b border-neutral-100 dark:border-neutral-700">
                                <div className="w-32 h-44 bg-white shadow-md border border-neutral-200 flex flex-col items-center justify-center relative transform group-hover:-translate-y-1 transition-transform duration-300">
                                    <div className="absolute top-0 w-full h-1 bg-orange-500"></div>
                                    <div className="text-3xl font-bold text-orange-900 opacity-20">IEC</div>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-2">
                                        Active
                                    </span>
                                    <h3 className="text-xl font-bold text-neutral-800 dark:text-white">IEC 60601-1</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Medical Electrical Equipment Safety</p>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 flex-grow">
                                    Safety and essential performance standards for medical electrical equipment, ensuring our powered devices are safe for patient and operator use.
                                </p>
                                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-700 flex justify-between items-center">
                                    <div className="text-xs text-neutral-500">Report No: 2023-IEC</div>
                                    <a href="#" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                                        <span className="material-icons-outlined mr-2">download</span> Download PDF
                                    </a>
                                </div>
                            </div>
                        </StaggerItem>

                        <StaggerItem className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-soft flex flex-col h-full">
                            <div className="relative bg-neutral-100 dark:bg-neutral-900 p-8 flex items-center justify-center border-b border-neutral-100 dark:border-neutral-700">
                                <div className="w-32 h-44 bg-white shadow-md border border-neutral-200 flex flex-col items-center justify-center relative transform group-hover:-translate-y-1 transition-transform duration-300">
                                    <div className="absolute top-0 w-full h-1 bg-green-600"></div>
                                    <div className="p-2 text-center w-full opacity-30">
                                        <span className="material-icons-outlined text-4xl text-green-800">eco</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-2">
                                        Active
                                    </span>
                                    <h3 className="text-xl font-bold text-neutral-800 dark:text-white">ISO 14001:2015</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Environmental Management</p>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 flex-grow">
                                    Validates our commitment to environmental responsibility through efficient resource use and waste reduction in our manufacturing processes.
                                </p>
                                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-700 flex justify-between items-center">
                                    <div className="text-xs text-neutral-500">Valid until: Jun 2025</div>
                                    <a href="#" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                                        <span className="material-icons-outlined mr-2">download</span> Download PDF
                                    </a>
                                </div>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            <section className="py-20 bg-background-subtle dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <SlideInLeft delay={0.1} className="lg:col-span-4">
                            <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-6">Compliance Standards</h2>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                                Our commitment to quality goes beyond simple certification. We embed regulatory compliance into every stage of our product lifecycle, from initial design to post-market surveillance.
                            </p>
                            <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
                                <h3 className="font-semibold text-neutral-800 dark:text-white mb-3 flex items-center">
                                    <span className="material-icons-outlined text-primary mr-2">contact_support</span>
                                    Have Compliance Questions?
                                </h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                                    Our Regulatory Affairs team is available to answer specific questions regarding product registrations in your region.
                                </p>
                                <Link to="/contact" className="text-sm font-medium text-primary hover:text-primary-dark">Contact Regulatory Affairs &rarr;</Link>
                            </div>
                        </SlideInLeft>

                        <FadeIn delay={0.2} className="lg:col-span-8">
                            <div className="prose prose-blue prose-lg text-neutral-600 dark:text-neutral-300 max-w-none">
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-4">Global Regulatory Commitment</h3>
                                <p className="mb-6">
                                    MedTech Manufacturing operates under a strict Quality Management System (QMS) aligned with US FDA 21 CFR Part 820 and ISO 13485:2016 standards. This integrated approach ensures that patient safety and product efficacy remain our top priorities across all global markets. We regularly undergo rigorous audits by Notified Bodies and regulatory agencies to maintain our certifications.
                                </p>
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-4">Material Traceability &amp; Safety</h3>
                                <p className="mb-6">
                                    Every component used in our medical furniture and equipment is fully traceable. We mandate strict supplier quality agreements and perform regular incoming material inspections. Our materials are tested for:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 mb-8">
                                    <li>Biocompatibility (ISO 10993) to ensure safe contact with patient skin.</li>
                                    <li>Chemical resistance to hospital-grade disinfectants and cleaners.</li>
                                    <li>Flammability standards required for healthcare environments.</li>
                                    <li>RoHS and REACH compliance to limit hazardous substances.</li>
                                </ul>
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-4">Post-Market Surveillance</h3>
                                <p>
                                    Compliance doesn&#39;t end when a product leaves our factory. We maintain a robust post-market surveillance system to actively monitor product performance in clinical settings. This feedback loop allows us to continuously improve our designs and rapidly address any potential safety concerns, ensuring long-term reliability for healthcare providers.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Certifications;
