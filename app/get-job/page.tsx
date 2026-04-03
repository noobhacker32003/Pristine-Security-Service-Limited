"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Search, ChevronRight, CheckCircle2, ArrowRight, X, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

type JobPost = {
    _id: string;
    title: string;
    description: string;
    requirements: string[];
    createdAt: string;
};

type ApplicationForm = {
    applicantName: string;
    email: string;
    phone: string;
    resumeLink: string;
    details: string;
};

export default function GetJobPage() {
    const [jobs, setJobs] = useState<JobPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ApplicationForm>();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch('/api/job');
                if (res.ok) {
                    const data = await res.json();
                    setJobs(data);
                }
            } catch (error) {
                console.error("Failed to load jobs");
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const onSubmit = async (data: ApplicationForm) => {
        if (!selectedJob) return;
        setIsSubmitting(true);
        
        try {
            const res = await fetch('/api/job/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobId: selectedJob._id,
                    ...data
                })
            });
            
            if (res.ok) {
                setSubmitSuccess(true);
                setTimeout(() => {
                    setSubmitSuccess(false);
                    setSelectedJob(null);
                    reset();
                }, 4000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Join Our Team</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Discover exciting career opportunities with Pristine Security Service Limited. We are always looking for disciplined, professional, and dedicated individuals.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-16 text-center">
                        <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-700 mb-2">No Open Positions Currently</h2>
                        <p className="text-slate-500">Please check back later for new opportunities.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map(job => (
                            <motion.div
                                key={job._id}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col"
                            >
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{job.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                        <MapPin className="w-4 h-4" />
                                        Bangladesh
                                    </div>
                                </div>
                                <p className="text-slate-600 mb-6 flex-grow line-clamp-3">
                                    {job.description}
                                </p>
                                <button
                                    onClick={() => { setSelectedJob(job); setSubmitSuccess(false); reset(); }}
                                    className="w-full bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white transition-colors py-3 rounded-xl font-semibold flex items-center justify-center gap-2 group"
                                >
                                    Apply Now
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Application Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                        >
                            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <div>
                                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Applying for</p>
                                    <h2 className="text-xl font-bold text-slate-900">{selectedJob.title}</h2>
                                </div>
                                <button 
                                    onClick={() => setSelectedJob(null)}
                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                {submitSuccess ? (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-12 flex flex-col items-center text-center"
                                    >
                                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
                                        <p className="text-slate-600">Thank you for applying. Our recruiting team will review your application and contact you soon.</p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div className="mb-8 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                            <h4 className="font-semibold text-slate-900 mb-2">Requirements:</h4>
                                            <ul className="space-y-1">
                                                {selectedJob.requirements.map((req, i) => (
                                                    <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name *</label>
                                                    <input
                                                        {...register('applicantName', { required: true })}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number *</label>
                                                    <input
                                                        {...register('phone', { required: true })}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                                        placeholder="+880 1XXXXXXXXX"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address *</label>
                                                <input
                                                    type="email"
                                                    {...register('email', { required: true })}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                                    placeholder="john@example.com"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Link to Resume / CV *</label>
                                                <input
                                                    {...register('resumeLink', { required: true })}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                                    placeholder="Google Drive or Dropbox link..."
                                                />
                                                <p className="text-xs text-slate-500 mt-1">Please ensure the link is publicly accessible.</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Additional Details</label>
                                                <textarea
                                                    {...register('details')}
                                                    rows={3}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                                                    placeholder="Any other information you'd like us to know..."
                                                />
                                            </div>

                                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedJob(null)}
                                                    className="px-6 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md flex items-center justify-center min-w-[140px]"
                                                >
                                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application"}
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
