import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';
import { getSiteImages } from '../services/api';


const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [apiImages, setApiImages] = useState([]);

    useEffect(() => {
        getSiteImages('gallery')
            .then(r => {
                const imgs = (r.data.data || []).map(img => ({
                    id: img._id,
                    category: 'Gallery',
                    title: img.label,
                    src: img.url,
                    alt: img.label,
                    order: img.order,
                    isApi: true,
                }));
                setApiImages(imgs);
            })
            .catch(() => {});
    }, []);


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
                    {apiImages.length === 0 && (
					<FadeIn className="text-center py-20 text-neutral-500">No images uploaded yet.</FadeIn>
				)}
                    {/* Masonry Grid Simulation */}
                    <StaggerContainer staggerDelay={0.05} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {apiImages.map((image) => (
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
                                    <button
                                        type="button"
                                        aria-label={`Open ${image.alt} in lightbox`}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setSelectedImage(image);
                                        }}
                                        className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
                                    >
                                        <span className="material-icons-outlined text-xl">open_in_full</span>
                                    </button>
                                </div>
                            </StaggerItem>
                        ))}


                    </StaggerContainer>

                    {/* <div className="mt-12 text-center">
                        <button className="inline-flex items-center justify-center px-8 py-3 border border-neutral-300 dark:border-neutral-600 text-sm font-medium rounded bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-primary dark:hover:text-primary transition-all hover:border-primary/50 shadow-sm">
                            <span className="material-icons-outlined mr-2">refresh</span> Load More Images
                        </button>
                    </div> */}
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
                        {/* <a href="#" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded bg-white text-primary hover:bg-neutral-100 transition-colors shadow-lg">
                            Book a Factory Tour
                        </a> */}
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
