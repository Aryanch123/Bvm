import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn, SlideInLeft, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';
import { getCertificates } from '../services/api';

const statusColors = {
    Active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Expired: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
};

const handleDownload = (pdfUrl) => {
    // Open the PDF directly in a new tab. 
    // Browsers will use their native PDF viewer, from which users can download or print.
    // This avoids CORS errors and corrupted blobs from cross-origin fetch requests.
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
};

const CertCard = ({ cert }) => (
    <StaggerItem className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-soft flex flex-col h-full">
        <div className="relative bg-neutral-100 dark:bg-neutral-900 p-8 flex items-center justify-center border-b border-neutral-100 dark:border-neutral-700">
            {cert.image?.url ? (
                <img
                    src={cert.image.url}
                    alt={cert.title}
                    className="w-32 h-44 object-cover shadow-md border border-neutral-200 transform group-hover:-translate-y-1 transition-transform duration-300"
                />
            ) : (
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
            )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <div className="mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${statusColors[cert.status] || statusColors.Active}`}>
                    {cert.status}
                </span>
                <h3 className="text-xl font-bold text-neutral-800 dark:text-white">{cert.title}</h3>
                {cert.issuingBody && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{cert.issuingBody}</p>
                )}
            </div>
            {cert.description && (
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 flex-grow">{cert.description}</p>
            )}
            <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-700 flex justify-between items-center">
                <div className="text-xs text-neutral-500">
                    {cert.validUntil ? `Valid until: ${cert.validUntil}` : cert.year ? `Year: ${cert.year}` : ''}
                </div>
                {cert.pdf?.publicId ? (
                    <button
                        onClick={() => handleDownload(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/certificates/${cert._id}/download`)}
                        className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                        <span className="material-icons-outlined mr-2">visibility</span> View Certificate
                    </button>
                ) : (
                    <span className="text-xs text-neutral-400 italic">No PDF available</span>
                )}
            </div>
        </div>
    </StaggerItem>
);

const Certifications = () => {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCertificates()
            .then(r => setCerts(r.data.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

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
                    {loading ? (
                        <div className="text-center py-20 text-neutral-500">Loading certifications...</div>
                    ) : certs.length === 0 ? (
                        <div className="text-center py-20 text-neutral-500">
                            <span className="material-icons-outlined text-5xl mb-3 block opacity-30">workspace_premium</span>
                            Certification documents will be added soon.
                        </div>
                    ) : (
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {certs.map(cert => <CertCard key={cert._id} cert={cert} />)}
                        </StaggerContainer>
                    )}
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
                                    BVM Industries operates under a strict Quality Management System aligned with ISO standards. This integrated approach ensures that patient safety and product efficacy remain our top priorities across all markets. We regularly undergo rigorous audits to maintain our certifications.
                                </p>
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-4">Material Traceability &amp; Safety</h3>
                                <p className="mb-6">
                                    Every component used in our medical furniture and equipment is fully traceable. We mandate strict supplier quality agreements and perform regular incoming material inspections. Our materials are tested for:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 mb-8">
                                    <li>Biocompatibility to ensure safe contact with patient skin.</li>
                                    <li>Chemical resistance to hospital-grade disinfectants and cleaners.</li>
                                    <li>Flammability standards required for healthcare environments.</li>
                                    <li>RoHS and REACH compliance to limit hazardous substances.</li>
                                </ul>
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-4">Post-Market Surveillance</h3>
                                <p>
                                    Compliance doesn&#39;t end when a product leaves our factory. We maintain a robust post-market surveillance system to actively monitor product performance in clinical settings, ensuring long-term reliability for healthcare providers.
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
