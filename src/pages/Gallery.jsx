import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';

const galleryImages = [
    {
        id: 1,
        category: 'Factory',
        title: 'Automated Assembly Line',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVbBj8EDHBq776Iobs8sYuvuzE84hS0PrBYJLb_TNrBPvcOZw7_f1eYA0TK4sWefEnQM-jUMxAJvWF1yTm29sKO6LzbcZynVllVd5Bu4GSpnkGLXWjUo2-pJNt4w7OpcM0Z40Lkcb3cec_EdjAmgEHk129gsEAPDtKIQ5MdPOGbXeS0u90OFlRLR-WTzJypzAGnAuGN08qqwnkFQGSJYtklxulfKFiwwI5tZq-_JLWsr2lsziIFOXNi-R9RFC37uzOBHxaCLgEPBw',
        alt: 'High-tech automated manufacturing line for medical devices'
    },
    {
        id: 2,
        category: 'Products',
        title: 'Surgical Light Precision',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRLi_Jg4LA73mYKDGUm6FUQrGNbfpPjgf35A2AjmZ1MftD2TuKYujgnAwFzKj9MVXxC98gzBOTHufZgfMmYgM9R9B_L3ltLrlkEWVG8-i73OWuvyRHK-bs5c94RTuGHIRXw027egjArnUUDbZMOhBPmggiJx485Ov7qApmCNt8y4ChQC2UAGHXGx1lglpgq-nTTTM11g2fSgvlq0xyzHpPESxF4kz5RSkuKc0oQaU3J82teydGMLPtMSaNpphyHSq7f7svtREW9eI',
        alt: 'Close up of surgical light details'
    },
    {
        id: 3,
        category: 'Installations',
        title: 'ICU Suite Setup - Tokyo',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLvY6xaqZHtgAF5RaRtCBsGN3G2e3qkaBIjMJgA6LLZmkehWp_OQDtsNlLDVY58mOW82wqaTVg-XE3qCN-p9jaeoGwKBuC0x9pWtA7aLCwMmBvvS0-GuaEJKCnzzAwZTrlVapu_oTo5iL4MIF6NotkduPx6ZbKxrElrXYFw28-L4UF8GzQf-pMifSpgfqgXemQHldUd4rZMSjyTD5t10cKzel73uFgH-7ZyaZa0tFHxjOXKJnx4Cokpq9nr9_A039n_eaCuiZlz3g',
        alt: 'Modern hospital room with bed and monitor'
    },
    {
        id: 4,
        category: 'Products',
        title: 'Stainless Steel Utility Cart',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo8xMgyOa1SIjw9mfptHZYNHm4jMcxle73mTzhuiWS9guNNCIjiK5xoAgwFROPz7lMnmjf6b-O3ujPQgXnSZ6zwD140ApTA__qRzJafNBiw1mIZE0iK2u-DT_1Hs3kTrsK6ZloOeqEJPF3jEovKC87L4oxosyUQyWDPOsMAHibw4_lweJAviW3aEERhmFfPtwC93oo2H4alpFJcJem9f3jg-QNZs7A4hjb2vAaNCeGu9bfYA6x52958xZVCjS19N2PHxLjJJsh2Ao',
        alt: 'Sterile medical cart with supplies'
    },
    {
        id: 5,
        category: 'Installations',
        title: 'Advanced Diagnostics Lab',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMPNfAM1DMADb_QVWhqg1sk-_7KF_ZVIVqtbSG_i03GMGaA2mc6R2J0--I1sZ4K6DfW-z5Q1PrcorOF0OkxY4vlobT2lOV-cpvt6gLHWcgYQYdghI3kLDjC43jdzH9fuBKwfbEhwpVUzGfavtGl9-GuF0F9rLyWUJeWoIgigY5hcQhz72L7VlcO88TW7-vuo9P6cpLfIDUmR7a7l5MOU1cakiq8w0jJpovbHDkfB1rL_ZIDk6qXaY6pnaedPxSPTEeLPTPh7ViNAI',
        alt: 'Vertical shot of medical device interface',
        isVertical: true
    },
    {
        id: 6,
        category: 'Factory',
        title: 'Design & Engineering Dept.',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdCC1BkJs4OW5EPZrzOyVHFgaMqrbG8JUSEAgwexOYaf32YhUAWIaESPBLg3V5ggJo2KM1dEZW800XBdLV5ynFBWZrvIobPorZEVe7vt_VMjMC9G21Ai73UzjU4LyH78-8Wa99f5_ZOtdRLOUU0XKmT0CoQRWvjoSV3q-v_gvp52u53mVy1CGwW7k7Tavi-aSIpsLVUtDMbJJhPwhDfRfX9UheFgyDNeRrGM6-eUBkcpAjTkemZHfhy3E1b5ZYJQFFGGgJ42hoe80',
        alt: 'Engineering blueprint on table',
        isAspectVideo: true
    },
    {
        id: 7,
        category: 'Products',
        title: 'Patient Chair Mechanism',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRQT2uqQsi4qw3Tt7BNVdJuqkvtBdHe-ZVtynGKQBMiBlzj0oVgo-U1F1N866IXLhmnXwXBPUpRJ82xXdfR0gXG9Mt0dOnEWEJfQfp8BaxaLWWt-LiMAypqUe0w1i-bKA_aUHfmtjhnuG4_TigPFMaMIMaFmxjPjaKhJQnSiRXDNfxdC7_Y3ynHn7KgL2N5WtzXWRzDZ3zJuMRwwL49nRO7VF85fcTGtsI1-eSsyKHGmE75ZsopQOyoZ5Xkm5y_ig7um0I6TWzvoE',
        alt: 'Medical chair details',
        isAspectSquare: true
    }
];

const Gallery = () => {
    const [filter, setFilter] = useState('All Images');
    const [selectedImage, setSelectedImage] = useState(null);

    const filteredImages = filter === 'All Images'
        ? galleryImages
        : galleryImages.filter(img => img.category === filter);

    return (
        <>
            <header className="pt-32 pb-12 bg-background-subtle dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
                <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white mb-4">
                        Manufacturing and Product Gallery
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Our gallery highlights our manufacturing infrastructure, production processes and hospital furniture products. It provides a glimpse into our fabrication facility, machinery and finished healthcare furniture solutions designed for modern medical environments.
                    </p>
                </FadeIn>
            </header>

            <section className="py-12 bg-background-light dark:bg-background-dark min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {['All Images', 'Products', 'Factory', 'Installations'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${filter === cat
                                    ? 'bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-dark'
                                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-primary/50 hover:text-primary dark:hover:text-primary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Masonry Grid Simulation */}
                    <StaggerContainer staggerDelay={0.05} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {filteredImages.map((image) => (
                            <StaggerItem
                                key={image.id}
                                className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-hover transition-all duration-300"
                                onClick={() => setSelectedImage(image)}
                            >
                                {image.isVertical ? (
                                    <div className="bg-neutral-100 dark:bg-neutral-800 h-[400px] flex items-center justify-center">
                                        <img src={image.src} alt={image.alt} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ) : image.isAspectVideo ? (
                                    <div className="bg-neutral-100 dark:bg-neutral-800 aspect-video flex items-center justify-center overflow-hidden">
                                        <img src={image.src} alt={image.alt} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ) : image.isAspectSquare ? (
                                    <div className="bg-neutral-100 dark:bg-neutral-800 aspect-square flex items-center justify-center overflow-hidden">
                                        <img src={image.src} alt={image.alt} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ) : (
                                    <img src={image.src} alt={image.alt} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-primary-light text-xs font-bold uppercase tracking-wider mb-1 text-primary">{image.category}</span>
                                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                                    <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors">
                                        <span className="material-icons-outlined text-xl">open_in_full</span>
                                    </button>
                                </div>
                            </StaggerItem>
                        ))}

                        {/* Video Thumbnail (Static representation as it has specific styling) */}
                        {(filter === 'All Images' || filter === 'Factory') && (
                            <StaggerItem className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-hover transition-all duration-300">
                                <div className="bg-neutral-50 dark:bg-neutral-800 p-8 flex flex-col items-center justify-center text-center border border-neutral-100 dark:border-neutral-700 h-64">
                                    <span className="material-icons-outlined text-5xl text-neutral-300 mb-4">play_circle_outline</span>
                                    <h3 className="text-lg font-bold text-neutral-800 dark:text-white">Factory Tour Video</h3>
                                    <p className="text-sm text-neutral-500 mt-2">Watch our ISO certified process</p>
                                </div>
                                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="material-icons-outlined text-6xl text-white">play_arrow</span>
                                </div>
                            </StaggerItem>
                        )}
                    </StaggerContainer>

                    <div className="mt-12 text-center">
                        <button className="inline-flex items-center justify-center px-8 py-3 border border-neutral-300 dark:border-neutral-600 text-sm font-medium rounded bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-primary dark:hover:text-primary transition-all hover:border-primary/50 shadow-sm">
                            <span className="material-icons-outlined mr-2">refresh</span> Load More Images
                        </button>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <button
                        className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <span className="material-icons-outlined text-4xl">close</span>
                    </button>
                    <div className="max-w-5xl w-full max-h-[85vh] flex flex-col bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-2xl">
                        <div className="flex-1 overflow-hidden bg-black flex items-center justify-center relative p-8">
                            <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-white dark:bg-neutral-900">
                            <div>
                                <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1 block">{selectedImage.category}</span>
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-white">{selectedImage.title}</h3>
                            </div>
                            <div className="flex gap-4">
                                <button className="p-2 text-neutral-500 hover:text-primary transition-colors" title="Download">
                                    <span className="material-icons-outlined">download</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <section className="py-20 relative overflow-hidden bg-primary">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <FadeIn className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Inspired by our quality?</h2>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                        Schedule a virtual or in-person tour of our manufacturing facilities to see our processes firsthand.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded bg-white text-primary hover:bg-neutral-100 transition-colors shadow-lg">
                            Book a Factory Tour
                        </a>
                        <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 border border-white text-base font-medium rounded bg-transparent text-white hover:bg-white/10 transition-colors">
                            Contact Sales
                        </Link>
                    </div>
                </FadeIn>
            </section>
        </>
    );
};

export default Gallery;
