import { Link } from 'react-router-dom';
import { FadeIn, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';

const About = () => {
    return (
        <>
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-background-subtle dark:bg-neutral-900">
                <div className="absolute inset-0 z-0 opacity-10 pattern-grid-lg text-primary"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn duration={0.8} delay={0.1} className="flex flex-col items-center text-center">
                        <nav aria-label="Breadcrumb" className="flex mb-6">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <Link to="/" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-primary dark:text-neutral-400 dark:hover:text-white">
                                        <span className="material-icons-outlined mr-2 text-base">home</span>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <span className="material-icons-outlined text-neutral-400 mx-1">chevron_right</span>
                                        <span className="text-sm font-medium text-primary md:ml-2 dark:text-primary">About Us</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-white leading-tight mb-6">
                            About <span className="text-primary">BVM Industries</span>
                        </h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed max-w-2xl">
                            BVM Industries is a hospital furniture manufacturing company established in 2018 and based in Agra, Uttar Pradesh, India.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="py-20 bg-background-light dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <SlideInLeft delay={0.2} className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-700">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVbBj8EDHBq776Iobs8sYuvuzE84hS0PrBYJLb_TNrBPvcOZw7_f1eYA0TK4sWefEnQM-jUMxAJvWF1yTm29sKO6LzbcZynVllVd5Bu4GSpnkGLXWjUo2-pJNt4w7OpcM0Z40Lkcb3cec_EdjAmgEHk129gsEAPDtKIQ5MdPOGbXeS0u90OFlRLR-WTzJypzAGnAuGN08qqwnkFQGSJYtklxulfKFiwwI5tZq-_JLWsr2lsziIFOXNi-R9RFC37uzOBHxaCLgEPBw"
                                    alt="Engineers reviewing blueprints in a clean manufacturing facility"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/5 rounded-2xl -z-10 pattern-dots"></div>
                            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary/20 rounded-xl -z-10"></div>
                        </SlideInLeft>

                        <SlideInRight delay={0.3}>
                            <div>
                                <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Who We Are</h2>
                                <h3 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-6">Bridging Engineering &amp; Healthcare</h3>
                                <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                                    The company focuses on producing dependable healthcare furniture designed for durability, usability and long term performance. Under the leadership of young entrepreneur Kartik Gupta, the organization has steadily grown by focusing on quality manufacturing, practical engineering solutions and strong customer relationships.
                                </p>
                                <p className="text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                                    The company combines modern manufacturing technologies with a deep understanding of hospital operational requirements to deliver products that support healthcare providers and improve clinical efficiency.
                                </p>

                                <div className="grid grid-cols-2 gap-6 border-t border-neutral-200 dark:border-neutral-700 pt-8">
                                    <div>
                                        <span className="block text-4xl font-bold text-primary mb-1">6+</span>
                                        <span className="text-sm text-neutral-500 font-medium">Years of Experience</span>
                                    </div>
                                    <div>
                                        <span className="block text-4xl font-bold text-primary mb-1">100+</span>
                                        <span className="text-sm text-neutral-500 font-medium">Hospitals Served</span>
                                    </div>
                                </div>
                            </div>
                        </SlideInRight>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-background-subtle dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn delay={0.1} className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-neutral-800 dark:text-white mb-4">Our Driving Force</h2>
                        <p className="text-neutral-600 dark:text-neutral-400">Guided by a commitment to quality and a vision for safer healthcare environments.</p>
                    </FadeIn>

                    <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <StaggerItem className="bg-white dark:bg-neutral-800 p-8 md:p-10 rounded-xl shadow-soft border-t-4 border-primary hover:shadow-hover transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="material-icons-outlined text-9xl text-primary">flag</span>
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                                    <span className="material-icons-outlined text-2xl">track_changes</span>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">Our Mission</h3>
                                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                    To design and manufacture superior medical furniture that empowers healthcare providers to deliver optimal patient care, while ensuring safety, durability, and infection control in every detail.
                                </p>
                            </div>
                        </StaggerItem>

                        <StaggerItem className="bg-white dark:bg-neutral-800 p-8 md:p-10 rounded-xl shadow-soft border-t-4 border-primary hover:shadow-hover transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="material-icons-outlined text-9xl text-primary">visibility</span>
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                                    <span className="material-icons-outlined text-2xl">lightbulb</span>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">Our Vision</h3>
                                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                    To be the global benchmark for innovation in medical manufacturing, creating the hospital environments of tomorrow through sustainable practices and cutting-edge ergonomic design.
                                </p>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* Continuing sections to match HTML... */}
            <section className="py-24 bg-background-light dark:bg-background-dark overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl font-bold text-neutral-800 dark:text-white mb-4">Advanced Manufacturing Capabilities</h2>
                            <p className="text-neutral-600 dark:text-neutral-400">Our vertically integrated production process ensures complete quality control from start to finish.</p>
                        </div>
                    </div>

                    <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Manufacturing Capabilities Grid */}
                        <StaggerItem className="group">
                            <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLvY6xaqZHtgAF5RaRtCBsGN3G2e3qkaBIjMJgA6LLZmkehWp_OQDtsNlLDVY58mOW82wqaTVg-XE3qCN-p9jaeoGwKBuC0x9pWtA7aLCwMmBvvS0-GuaEJKCnzzAwZTrlVapu_oTo5iL4MIF6NotkduPx6ZbKxrElrXYFw28-L4UF8GzQf-pMifSpgfqgXemQHldUd4rZMSjyTD5t10cKzel73uFgH-7ZyaZa0tFHxjOXKJnx4Cokpq9nr9_A039n_eaCuiZlz3g"
                                    alt="Precision Welding"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary"></span> Precision Welding
                            </h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                                Automated robotic welding cells ensure consistent structural integrity for critical care equipment frames.
                            </p>
                        </StaggerItem>

                        <StaggerItem className="group">
                            <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRLi_Jg4LA73mYKDGUm6FUQrGNbfpPjgf35A2AjmZ1MftD2TuKYujgnAwFzKj9MVXxC98gzBOTHufZgfMmYgM9R9B_L3ltLrlkEWVG8-i73OWuvyRHK-bs5c94RTuGHIRXw027egjArnUUDbZMOhBPmggiJx485Ov7qApmCNt8y4ChQC2UAGHXGx1lglpgq-nTTTM11g2fSgvlq0xyzHpPESxF4kz5RSkuKc0oQaU3J82teydGMLPtMSaNpphyHSq7f7svtREW9eI"
                                    alt="Sterile Assembly"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary"></span> Sterile Assembly
                            </h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                                ISO Class 7 cleanrooms for the assembly of sensitive electronic components and surgical tables.
                            </p>
                        </StaggerItem>

                        <StaggerItem className="group">
                            <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo8xMgyOa1SIjw9mfptHZYNHm4jMcxle73mTzhuiWS9guNNCIjiK5xoAgwFROPz7lMnmjf6b-O3ujPQgXnSZ6zwD140ApTA__qRzJafNBiw1mIZE0iK2u-DT_1Hs3kTrsK6ZloOeqEJPF3jEovKC87L4oxosyUQyWDPOsMAHibw4_lweJAviW3aEERhmFfPtwC93oo2H4alpFJcJem9f3jg-QNZs7A4hjb2vAaNCeGu9bfYA6x52958xZVCjS19N2PHxLjJJsh2Ao"
                                    alt="Rigorous Testing"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary"></span> Rigorous Testing
                            </h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                                Every unit undergoes 50-point quality checks including load testing and electrical safety verification.
                            </p>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            <section className="py-20 bg-background-subtle dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 md:p-12 shadow-sm border border-neutral-100 dark:border-neutral-700 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-4">Certified for Excellence</h2>
                            <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                                We adhere to the strictest international standards for medical device manufacturing. Our commitment to compliance ensures patient safety and product reliability across all markets.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-neutral-700 dark:text-neutral-300">
                                    <span className="material-icons-outlined text-green-600 mr-3">check_circle</span>
                                    ISO 13485:2016 Medical Devices Quality Management
                                </li>
                                <li className="flex items-center text-neutral-700 dark:text-neutral-300">
                                    <span className="material-icons-outlined text-green-600 mr-3">check_circle</span>
                                    ISO 9001:2015 Quality Management Systems
                                </li>
                                <li className="flex items-center text-neutral-700 dark:text-neutral-300">
                                    <span className="material-icons-outlined text-green-600 mr-3">check_circle</span>
                                    CE Marking &amp; FDA Registration
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 flex justify-center items-center gap-8 flex-wrap">
                            <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 w-32 h-32 text-center shadow-sm">
                                <span className="material-symbols-outlined text-4xl text-neutral-600 dark:text-neutral-400 mb-2">verified</span>
                                <span className="font-bold text-neutral-800 dark:text-white text-sm">ISO 13485</span>
                                <span className="text-[10px] text-neutral-500 uppercase tracking-wide mt-1">Certified</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 w-32 h-32 text-center shadow-sm">
                                <span className="material-symbols-outlined text-4xl text-neutral-600 dark:text-neutral-400 mb-2">health_and_safety</span>
                                <span className="font-bold text-neutral-800 dark:text-white text-sm">CE Mark</span>
                                <span className="text-[10px] text-neutral-500 uppercase tracking-wide mt-1">Compliant</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 w-32 h-32 text-center shadow-sm">
                                <span className="material-symbols-outlined text-4xl text-neutral-600 dark:text-neutral-400 mb-2">gavel</span>
                                <span className="font-bold text-neutral-800 dark:text-white text-sm">FDA Reg.</span>
                                <span className="text-[10px] text-neutral-500 uppercase tracking-wide mt-1">Listed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 relative overflow-hidden bg-primary">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <FadeIn className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Global Supply</h2>
                    <p className="text-blue-100 text-lg mb-4 max-w-2xl mx-auto">
                        BVM Industries is expanding its presence in international markets by offering dependable manufacturing capability and consistent product quality for healthcare projects worldwide.
                    </p>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                        Our manufacturing infrastructure, product durability and institutional project experience make us a reliable partner for distributors and healthcare procurement teams globally.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded bg-white text-primary hover:bg-neutral-100 transition-colors shadow-lg"
                        >
                            Contact Our Team
                        </Link>
                        {/* <a href="#" className="inline-flex items-center justify-center px-8 py-3.5 border border-white text-base font-medium rounded bg-transparent text-white hover:bg-white/10 transition-colors">
                            Download Company  Profile
                        </a> */}
                    </div>
                </FadeIn>
            </section>
        </>
    );
};

export default About;
