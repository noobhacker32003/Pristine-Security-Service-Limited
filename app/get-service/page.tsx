"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Calendar, FileText, Send, CheckCircle2, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

type FormData = {
    name: string;
    email: string;
    phone: string;
    date: string;
    details: string;
};

export default function GetServicePage() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>();
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data: FormData) => {
        try {
            setStatus('idle');
            setErrorMessage('');
            
            const response = await fetch('/api/get-service', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            setStatus('success');
            reset();
            
            // Auto hide success message after 5 seconds
            setTimeout(() => {
                setStatus('idle');
            }, 5000);
            
        } catch (error: any) {
            console.error('Form submission error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Failed to submit the request. Please try again.');
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide inline-flex items-center gap-2 mb-4">
                            <ShieldCheck className="w-4 h-4" />
                            Premium Protection
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Request <span className="text-blue-600">Security Services</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Fill out the form below to tell us about your security needs. Our team will get back to you promptly with a tailored solution.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
                >
                    <div className="p-8 md:p-12">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="bg-green-50 border border-green-200 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-400 via-green-500 to-green-400" />
                                    
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50"
                                    >
                                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                                    </motion.div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-4 tracking-tight">Request Received Successfully</h2>
                                    <p className="text-base md:text-lg text-green-800 max-w-xl mx-auto mb-8 leading-relaxed">
                                        Thank you for choosing Pristine Security Service Limited. Our operations team is reviewing your service requirements and will contact you within 24 hours to finalize your security plan.
                                        <br /><br />
                                        For immediate assistance, please call our control room at <a href="tel:8802588171734" className="font-semibold text-green-700 hover:text-green-900 transition-colors underline decoration-green-300 underline-offset-4">88-02-58817173-4</a>.
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-sm hover:shadow"
                                    >
                                        Submit Another Request
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-6"
                                    noValidate
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name Field */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <User className="h-5 w-5 text-slate-400" />
                                                </div>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    {...register('name', { required: 'Name is required' })}
                                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-300 ring-red-300' : 'border-slate-200'} rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm placeholder-slate-600`}
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>}
                                        </div>

                                        {/* Phone Field */}
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Phone className="h-5 w-5 text-slate-400" />
                                                </div>
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    {...register('phone', { 
                                                        required: 'Phone number is required',
                                                        pattern: {
                                                            value: /^[0-9+\-\s()]*$/,
                                                            message: 'Invalid phone number format'
                                                        }
                                                    })}
                                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.phone ? 'border-red-300 ring-red-300' : 'border-slate-200'} rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm placeholder-slate-600`}
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>
                                            {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone.message}</p>}
                                        </div>

                                        {/* Email Field */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Mail className="h-5 w-5 text-slate-400" />
                                                </div>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    {...register('email', { 
                                                        required: 'Email is required',
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "Invalid email address"
                                                        }
                                                    })}
                                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300 ring-red-300' : 'border-slate-200'} rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm placeholder-slate-600`}
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                            {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>}
                                        </div>

                                        {/* Date Field */}
                                        <div>
                                            <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">
                                                Desired Date of Service
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Calendar className="h-5 w-5 text-slate-400" />
                                                </div>
                                                <input
                                                    id="date"
                                                    type="date"
                                                    min={new Date().toISOString().split('T')[0]}
                                                    {...register('date', { required: 'Date is required' })}
                                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.date ? 'border-red-300 ring-red-300' : 'border-slate-200'} rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm text-slate-700`}
                                                />
                                            </div>
                                            {errors.date && <p className="mt-1.5 text-sm text-red-600">{errors.date.message}</p>}
                                        </div>
                                    </div>

                                    {/* Service Details */}
                                    <div>
                                        <label htmlFor="details" className="block text-sm font-medium text-slate-700 mb-2">
                                            Service Details
                                        </label>
                                        <div className="relative">
                                            <div className="absolute top-3 left-3 pointer-events-none">
                                                <FileText className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <textarea
                                                id="details"
                                                rows={5}
                                                {...register('details', { 
                                                    required: 'Please provide some details about your security needs',
                                                    minLength: {
                                                        value: 10,
                                                        message: 'Please provide at least 10 characters of detail'
                                                    }
                                                })}
                                                className={`block w-full pl-10 pr-3 py-3 border ${errors.details ? 'border-red-300 ring-red-300' : 'border-slate-200'} rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm resize-none placeholder-slate-600`}
                                                placeholder="Please describe the type of security service you need, location details, and any specific requirements..."
                                            />
                                        </div>
                                        {errors.details && <p className="mt-1.5 text-sm text-red-600">{errors.details.message}</p>}
                                    </div>

                                    {/* Error Message */}
                                    {status === 'error' && (
                                        <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 text-sm">
                                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                            <p>{errorMessage}</p>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Submitting Request...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Submit Request
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-center text-xs text-slate-500 mt-4">
                                        Your information is secure and will only be used to contact you regarding your request.
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
