import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/bvmlogo1.png';
import { getCategories } from '../../services/api';

const Footer = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((response) => setCategories(response.data.data))
            .catch(() => setCategories([]));
    }, []);

    return (
        <footer className="bg-white dark:bg-background-dark border-t border-neutral-200 dark:border-neutral-800 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-3 cursor-pointer">
                            <img
                                src={logo}
                                alt="BVM Industries"
                                style={{ width: '110px', height: '130px' }}
                                className="object-contain"
                            />
                            <span className="font-bold text-xl tracking-tight text-neutral-800 dark:text-white">
                                BVM<span className="text-primary">Industries</span>
                            </span>
                        </Link>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                            Pioneering medical manufacturing solutions for a safer, healthier world. Quality you can depend on, innovation you can trust.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/company/bvm-industriesagra/" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-primary transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/bvmindustriesagra" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-primary transition-colors">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/bvmindustries?igsh=MTBvdmJ6b2doMTJ5ag==" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-primary transition-colors">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.5 1.5h-8.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Zm5.38-2.06a1.19 1.19 0 1 1 0 2.38 1.19 1.19 0 0 1 0-2.38Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-neutral-800 dark:text-white uppercase tracking-wider mb-6">Products</h3>
                        <ul className="space-y-4">
                            {categories.map((category) => (
                                <li key={category._id || category.slug}>
                                    <Link
                                        to={`/products?category=${encodeURIComponent(category.slug || '')}`}
                                        className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm"
                                    >
                                        {category.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-neutral-800 dark:text-white uppercase tracking-wider mb-6">Company</h3>
                        <ul className="space-y-4">
                            {/* <li><Link to="/about" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">About Us</Link></li> */}
                            <li><Link to="/certifications" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Certifications</Link></li>
                            <li><Link to="/infrastructure" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Manufacturing Process</Link></li>
                            <li><Link to="/gallery" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Gallery</Link></li>
                            <li><Link to="/contact" className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-neutral-800 dark:text-white uppercase tracking-wider mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="material-icons-outlined text-primary text-lg mr-2 mt-0.5">location_on</span>
                                <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                                    13A Moja Chalesar,<br />
                                    Janpad Shadhra,<br />
                                    Agra Uttar Pradesh 282006,<br />
                                    India
                                </span>
                            </li>
                            <li className="flex items-center">
                                <span className="material-icons-outlined text-primary text-lg mr-2">phone</span>
                                <span className="text-neutral-500 dark:text-neutral-400 text-sm">+91 7456972711</span>
                            </li>
                            <li className="flex items-center">
                                <span className="material-icons-outlined text-primary text-lg mr-2">email</span>
                                <span className="text-neutral-500 dark:text-neutral-400 text-sm">bvmindustriesagra@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-400 text-xs text-center md:text-left">
                        &copy; {new Date().getFullYear()} BVM Industries. All rights reserved.Developed by <a href="https://graptix.in/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Graptix Tech.</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
