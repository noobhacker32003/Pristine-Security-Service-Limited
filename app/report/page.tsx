"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ShieldAlert, Send, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

type ReportFormData = {
    guardName: string;
    guardId: string;
    incidentDescription: string;
};

export default function ReportPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ReportFormData>();

    const onSubmit = async (data: ReportFormData) => {
        setIsSubmitting(true);
        setErrorMsg('');
        try {
            const res = await fetch('/api/report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setIsSuccess(true);
                reset();
            } else {
                const errorData = await res.json();
                setErrorMsg(errorData.error || 'Failed to submit report.');
            }
        } catch (error) {
            setErrorMsg('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-10 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-red-600 p-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldAlert className="w-48 h-48" />
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                                <AlertTriangle className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Report an Incident</h1>
                            <p className="text-red-100 max-w-lg mx-auto">
                                Pristine Security takes all reports seriously. Please fill out the form below with as much detail as possible to help us investigate the issue.
                            </p>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 text-green-800 p-8 rounded-2xl flex flex-col items-center text-center border border-green-200"
                            >
                                <CheckCircle2 className="w-20 h-20 text-green-600 mb-6" />
                                <h3 className="text-3xl font-bold mb-3">Report Submitted</h3>
                                <p className="text-lg mb-6">Thank you for your report. Our management team has been notified and will review this incident immediately. Your safety and satisfaction are our top priorities.</p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
                                >
                                    Submit Another Report
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="guardName" className="block text-sm font-semibold text-slate-700 mb-2">Guard Name</label>
                                        <input
                                            id="guardName"
                                            type="text"
                                            {...register('guardName', { required: 'Guard name is required' })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all bg-slate-50 focus:bg-white placeholder-slate-600"
                                            placeholder="Enter guard's name"
                                        />
                                        {errors.guardName && <p className="text-red-500 text-sm mt-1">{errors.guardName.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="guardId" className="block text-sm font-semibold text-slate-700 mb-2">Guard ID / Location</label>
                                        <input
                                            id="guardId"
                                            type="text"
                                            {...register('guardId', { required: 'Guard ID or location is required' })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all bg-slate-50 focus:bg-white placeholder-slate-600"
                                            placeholder="e.g., PS-1024 or Banani HQ"
                                        />
                                        {errors.guardId && <p className="text-red-500 text-sm mt-1">{errors.guardId.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="incidentDescription" className="block text-sm font-semibold text-slate-700 mb-2">Incident Description</label>
                                    <textarea
                                        id="incidentDescription"
                                        rows={6}
                                        {...register('incidentDescription', { required: 'Please describe the incident' })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all bg-slate-50 focus:bg-white resize-none placeholder-slate-600"
                                        placeholder="Please provide a detailed description of what happened, including date, time, and specific actions."
                                    ></textarea>
                                    {errors.incidentDescription && <p className="text-red-500 text-sm mt-1">{errors.incidentDescription.message}</p>}
                                </div>

                                {errorMsg && (
                                    <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-center gap-3">
                                        <AlertTriangle className="w-5 h-5 shrink-0" />
                                        <p className="font-medium">{errorMsg}</p>
                                    </div>
                                )}

                                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mt-8 mb-6">
                                    <p className="text-amber-800 text-sm leading-relaxed">
                                        <strong>Confidentiality Notice:</strong> Information submitted through this form will be kept strictly confidential and only accessed by senior management personnel for disciplinary and review purposes.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md text-lg"
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    {isSubmitting ? 'Submitting Report...' : 'Securely Submit Report'}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
