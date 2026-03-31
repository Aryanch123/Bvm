import { useState } from 'react';
import { FadeIn, SlideInLeft, SlideInRight } from '../components/ui/AnimatedSection';

const initialFormData = {
    firstName: '',
    lastName: '',
    hospitalName: '',
    email: '',
    phone: '',
    inquiryType: 'Request for Quotation (RFQ)',
    message: '',
    privacy: false
};

const Contact = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.privacy) {
            setStatus('Please agree to the privacy policy.');
            return;
        }

        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
        const receiverEmail = import.meta.env.VITE_CONTACT_RECEIVER_EMAIL;

        if (!accessKey) {
            setStatus('Contact form is not configured yet.');
            return;
        }

        setStatus('Sending...');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    to_email: receiverEmail,
                    ...formData,
                    from_name: `${formData.firstName} ${formData.lastName}`.trim(),
                    replyto: formData.email,
                    subject: `New Inquiry from ${formData.firstName} ${formData.lastName} - ${formData.hospitalName}`
                })
            });

            const result = await response.json();
            if (result.success) {
                setStatus('Message sent successfully! We will get back to you soon.');
                setFormData(initialFormData);
            } else {
                setStatus(result.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('Something went wrong. Please try again later.');
        }
    };

    return (
        <>
            <main className="pt-20">
                <div className="bg-background-subtle dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 py-16">
                    <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-white mb-4">Contact BVM Industries</h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            For product inquiries, quotations or project discussions, please contact our team through the inquiry form or WhatsApp support on the website.
                        </p>
                    </FadeIn>
                </div>

                <section className="py-16 bg-background-light dark:bg-background-dark">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                            {/* Form Section */}
                            <SlideInLeft delay={0.1} className="lg:col-span-7 space-y-8">
                                <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-soft">
                                    <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-6 flex items-center gap-2">
                                        <span className="material-icons-outlined text-primary">assignment</span>
                                        Submit an Inquiry
                                    </h2>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="firstName">First Name</label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full rounded-lg border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="lastName">Last Name</label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full rounded-lg border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="hospitalName">Hospital / Organization Name</label>
                                            <input
                                                type="text"
                                                id="hospitalName"
                                                name="hospitalName"
                                                value={formData.hospitalName}
                                                onChange={handleChange}
                                                required
                                                className="w-full rounded-lg border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-primary focus:border-primary"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="email">Work Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full rounded-lg border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="phone">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="inquiryType">Inquiry Type</label>
                                            <select
                                                id="inquiryType"
                                                name="inquiryType"
                                                value={formData.inquiryType}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-primary focus:border-primary"
                                            >
                                                <option>Request for Quotation (RFQ)</option>
                                                <option>Product Specifications</option>
                                                <option>Service &amp; Maintenance</option>
                                                <option>Partnership Opportunities</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="message">Message / Specific Requirements</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                className="w-full rounded-lg border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-primary focus:border-primary h-32"
                                            ></textarea>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="privacy"
                                                name="privacy"
                                                checked={formData.privacy}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded focus:ring-2 focus:ring-offset-2"
                                            />
                                            <label className="ml-2 block text-sm text-neutral-600 dark:text-neutral-400" htmlFor="privacy">
                                                I agree to the processing of my personal data for the purpose of handling my inquiry.
                                            </label>
                                        </div>

                                        {status && (
                                            <div className={`p-4 rounded-md ${status.includes('success') ? 'bg-green-50 text-green-800' : status.includes('wrong') || status.includes('agree') ? 'bg-red-50 text-red-800' : 'bg-blue-50 text-blue-800'}`}>
                                                {status}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg bg-primary text-white hover:bg-primary-dark transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                        >
                                            Send Inquiry
                                        </button>
                                    </form>
                                </div>
                            </SlideInLeft>

                            {/* Contact Info & Map */}
                            <SlideInRight delay={0.2} className="lg:col-span-5 space-y-8">
                                <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-soft relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <span className="material-icons-outlined text-9xl text-primary">contact_support</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-6">Headquarters</h3>

                                    <div className="space-y-6 relative z-10">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                                                <span className="material-icons-outlined">location_on</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-800 dark:text-white">BVM Industries</p>
                                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">A Moja Chalesar<br />Janpad Shadhra<br />Agra Uttar Pradesh 282006<br />India</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                                                <span className="material-icons-outlined">phone</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-800 dark:text-white">Direct Line</p>
                                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">+91 (Phone number to be added)</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                                                <span className="material-icons-outlined">email</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-800 dark:text-white">Email Support</p>
                                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">contact@bvmindustries.com</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-700 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">24/7 Technical Support Active</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-soft h-64 lg:h-80 bg-neutral-100 dark:bg-neutral-800 relative group">
                                    <iframe
                                        title="Headquarters Map"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.733248043701!2d-118.40035632362156!3d34.05071311773143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bb7956377e0d%3A0x629134a6943b5937!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1714999999999!5m2!1sen!2sus"
                                        className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 border-0"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>

                                <a href="https://wa.me/YOUR_NUMBER" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 border border-transparent text-base font-bold rounded-xl bg-[#25D366] text-white hover:bg-[#128C7E] transition-all shadow-md hover:shadow-lg group">
                                </a>
                            </SlideInRight>

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Contact;
