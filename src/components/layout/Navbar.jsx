import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/bvmlogo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Products', path: '/products' },
        { name: 'Industries', path: '/infrastructure' },
        { name: 'Quality & Compliance', path: '/certifications' },
        { name: 'Support', path: '/contact' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="hidden md:flex flex-shrink-0 items-center gap-2 cursor-pointer">
                        <img
                            src={logo}
                            alt="BVM Industries"
                            style={{ width: '72px', height: '72px' }}
                            className="object-contain"
                        />
                        <span className="font-bold text-xl tracking-tight text-neutral-800 dark:text-white">
                            BVM<span className="text-primary">Industries</span> 
                        </span>
                    </Link>

                    <Link
                        to="/"
                        className="md:hidden absolute left-9 flex items-center gap-2 cursor-pointer"
                    >
                        <img
                            src={logo}
                            alt="BVM Industries"
                            style={{ width: '72px', height: '72px' }}
                            className="object-contain"
                        />
                        <span className="font-bold text-lg tracking-tight text-neutral-800 dark:text-white whitespace-nowrap">
                            BVM<span className="text-primary">Industries</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors ${isActive
                                        ? 'text-primary dark:text-primary'
                                        : 'text-neutral-600 hover:text-primary dark:text-neutral-300 dark:hover:text-primary'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center">
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded bg-primary text-white hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md"
                        >
                            Request Quote
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden ml-auto">
                        <button
                            onClick={toggleMenu}
                            className="text-neutral-600 dark:text-neutral-300 hover:text-primary focus:outline-none"
                            type="button"
                            aria-label="Toggle menu"
                        >
                            <span className="material-icons-outlined text-2xl">{isOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-background-dark border-b border-neutral-200 dark:border-neutral-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-md text-base font-medium ${isActive
                                        ? 'text-primary bg-primary/10'
                                        : 'text-neutral-600 hover:text-primary hover:bg-neutral-50 dark:text-neutral-300 dark:hover:text-primary dark:hover:bg-neutral-800'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center mt-4 px-6 py-3 border border-transparent text-base font-medium rounded bg-primary text-white hover:bg-primary-dark transition-colors"
                        >
                            Request Quote
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
