"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { Search, LogOut, ShieldCheck, ClipboardSignature, AlertTriangle, CheckCircle2, AlertCircle, Loader2, Plus, Trash2, Tag, Medal, Briefcase, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutAdmin } from '@/app/admin/actions';

type OfferFormValues = {
    title: string;
    badgeText: string;
    benefits: { value: string }[];
};

type ReportType = {
    _id: string;
    guardName: string;
    guardId: string;
    incidentDescription: string;
    createdAt: string;
    status?: string;
};

type ServiceRequestType = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    details: string;
    createdAt: string;
    status?: string;
};

export type JobType = {
    _id: string;
    title: string;
    description: string;
    requirements: string[];
    isActive: boolean;
    createdAt: string;
};

export type JobApplicationType = {
    _id: string;
    jobId: string;
    jobTitle: string;
    applicantName: string;
    age: string;
    phone: string;
    status: string;
    createdAt: string;
};

export default function AdminDashboardClient({ 
    initialReports, 
    initialServiceRequests,
    initialJobs = [],
    initialJobApplications = []
}: { 
    initialReports: ReportType[], 
    initialServiceRequests: ServiceRequestType[],
    initialJobs?: JobType[],
    initialJobApplications?: JobApplicationType[]
}) {
    const [reports, setReports] = useState(initialReports);
    const [serviceRequests, setServiceRequests] = useState(initialServiceRequests);
    const [jobs, setJobs] = useState(initialJobs);
    const [jobApplications, setJobApplications] = useState(initialJobApplications);
    const [activeTab, setActiveTab] = useState<'service' | 'report' | 'offer' | 'job_post' | 'job_app'>('service');
    const [searchQuery, setSearchQuery] = useState('');
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [toastMsg, setToastMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    const [isOfferLoading, setIsOfferLoading] = useState(false);
    
    const { register, control, handleSubmit, reset } = useForm<OfferFormValues>({
        defaultValues: {
            title: '',
            badgeText: '',
            benefits: [{ value: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "benefits"
    });

    const { register: registerJob, control: controlJob, handleSubmit: handleSubmitJob, reset: resetJob } = useForm({
        defaultValues: { title: '', description: '', requirements: [{ value: '' }], isActive: true }
    });

    const { fields: jobFields, append: appendJob, remove: removeJob } = useFieldArray({
        control: controlJob,
        name: "requirements"
    });

    const [isJobLoading, setIsJobLoading] = useState(false);

    useEffect(() => {
        if (activeTab === 'offer') {
            fetchOffer();
        }
    }, [activeTab]);

    const fetchOffer = async () => {
        setIsOfferLoading(true);
        try {
            const res = await fetch('/api/offer');
            if (res.ok) {
                const data = await res.json();
                if (data) {
                    reset({
                        title: data.title || '',
                        badgeText: data.badgeText || '',
                        benefits: data.benefits && data.benefits.length > 0 
                            ? data.benefits.map((b: string) => ({ value: b }))
                            : [{ value: '' }]
                    });
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsOfferLoading(false);
        }
    };

    const onSubmitOffer = async (data: OfferFormValues) => {
        try {
            const payload = {
                title: data.title,
                badgeText: data.badgeText,
                benefits: data.benefits.map(b => b.value).filter(b => b.trim() !== '')
            };
            const res = await fetch('/api/admin/offer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                showToast('success', 'Offer updated successfully');
            } else {
                showToast('error', 'Failed to update offer');
            }
        } catch (e) {
            console.error(e);
            showToast('error', 'An error occurred');
        }
    };

    const onSubmitJob = async (data: any) => {
        setIsJobLoading(true);
        try {
            const payload = {
                title: data.title,
                description: data.description,
                requirements: data.requirements.map((r: any) => r.value).filter((r: string) => r.trim() !== ''),
                isActive: data.isActive
            };
            const res = await fetch('/api/admin/job', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const result = await res.json();
                setJobs([{ ...result.job, _id: result.job._id.toString() }, ...jobs]);
                showToast('success', 'Job created successfully');
                resetJob();
            } else {
                showToast('error', 'Failed to create job');
            }
        } catch (e) {
            console.error(e);
            showToast('error', 'An error occurred');
        } finally {
            setIsJobLoading(false);
        }
    };

    const handleLogout = async () => {
        await logoutAdmin();
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).format(new Date(dateString));
    };

    const showToast = (type: 'success' | 'error', text: string) => {
        setToastMsg({ type, text });
        setTimeout(() => setToastMsg(null), 3000);
    };

    const handleStatusChange = async (id: string, collectionType: 'Report' | 'ServiceRequest', newStatus: string) => {
        setUpdatingId(id);
        try {
            const res = await fetch('/api/admin/update-status', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, collectionType, newStatus }),
            });

            if (!res.ok) throw new Error('Failed to update status');

            // Update local state
            if (collectionType === 'Report') {
                setReports(reports.map(r => r._id === id ? { ...r, status: newStatus } : r));
            } else {
                setServiceRequests(serviceRequests.map(s => s._id === id ? { ...s, status: newStatus } : s));
            }

            showToast('success', 'Status updated successfully');
        } catch (error) {
            console.error(error);
            showToast('error', 'Error updating status');
        } finally {
            setUpdatingId(null);
        }
    };

    const handleJobAppStatusChange = async (id: string, newStatus: string) => {
        setUpdatingId(id);
        try {
            const res = await fetch('/api/admin/job-application', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, newStatus }),
            });
            if (!res.ok) throw new Error('Failed to update status');
            setJobApplications(jobApplications.map(a => a._id === id ? { ...a, status: newStatus } : a));
            showToast('success', 'Application status updated');
        } catch (e) {
            console.error(e);
            showToast('error', 'Error updating status');
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDeleteJob = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this job post?")) return;
        setUpdatingId(id);
        try {
            const res = await fetch(`/api/admin/job?id=${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete job');
            setJobs(jobs.filter(j => j._id !== id));
            showToast('success', 'Job deleted successfully');
        } catch (error) {
            console.error(error);
            showToast('error', 'Error deleting job');
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDeleteJobApp = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this applicant application?")) return;
        setUpdatingId(id);
        try {
            const res = await fetch(`/api/admin/job-application?id=${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete application');
            setJobApplications(jobApplications.filter(a => a._id !== id));
            showToast('success', 'Application deleted successfully');
        } catch (error) {
            console.error(error);
            showToast('error', 'Error deleting application');
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDeleteOffer = async () => {
        if (!window.confirm("Are you sure you want to delete the active offer?")) return;
        setIsOfferLoading(true);
        try {
            const res = await fetch(`/api/admin/offer`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete offer');
            reset({ title: '', badgeText: '', benefits: [{ value: '' }] });
            showToast('success', 'Active offer deleted successfully');
        } catch (error) {
            console.error(error);
            showToast('error', 'Error deleting offer');
        } finally {
            setIsOfferLoading(false);
        }
    };

    const getStatusColorClass = (status?: string) => {
        switch (status) {
            case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Resolved': return 'bg-green-50 text-green-700 border-green-200';
            case 'Pending':
            default: return 'bg-amber-50 text-amber-700 border-amber-200';
        }
    };

    const filteredServiceRequests = serviceRequests.filter(req => {
        const query = searchQuery.toLowerCase();
        return (
            req.name?.toLowerCase().includes(query) ||
            req.email?.toLowerCase().includes(query) ||
            req.phone?.toLowerCase().includes(query) ||
            req.details?.toLowerCase().includes(query)
        );
    });

    const filteredReports = reports.filter(rep => {
        const query = searchQuery.toLowerCase();
        return (
            rep.guardName?.toLowerCase().includes(query) ||
            rep.guardId?.toLowerCase().includes(query) ||
            rep.incidentDescription?.toLowerCase().includes(query)
        );
    });

    const filteredJobApplications = jobApplications.filter(app => {
        const query = searchQuery.toLowerCase();
        return (
            app.applicantName?.toLowerCase().includes(query) ||
            app.phone?.toLowerCase().includes(query) ||
            app.age?.toString().includes(query) ||
            app.jobTitle?.toLowerCase().includes(query)
        );
    });

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm relative">
                {/* Toast Notification */}
                <AnimatePresence>
                    {toastMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="absolute top-full right-4 mt-4 z-50 pointer-events-none"
                        >
                            <div className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-3 ${
                                toastMsg.type === 'success' 
                                ? 'bg-green-50 border-green-200 text-green-800' 
                                : 'bg-red-50 border-red-200 text-red-800'
                            }`}>
                                {toastMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                <span className="font-medium text-sm">{toastMsg.text}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-2.5 rounded-xl">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Admin Portal</h1>
                                <p className="text-xs text-slate-500 font-medium">Pristine Security Service</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-slate-600 hover:text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-full font-medium transition-all text-sm border border-transparent hover:border-red-100 focus:outline-none"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Secure Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Dashboard Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-1">
                        <button
                            onClick={() => { setActiveTab('service'); setSearchQuery(''); }}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all focus:outline-none ${
                                activeTab === 'service' 
                                ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50 border border-transparent'
                            }`}
                        >
                            <ClipboardSignature className="w-4 h-4" />
                            Services
                        </button>
                        <button
                            onClick={() => { setActiveTab('report'); setSearchQuery(''); }}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all focus:outline-none ${
                                activeTab === 'report' 
                                ? 'bg-red-50 text-red-700 shadow-sm border border-red-100' 
                                : 'text-slate-600 hover:text-red-600 hover:bg-slate-50 border border-transparent'
                            }`}
                        >
                            <AlertTriangle className="w-4 h-4" />
                            Reports
                        </button>
                        <button
                            onClick={() => { setActiveTab('job_app'); setSearchQuery(''); }}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all focus:outline-none ${
                                activeTab === 'job_app' 
                                ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100' 
                                : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50 border border-transparent'
                            }`}
                        >
                            <FileText className="w-4 h-4" />
                            Applications ({jobApplications.filter(a => a.status === 'Pending').length} new)
                        </button>
                        <button
                            onClick={() => { setActiveTab('job_post'); setSearchQuery(''); }}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all focus:outline-none ${
                                activeTab === 'job_post' 
                                ? 'bg-cyan-50 text-cyan-700 shadow-sm border border-cyan-100' 
                                : 'text-slate-600 hover:text-cyan-600 hover:bg-slate-50 border border-transparent'
                            }`}
                        >
                            <Briefcase className="w-4 h-4" />
                            Manage Jobs
                        </button>
                        <button
                            onClick={() => { setActiveTab('offer'); setSearchQuery(''); }}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all focus:outline-none ${
                                activeTab === 'offer' 
                                ? 'bg-amber-50 text-amber-700 shadow-sm border border-amber-100' 
                                : 'text-slate-600 hover:text-amber-600 hover:bg-slate-50 border border-transparent'
                            }`}
                        >
                            <Tag className="w-4 h-4" />
                            Offers
                        </button>
                    </div>

                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder={activeTab === 'service' ? "Search client name, email, details..." : "Search guard name, ID, details..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm text-slate-800 placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* Data Tables Area */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'service' && (
                            <motion.div
                                key="service-table"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-slate-600">
                                        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                                            <tr>
                                                <th className="px-6 py-4">Client</th>
                                                <th className="px-6 py-4">Contact</th>
                                                <th className="px-6 py-4">Service Date</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 min-w-[300px]">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {filteredServiceRequests.length > 0 ? (
                                                filteredServiceRequests.map((req) => (
                                                    <tr key={req._id} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="px-6 py-5">
                                                            <div className="font-semibold text-slate-900">{req.name}</div>
                                                            <div className="text-slate-400 text-xs mt-1">{formatDate(req.createdAt)}</div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="text-slate-800">{req.email}</div>
                                                            <div className="text-slate-500 text-xs mt-1">{req.phone}</div>
                                                        </td>
                                                        <td className="px-6 py-5 font-medium text-slate-800">
                                                            {req.date ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(req.date)) : 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="relative inline-block">
                                                                <select 
                                                                    disabled={updatingId === req._id}
                                                                    value={req.status || 'Pending'}
                                                                    onChange={(e) => handleStatusChange(req._id, 'ServiceRequest', e.target.value)}
                                                                    className={`appearance-none font-semibold text-xs px-3 pl-3 pr-8 py-1.5 rounded-full border cursor-pointer focus:outline-none transition-colors ${getStatusColorClass(req.status || 'Pending')} ${updatingId === req._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                >
                                                                    <option value="Pending">Pending</option>
                                                                    <option value="In Progress">In Progress</option>
                                                                    <option value="Resolved">Resolved</option>
                                                                </select>
                                                                {updatingId === req._id && (
                                                                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                                        <Loader2 className="w-3 h-3 animate-spin text-slate-500" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="bg-slate-50 p-3 rounded-lg text-slate-700 text-sm whitespace-pre-wrap border border-slate-100">
                                                                {req.details}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-20 text-center text-slate-500">
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            <ClipboardSignature className="w-8 h-8 text-slate-300" />
                                                            <p>No service requests found matching your search.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'report' && (
                            <motion.div
                                key="report-table"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-slate-600">
                                        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                                            <tr>
                                                <th className="px-6 py-4">Guard Details</th>
                                                <th className="px-6 py-4">Reported On</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 min-w-[400px]">Incident Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {filteredReports.length > 0 ? (
                                                filteredReports.map((rep) => (
                                                    <tr key={rep._id} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="px-6 py-5">
                                                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                                                                {rep.guardName}
                                                            </div>
                                                            <div className="text-slate-500 text-xs mt-1 font-mono bg-slate-100 inline-block px-2 py-0.5 rounded border border-slate-200">
                                                                ID: {rep.guardId}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5 text-slate-500">
                                                            {formatDate(rep.createdAt)}
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="relative inline-block">
                                                                <select 
                                                                    disabled={updatingId === rep._id}
                                                                    value={rep.status || 'Pending'}
                                                                    onChange={(e) => handleStatusChange(rep._id, 'Report', e.target.value)}
                                                                    className={`appearance-none font-semibold text-xs px-3 pl-3 pr-8 py-1.5 rounded-full border cursor-pointer focus:outline-none transition-colors ${getStatusColorClass(rep.status || 'Pending')} ${updatingId === rep._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                >
                                                                    <option value="Pending">Pending</option>
                                                                    <option value="In Progress">In Progress</option>
                                                                    <option value="Resolved">Resolved</option>
                                                                </select>
                                                                {updatingId === rep._id && (
                                                                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                                        <Loader2 className="w-3 h-3 animate-spin text-slate-500" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="bg-red-50 p-3.5 rounded-xl text-slate-800 text-sm whitespace-pre-wrap border border-red-100">
                                                                {rep.incidentDescription}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-20 text-center text-slate-500">
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            <AlertTriangle className="w-8 h-8 text-slate-300" />
                                                            <p>No incident reports found matching your search.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'offer' && (
                            <motion.div
                                key="offer-form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="p-8 max-w-3xl mx-auto"
                            >
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                        <Medal className="w-6 h-6 text-amber-500" />
                                        Edit Active Offer
                                    </h2>
                                    <p className="text-slate-500 mt-2 text-sm">Update the promotional offer displayed on the public website.</p>
                                </div>

                                {isOfferLoading ? (
                                    <div className="flex justify-center items-center py-20">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmitOffer)} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Offer Title</label>
                                            <input
                                                {...register('title', { required: true })}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-slate-400 text-slate-800"
                                                placeholder="e.g., Providing 24 Hours Security Service"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Badge Text</label>
                                            <input
                                                {...register('badgeText', { required: true })}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-slate-400 text-slate-800"
                                                placeholder="e.g., SPECIAL OFFER"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Benefits List</label>
                                            <div className="space-y-3">
                                                {fields.map((field, index) => (
                                                    <div key={field.id} className="flex gap-2">
                                                        <div className="flex-grow relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                            </div>
                                                            <input
                                                                {...register(`benefits.${index}.value`, { required: true })}
                                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-slate-400 text-slate-800"
                                                                placeholder={`Benefit ${index + 1}`}
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => remove(index)}
                                                            className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors focus:outline-none"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                ))}
                                                
                                                <button
                                                    type="button"
                                                    onClick={() => append({ value: '' })}
                                                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 mt-2 focus:outline-none"
                                                >
                                                    <Plus className="w-4 h-4" /> Add another benefit
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                            <button
                                                type="submit"
                                                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg focus:outline-none"
                                            >
                                                Save Active Offer
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleDeleteOffer}
                                                className="px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-semibold transition-all focus:outline-none border border-red-200"
                                            >
                                                Delete Offer
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'job_post' && (
                            <motion.div
                                key="job-post-form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="p-8 max-w-3xl mx-auto"
                            >
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                        <Briefcase className="w-6 h-6 text-cyan-500" />
                                        Create New Job Post
                                    </h2>
                                    <p className="text-slate-500 mt-2 text-sm">Open a new position for the public to apply to.</p>
                                </div>

                                {isJobLoading ? (
                                    <div className="flex justify-center items-center py-20">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmitJob(onSubmitJob)} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title</label>
                                            <input
                                                {...registerJob('title', { required: true })}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 placeholder:text-slate-400 text-slate-800"
                                                placeholder="e.g., Senior Security Officer"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                                            <textarea
                                                {...registerJob('description', { required: true })}
                                                rows={4}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 resize-none placeholder:text-slate-400 text-slate-800"
                                                placeholder="Describe the job position..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Requirements</label>
                                            <div className="space-y-3">
                                                {jobFields.map((field, index) => (
                                                    <div key={field.id} className="flex gap-2">
                                                        <div className="flex-grow relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <CheckCircle2 className="h-5 w-5 text-cyan-500" />
                                                            </div>
                                                            <input
                                                                {...registerJob(`requirements.${index}.value` as const, { required: true })}
                                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-slate-400 text-slate-800"
                                                                placeholder={`Requirement ${index + 1}`}
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeJob(index)}
                                                            className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors focus:outline-none"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                ))}
                                                
                                                <button
                                                    type="button"
                                                    onClick={() => appendJob({ value: '' })}
                                                    className="flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 mt-2 focus:outline-none"
                                                >
                                                    <Plus className="w-4 h-4" /> Add another requirement
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="isActive"
                                                    {...registerJob('isActive')}
                                                    className="w-5 h-5 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
                                                />
                                                <label htmlFor="isActive" className="text-sm font-medium text-slate-700">Active (Visible to public)</label>
                                            </div>
                                            <div className="ml-auto">
                                                <button
                                                    type="submit"
                                                    className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-semibold transition-all shadow-md focus:outline-none"
                                                >
                                                    Create Job Post
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                                
                                <div className="mt-12 pt-8 border-t border-slate-200">
                                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-slate-500" />
                                        Existing Job Posts ({jobs.length})
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        {jobs.length > 0 ? (
                                            jobs.map(job => (
                                                <div key={job._id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-start justify-between gap-4">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h4 className="font-semibold text-slate-900">{job.title}</h4>
                                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${job.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                                                {job.isActive ? 'Active' : 'Inactive'}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-slate-600 line-clamp-2">{job.description}</p>
                                                        <div className="text-xs text-slate-400 mt-2">Posted: {formatDate(job.createdAt)}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteJob(job._id)}
                                                        className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors focus:outline-none shrink-0"
                                                        title="Delete Job"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-slate-100 p-8">
                                                No job posts found.
                                            </div>
                                        )}
                                    </div>
                                </div>
                               
                            </motion.div>
                        )}

                        {activeTab === 'job_app' && (
                            <motion.div
                                key="job-app-table"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-slate-600">
                                        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                                            <tr>
                                                <th className="px-6 py-4">Applicant</th>
                                                <th className="px-6 py-4">Position</th>
                                                <th className="px-6 py-4">Contact</th>
                                                <th className="px-6 py-4">Age</th>
                                                <th className="px-6 py-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {filteredJobApplications.length > 0 ? (
                                                filteredJobApplications.map((app) => (
                                                    <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="px-6 py-5">
                                                            <div className="font-semibold text-slate-900">{app.applicantName}</div>
                                                            <div className="text-slate-400 text-xs mt-1">{formatDate(app.createdAt)}</div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="font-medium text-slate-800">{app.jobTitle}</div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="text-slate-500">{app.phone}</div>
                                                        </td>
                                                        <td className="px-6 py-5 font-semibold text-slate-800">
                                                            {app.age}
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="relative inline-block">
                                                                    <select 
                                                                        disabled={updatingId === app._id}
                                                                        value={app.status || 'Pending'}
                                                                        onChange={(e) => handleJobAppStatusChange(app._id, e.target.value)}
                                                                        className={`appearance-none font-semibold text-xs px-3 pl-3 pr-8 py-1.5 rounded-full border cursor-pointer focus:outline-none transition-colors ${app.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : app.status === 'Reviewed' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-red-50 text-red-700 border-red-200'} ${updatingId === app._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                    >
                                                                        <option value="Pending">Pending</option>
                                                                        <option value="Reviewed">Reviewed</option>
                                                                        <option value="Rejected">Rejected</option>
                                                                    </select>
                                                                    {updatingId === app._id && (
                                                                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                                            <Loader2 className="w-3 h-3 animate-spin text-slate-500" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <button
                                                                    onClick={() => handleDeleteJobApp(app._id)}
                                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none"
                                                                    title="Delete Application"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-20 text-center text-slate-500">
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            <FileText className="w-8 h-8 text-slate-300" />
                                                            <p>No job applications found.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
