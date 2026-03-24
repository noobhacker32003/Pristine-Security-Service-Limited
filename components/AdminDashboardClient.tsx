"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, LogOut, ShieldCheck, ClipboardSignature, AlertTriangle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutAdmin } from '@/app/admin/actions';

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

export default function AdminDashboardClient({ 
    initialReports, 
    initialServiceRequests 
}: { 
    initialReports: ReportType[], 
    initialServiceRequests: ServiceRequestType[] 
}) {
    const [reports, setReports] = useState(initialReports);
    const [serviceRequests, setServiceRequests] = useState(initialServiceRequests);
    const [activeTab, setActiveTab] = useState<'service' | 'report'>('service');
    const [searchQuery, setSearchQuery] = useState('');
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [toastMsg, setToastMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

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
                    <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm inline-flex">
                        <button
                            onClick={() => { setActiveTab('service'); setSearchQuery(''); }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all focus:outline-none ${
                                activeTab === 'service' 
                                ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50 border border-transparent'
                            }`}
                        >
                            <ClipboardSignature className="w-4 h-4" />
                            Service Requests ({serviceRequests.length})
                        </button>
                        <button
                            onClick={() => { setActiveTab('report'); setSearchQuery(''); }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all focus:outline-none ${
                                activeTab === 'report' 
                                ? 'bg-red-50 text-red-700 shadow-sm border border-red-100' 
                                : 'text-slate-600 hover:text-red-600 hover:bg-slate-50 border border-transparent'
                            }`}
                        >
                            <AlertTriangle className="w-4 h-4" />
                            Incident Reports ({reports.length})
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
                            className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm text-slate-800 placeholder-slate-600"
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
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
