"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';

type ContactFormData = {
    name: string;
    email: string;
    message: string;
};

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setErrorMsg('');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setIsSuccess(true);
                reset();
            } else {
                const errorData = await res.json();
                setErrorMsg(errorData.error || 'Failed to send message.');
            }
        } catch (error) {
            setErrorMsg('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-10 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Contact Us</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Get in touch with our team for professional security solutions, business inquiries, or to get a custom quote.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">

                    {/* Left Column: Form */}
                    <div className="p-10 lg:p-14">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">Send Us a Message</h2>

                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 text-green-800 p-8 rounded-2xl flex flex-col items-center text-center border border-green-200"
                            >
                                <CheckCircle2 className="w-16 h-16 text-green-600 mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                <p>Thank you for reaching out. Our team will get back to you shortly.</p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="mt-6 text-green-700 font-semibold hover:underline"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        {...register('name', { required: 'Name is required' })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50 focus:bg-white text-slate-900"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2 ">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                                        })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50 focus:bg-white text-slate-900"
                                        placeholder="john@company.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Your Message</label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        {...register('message', { required: 'Message is required' })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50 focus:bg-white resize-none text-slate-900"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                                </div>

                                {errorMsg && <p className="text-red-500 text-sm font-medium">{errorMsg}</p>}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right Column: Info & Map */}
                    <div className="bg-slate-900 text-white p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <Mail className="w-64 h-64" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

                            <div className="space-y-6 mb-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Office Address</h4>
                                        <p className="text-slate-300 mt-1">Banani Commercial Area,<br />Dhaka, Bangladesh</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Phone Number</h4>
                                        <p className="text-slate-300 mt-1">88-02-58817173-4</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Email Address</h4>
                                        <a href="mailto:info@pristinesecurity.org" className="text-slate-300 mt-1 hover:text-white transition-colors">
                                            info@pristinesecurity.org
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps Iframe */}
                        <div className="relative z-10 w-full h-[300px] rounded-xl overflow-hidden shadow-lg border border-slate-700">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.70031174628!2d90.40224151737754!3d23.79461159999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c15ea1de1%3A0x9720d10e82400508!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1715012345678!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
