import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-background-dark border-t border-neutral-200 dark:border-neutral-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6 cursor-pointer">
                            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white">
                                <span className="material-icons-outlined text-xl">medical_services</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight text-neutral-800 dark:text-white">
                                Med<span className="text-primary">Tech</span> Mfg.
                            </span>
                        </Link>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                            Pioneering medical manufacturing solutions for a safer, healthier world. Quality you can depend on, innovation you can trust.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-sm font-bold text-neutral-800 dark:text-white uppercase tracking-wider mb-6">Products</h3>
                        <ul className="space-y-4">
                            <li><Link to="/products" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Hospital Beds</Link></li>
                            <li><Link to="/products" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Surgical Tables</Link></li>
                            <li><Link to="/products" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Medical Carts</Link></li>
                            <li><Link to="/products" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Patient Seating</Link></li>
                            <li><Link to="/products" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Stainless Steel Furniture</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-bold text-neutral-800 dark:text-white uppercase tracking-wider mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">About Us</Link></li>
                            <li><Link to="/certifications" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Certifications</Link></li>
                            <li><Link to="/infrastructure" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Manufacturing Process</Link></li>
                            <li><Link to="/contact" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-bold text-neutral-800 dark:text-white uppercase tracking-wider mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="material-icons-outlined text-primary text-lg mr-2 mt-0.5">location_on</span>
                                <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                                    1200 Innovation Drive,<br />
                                    MedTech Park, CA 90210
                                </span>
                            </li>
                            <li className="flex items-center">
                                <span className="material-icons-outlined text-primary text-lg mr-2">phone</span>
                                <span className="text-neutral-500 dark:text-neutral-400 text-sm">+1 (800) 555-0199</span>
                            </li>
                            <li className="flex items-center">
                                <span className="material-icons-outlined text-primary text-lg mr-2">email</span>
                                <span className="text-neutral-500 dark:text-neutral-400 text-sm">sales@medtechmfg.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-400 text-xs text-center md:text-left">
                        © {new Date().getFullYear()} MedTech Manufacturing Inc. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-neutral-400 hover:text-primary text-xs transition-colors">Privacy Policy</a>
                        <a href="#" className="text-neutral-400 hover:text-primary text-xs transition-colors">Terms of Service</a>
                        <a href="#" className="text-neutral-400 hover:text-primary text-xs transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
