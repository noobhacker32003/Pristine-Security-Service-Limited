"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, ChevronRight, CheckCircle2, ArrowRight, X, Loader2, Clock, Users, Shield, Building2, CalendarDays, ListChecks } from 'lucide-react';
import { useForm } from 'react-hook-form';

type JobPost = {
    _id: string;
    title: string;
    description: string;
    requirements: string[];
    vacancy?: number;
    createdAt: string;
};

type ApplicationForm = {
    applicantName: string;
    age: string;
    phone: string;
};

/* ─────────────── Skeleton Components ─────────────── */
function JobCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm animate-pulse">
            {/* Top colored bar */}
            <div className="h-1.5 bg-slate-200 w-full" />
            <div className="p-6">
                {/* Icon + Badge */}
                <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 bg-slate-200 rounded-xl" />
                    <div className="h-6 w-20 bg-slate-100 rounded-full" />
                </div>
                {/* Title */}
                <div className="h-6 w-[75%] bg-slate-200 rounded-lg mb-3" />
                {/* Location */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 bg-slate-100 rounded-full" />
                    <div className="h-4 w-24 bg-slate-100 rounded-lg" />
                </div>
                {/* Description */}
                <div className="space-y-2 mb-6">
                    <div className="h-4 w-full bg-slate-100 rounded-lg" />
                    <div className="h-4 w-[85%] bg-slate-100 rounded-lg" />
                    <div className="h-4 w-[60%] bg-slate-100 rounded-lg" />
                </div>
                {/* Requirements */}
                <div className="space-y-2 mb-6">
                    <div className="h-3 w-20 bg-slate-200 rounded mb-2" />
                    <div className="h-3 w-[70%] bg-slate-100 rounded" />
                    <div className="h-3 w-[55%] bg-slate-100 rounded" />
                </div>
                {/* Button */}
                <div className="h-12 w-full bg-slate-200 rounded-xl" />
            </div>
        </div>
    );
}

function PageSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Skeleton */}
                <div className="text-center mb-16 animate-pulse">
                    <div className="h-8 w-40 bg-slate-200 rounded-full mx-auto mb-6" />
                    <div className="h-12 w-[60%] bg-slate-200 rounded-2xl mx-auto mb-4" />
                    <div className="h-5 w-[45%] bg-slate-100 rounded-lg mx-auto" />
                </div>

                {/* Stats Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-pulse">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100">
                            <div className="w-10 h-10 bg-slate-200 rounded-lg mb-3" />
                            <div className="h-7 w-12 bg-slate-200 rounded-lg mb-1" />
                            <div className="h-4 w-20 bg-slate-100 rounded" />
                        </div>
                    ))}
                </div>

                {/* Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <JobCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─────────────── Utility: Format Date ─────────────── */
function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

/* ─────────────── Main Page ─────────────── */
export default function GetJobPage() {
    const [jobs, setJobs] = useState<JobPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

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
        setSubmitError(null);

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
            } else {
                const errorData = await res.json();
                setSubmitError(errorData.error || "Failed to submit application. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setSubmitError("Network error. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <PageSkeleton />;

    const cardColors = [
        { bar: 'bg-blue-500', icon: 'bg-blue-50 text-blue-600', badge: 'bg-blue-50 text-blue-700' },
        { bar: 'bg-emerald-500', icon: 'bg-emerald-50 text-emerald-600', badge: 'bg-emerald-50 text-emerald-700' },
        { bar: 'bg-violet-500', icon: 'bg-violet-50 text-violet-600', badge: 'bg-violet-50 text-violet-700' },
        { bar: 'bg-amber-500', icon: 'bg-amber-50 text-amber-600', badge: 'bg-amber-50 text-amber-700' },
        { bar: 'bg-rose-500', icon: 'bg-rose-50 text-rose-600', badge: 'bg-rose-50 text-rose-700' },
        { bar: 'bg-cyan-500', icon: 'bg-cyan-50 text-cyan-600', badge: 'bg-cyan-50 text-cyan-700' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-5 py-2 rounded-full text-sm font-bold tracking-wide border border-green-200 mb-6">
                        <Briefcase className="w-4 h-4" />
                        We&apos;re Hiring
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                        Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Team</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Discover exciting career opportunities with Pristine Security Service Limited. We seek disciplined, professional, and dedicated individuals.
                    </p>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                            <Briefcase className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{jobs.length}</p>
                        <p className="text-sm text-slate-500">Open Positions</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-3">
                            <Users className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">3,500+</p>
                        <p className="text-sm text-slate-500">Total Employees</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center mb-3">
                            <Users className="w-5 h-5 text-violet-600" />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{jobs.reduce((sum, j) => sum + (j.vacancy || 1), 0)}</p>
                        <p className="text-sm text-slate-500">Total Vacancies</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
                            <Shield className="w-5 h-5 text-amber-600" />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">15+</p>
                        <p className="text-sm text-slate-500">Years Experience</p>
                    </div>
                </motion.div>

                {/* Job Listings */}
                {jobs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-sm border border-slate-100 p-16 text-center"
                    >
                        <div className="bg-gradient-to-br from-slate-100 to-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-200">
                            <Briefcase className="w-10 h-10 text-slate-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-700 mb-3">No Open Positions Currently</h2>
                        <p className="text-slate-500 max-w-md mx-auto">We don&apos;t have any openings right now. Please check back later for new opportunities or contact us to express your interest.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {jobs.map((job, idx) => {
                            const color = cardColors[idx % cardColors.length];
                            return (
                                <motion.div
                                    key={job._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * idx }}
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all duration-300"
                                >
                                    {/* Color bar */}
                                    <div className={`h-1.5 w-full ${color.bar}`} />

                                    <div className="p-6 flex flex-col flex-1">
                                        {/* Icon + Posted Date Badge */}
                                        <div className="flex items-center justify-between mb-5">
                                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color.icon}`}>
                                                <Building2 className="w-5 h-5" />
                                            </div>
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${color.badge}`}>
                                                <CalendarDays className="w-3 h-3 inline mr-1 -mt-0.5" />
                                                {formatDate(job.createdAt)}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {job.title}
                                        </h3>

                                        {/* Location */}
                                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-2">
                                            <MapPin className="w-3.5 h-3.5" />
                                            Bangladesh
                                        </div>

                                        {/* Vacancy Badge */}
                                        <div className="flex items-center gap-2 text-sm font-semibold mb-4">
                                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                                            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs border border-emerald-200">
                                                {job.vacancy || 1} {(job.vacancy || 1) === 1 ? 'Vacancy' : 'Vacancies'}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-slate-600 mb-5 flex-grow line-clamp-3 text-sm leading-relaxed">
                                            {job.description}
                                        </p>

                                        {/* Requirements Preview */}
                                        {job.requirements.length > 0 && (
                                            <div className="mb-5">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                    <ListChecks className="w-3.5 h-3.5" />
                                                    Requirements
                                                </p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {job.requirements.slice(0, 3).map((req, i) => (
                                                        <span key={i} className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-100 font-medium truncate max-w-[180px]">
                                                            {req}
                                                        </span>
                                                    ))}
                                                    {job.requirements.length > 3 && (
                                                        <span className="text-xs bg-slate-50 text-slate-400 px-2.5 py-1 rounded-lg border border-slate-100 font-medium">
                                                            +{job.requirements.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Apply Button */}
                                        <button
                                            onClick={() => { setSelectedJob(job); setSubmitSuccess(false); reset(); }}
                                            className="w-full bg-slate-900 hover:bg-blue-600 text-white transition-all py-3 rounded-xl font-semibold flex items-center justify-center gap-2 group/btn mt-auto"
                                        >
                                            Apply Now
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
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
                            {/* Modal Header */}
                            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white">
                                <div>
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Applying for</p>
                                    <h2 className="text-xl font-bold text-slate-900">{selectedJob.title}</h2>
                                </div>
                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
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
                                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
                                        <p className="text-slate-600 max-w-md">Thank you for applying. Our recruiting team will review your application and contact you soon.</p>
                                    </motion.div>
                                ) : (
                                    <>
                                        {/* Requirements */}
                                        <div className="mb-8 bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                                            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                                                <ListChecks className="w-4 h-4 text-blue-600" />
                                                Requirements
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedJob.requirements.map((req, i) => (
                                                    <li key={i} className="text-sm text-slate-700 flex items-start gap-2.5">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {submitError && (
                                            <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium">
                                                {submitError}
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name *</label>
                                                    <input
                                                        {...register('applicantName', { required: true })}
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-slate-400 text-slate-800 transition-all"
                                                        placeholder="John Doe"
                                                    />
                                                    {errors.applicantName && <p className="text-xs text-red-500 mt-1">Name is required</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Age *</label>
                                                    <input
                                                        type="number"
                                                        {...register('age', { required: true })}
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-slate-400 text-slate-800 transition-all"
                                                        placeholder="e.g. 25"
                                                    />
                                                    {errors.age && <p className="text-xs text-red-500 mt-1">Age is required</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number *</label>
                                                <input
                                                    {...register('phone', { required: true })}
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-slate-400 text-slate-800 transition-all"
                                                    placeholder="+880 1XXXXXXXXX"
                                                />
                                                {errors.phone && <p className="text-xs text-red-500 mt-1">Phone number is required</p>}
                                            </div>

                                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedJob(null)}
                                                    className="px-6 py-3 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md flex items-center justify-center min-w-[160px] gap-2"
                                                >
                                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                                        <>
                                                            Submit Application
                                                            <ArrowRight className="w-4 h-4" />
                                                        </>
                                                    )}
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
