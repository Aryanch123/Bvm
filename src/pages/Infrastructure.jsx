import { Link } from 'react-router-dom';
import { FadeIn, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';

const Infrastructure = () => {
    return (
        <>
            <section className="relative pt-32 pb-20 lg:pt-0 lg:pb-0 overflow-hidden bg-background-light dark:bg-background-dark min-h-[600px] flex items-center">
                <div className="w-full h-full lg:grid lg:grid-cols-2">
                    <SlideInLeft delay={0.1} className="flex items-center justify-center p-8 lg:p-20 xl:p-24 lg:pt-32 order-2 lg:order-1">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase mb-6">
                                Infrastructure
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white leading-tight mb-6">
                                Manufacturing <span className="text-primary">Infrastructure</span>
                            </h1>
                            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
                                BVM Industries operates from a dedicated manufacturing facility located in Agra, Uttar Pradesh, India with an area of approximately 12,800 square feet.
                            </p>
                            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                                The facility is equipped with fabrication machinery, laser cutting systems, laser welding machines and an in house powder coating plant. Maintaining complete control over production allows us to ensure consistent quality standards, efficient production timelines and flexibility for customization.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-10">
                                <div>
                                    <span className="block text-3xl font-bold text-neutral-800 dark:text-white">50k+</span>
                                    <span className="text-sm text-neutral-500">Units/Year Capacity</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-bold text-neutral-800 dark:text-white">99.8%</span>
                                    <span className="text-sm text-neutral-500">Quality Pass Rate</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#capabilities" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded bg-primary text-white hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40" >
                                    View Capabilities
                                </a>
                            </div>
                        </div>
                    </SlideInLeft>
                    <FadeIn delay={0.2} duration={1} className="relative h-96 lg:h-auto w-full order-1 lg:order-2">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVbBj8EDHBq776Iobs8sYuvuzE84hS0PrBYJLb_TNrBPvcOZw7_f1eYA0TK4sWefEnQM-jUMxAJvWF1yTm29sKO6LzbcZynVllVd5Bu4GSpnkGLXWjUo2-pJNt4w7OpcM0Z40Lkcb3cec_EdjAmgEHk129gsEAPDtKIQ5MdPOGbXeS0u90OFlRLR-WTzJypzAGnAuGN08qqwnkFQGSJYtklxulfKFiwwI5tZq-_JLWsr2lsziIFOXNi-R9RFC37uzOBHxaCLgEPBw"
                            alt="Modern automated manufacturing line for medical devices"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                    </FadeIn>
                </div>
            </section>

            <section className="py-24 bg-background-subtle dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn delay={0} className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-2 block">Our Workflow</span>
                        <h2 className="text-3xl font-bold text-neutral-800 dark:text-white mb-4">The Manufacturing Process</h2>
                        <p className="text-neutral-600 dark:text-neutral-400">From raw material sourcing to final assembly, our streamlined 4-step process ensures efficiency and consistency.</p>
                    </FadeIn>

                    <div className="relative">
                        <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-neutral-200 dark:bg-neutral-700 z-0"></div>
                        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                            <StaggerItem className="group text-center">
                                <div className="w-24 h-24 mx-auto bg-white dark:bg-neutral-800 rounded-full border-2 border-primary shadow-soft flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-icons-outlined text-4xl text-primary">raw_on</span>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-3">1. Material Sourcing</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed px-4">
                                    Procuring medical-grade stainless steel and antimicrobial polymers from certified global partners.
                                </p>
                            </StaggerItem>

                            <StaggerItem className="group text-center">
                                <div className="w-24 h-24 mx-auto bg-white dark:bg-neutral-800 rounded-full border-2 border-primary shadow-soft flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-icons-outlined text-4xl text-primary">precision_manufacturing</span>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-3">2. Precision Machining</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed px-4">
                                    Automated CNC cutting and laser welding ensure structural integrity and seamless joints.
                                </p>
                            </StaggerItem>

                            <StaggerItem className="group text-center">
                                <div className="w-24 h-24 mx-auto bg-white dark:bg-neutral-800 rounded-full border-2 border-primary shadow-soft flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-icons-outlined text-4xl text-primary">science</span>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-3">3. Sterile Assembly</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed px-4">
                                    Components are assembled in clean-room environments to minimize contamination risks.
                                </p>
                            </StaggerItem>

                            <StaggerItem className="group text-center">
                                <div className="w-24 h-24 mx-auto bg-white dark:bg-neutral-800 rounded-full border-2 border-primary shadow-soft flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-icons-outlined text-4xl text-primary">verified</span>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-3">4. Quality Assurance</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed px-4">
                                    Rigorous stress testing and ISO 13485 compliance checks before final packaging.
                                </p>
                            </StaggerItem>
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            <section id="capabilities" className="py-24 bg-background-light dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-2 block">
                                Manufacturing Technology
                            </span>
                            <h2 className="text-3xl font-bold text-neutral-800 dark:text-white mb-4">Precision Manufacturing with Advanced Laser Technology</h2>
                            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mb-4">
                                BVM Industries uses advanced laser cutting and laser welding machines that provide a significant improvement compared to conventional fabrication techniques such as traditional argon welding and manual sheet cutting.
                            </p>
                            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
                                Laser manufacturing enables higher dimensional accuracy, stronger weld joints and better finishing quality. This technology ensures structural strength, consistent product quality and increased production capacity which allows us to efficiently handle institutional and project based orders.
                            </p>
                        </div>
                        <a href="#" className="hidden md:inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors">
                            Download Equipment List <span className="material-icons-outlined ml-1 text-sm">download</span>
                        </a>
                    </div>

                    <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <StaggerItem className="group rounded-lg overflow-hidden bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary/50 transition-all duration-300">
                            <div className="aspect-[16/10] overflow-hidden">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo8xMgyOa1SIjw9mfptHZYNHm4jMcxle73mTzhuiWS9guNNCIjiK5xoAgwFROPz7lMnmjf6b-O3ujPQgXnSZ6zwD140ApTA__qRzJafNBiw1mIZE0iK2u-DT_1Hs3kTrsK6ZloOeqEJPF3jEovKC87L4oxosyUQyWDPOsMAHibw4_lweJAviW3aEERhmFfPtwC93oo2H4alpFJcJem9f3jg-QNZs7A4hjb2vAaNCeGu9bfYA6x52958xZVCjS19N2PHxLjJJsh2Ao"
                                    alt="5-Axis CNC Machine processing metal component"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-neutral-800 dark:text-white">5-Axis CNC Centers</h3>
                                    <span className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-xs font-semibold rounded text-neutral-600 dark:text-neutral-300">Germany</span>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">High-precision milling for complex joint components and surgical instrument parts with micrometer tolerance.</p>
                                <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Tolerance: ±0.005mm</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>24/7 Automated Operation</li>
                                </ul>
                            </div>
                        </StaggerItem>

                        <StaggerItem className="group rounded-lg overflow-hidden bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary/50 transition-all duration-300">
                            <div className="aspect-[16/10] overflow-hidden">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRLi_Jg4LA73mYKDGUm6FUQrGNbfpPjgf35A2AjmZ1MftD2TuKYujgnAwFzKj9MVXxC98gzBOTHufZgfMmYgM9R9B_L3ltLrlkEWVG8-i73OWuvyRHK-bs5c94RTuGHIRXw027egjArnUUDbZMOhBPmggiJx485Ov7qApmCNt8y4ChQC2UAGHXGx1lglpgq-nTTTM11g2fSgvlq0xyzHpPESxF4kz5RSkuKc0oQaU3J82teydGMLPtMSaNpphyHSq7f7svtREW9eI"
                                    alt="Robotic welding arm working on hospital bed frame"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-neutral-800 dark:text-white">Robotic Welding Cells</h3>
                                    <span className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-xs font-semibold rounded text-neutral-600 dark:text-neutral-300">Japan</span>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">Automated TIG/MIG welding for seamless, hygienic joints essential for infection control in hospital furniture.</p>
                                <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Consistent bead quality</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Thermal distortion control</li>
                                </ul>
                            </div>
                        </StaggerItem>

                        <StaggerItem className="group rounded-lg overflow-hidden bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary/50 transition-all duration-300">
                            <div className="aspect-[16/10] overflow-hidden">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLvY6xaqZHtgAF5RaRtCBsGN3G2e3qkaBIjMJgA6LLZmkehWp_OQDtsNlLDVY58mOW82wqaTVg-XE3qCN-p9jaeoGwKBuC0x9pWtA7aLCwMmBvvS0-GuaEJKCnzzAwZTrlVapu_oTo5iL4MIF6NotkduPx6ZbKxrElrXYFw28-L4UF8GzQf-pMifSpgfqgXemQHldUd4rZMSjyTD5t10cKzel73uFgH-7ZyaZa0tFHxjOXKJnx4Cokpq9nr9_A039n_eaCuiZlz3g"
                                    alt="Powder coating facility for medical equipment"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-neutral-800 dark:text-white">Antimicrobial Coating Line</h3>
                                    <span className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-xs font-semibold rounded text-neutral-600 dark:text-neutral-300">USA</span>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">Electrostatic powder coating systems applying silver-ion based antimicrobial layers to all exposed surfaces.</p>
                                <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>1000h Salt Spray Test</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Eco-friendly recovery</li>
                                </ul>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="h-px w-12 bg-primary"></span>
                                <span className="text-primary font-bold uppercase tracking-widest text-sm">Customization Capability</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Tailored to Your Specifications</h2>
                            <p className="text-neutral-300 text-lg mb-6 leading-relaxed">
                                Healthcare facilities often have unique infrastructure layouts and operational requirements. BVM Industries works closely with hospitals, project contractors and procurement teams to develop furniture solutions that match specific project needs.
                            </p>
                            <p className="text-neutral-300 text-lg mb-10 leading-relaxed">
                                Customization can be provided in dimensions, materials, functional design features and configuration adjustments ensuring seamless integration with hospital workflows.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMPNfAM1DMADb_QVWhqg1sk-_7KF_ZVIVqtbSG_i03GMGaA2mc6R2J0--I1sZ4K6DfW-z5Q1PrcorOF0OkxY4vlobT2lOV-cpvt6gLHWcgYQYdghI3kLDjC43jdzH9fuBKwfbEhwpVUzGfavtGl9-GuF0F9rLyWUJeWoIgigY5hcQhz72L7VlcO88TW7-vuo9P6cpLfIDUmR7a7l5MOU1cakiq8w0jJpovbHDkfB1rL_ZIDk6qXaY6pnaedPxSPTEeLPTPh7ViNAI"
                                    alt="Quality control engineer inspecting medical device with tablet"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white text-neutral-900 p-6 rounded-lg shadow-xl border-t-4 border-primary">
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <span className="block text-3xl font-bold text-primary">ISO</span>
                                        <span className="text-xs font-bold uppercase">Certified</span>
                                    </div>
                                    <div className="h-10 w-px bg-neutral-200"></div>
                                    <div>
                                        <p className="font-bold text-lg">13485:2016</p>
                                        <p className="text-xs text-neutral-500">Medical Devices QMS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 relative overflow-hidden bg-primary">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <FadeIn className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Partner with a Manufacturer You Can Trust</h2>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                        Schedule a virtual or physical tour of our facility to see our capabilities firsthand.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded bg-white text-primary hover:bg-neutral-100 transition-colors shadow-lg"
                        >
                            Request Factory Tour
                        </Link>
                        <a href="#" className="inline-flex items-center justify-center px-8 py-3.5 border border-white text-base font-medium rounded bg-transparent text-white hover:bg-white/10 transition-colors">
                            Download Capacity Report
                        </a>
                    </div>
                </FadeIn>
            </section>
        </>
    );
};

export default Infrastructure;
