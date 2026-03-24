import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Report from '@/models/Report';
import ServiceRequest from '@/models/ServiceRequest';
import AdminDashboardClient from '@/components/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session');

    if (!adminSession || adminSession.value !== 'true') {
        redirect('/admin');
    }

    await dbConnect();

    // Fetch data and lean() to get plain JS objects
    const reports = await Report.find({}).sort({ createdAt: -1 }).lean() as any[];
    const serviceRequests = await ServiceRequest.find({}).sort({ createdAt: -1 }).lean() as any[];

    // Serialize object IDs and dates
    const serializedReports = reports.map(r => ({
        ...r,
        _id: r._id.toString(),
        createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : null,
    }));

    const serializedServiceRequests = serviceRequests.map(r => ({
        ...r,
        _id: r._id.toString(),
        date: r.date ? new Date(r.date).toISOString() : null,
        createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : null,
    }));

    return (
        <AdminDashboardClient 
            initialReports={serializedReports} 
            initialServiceRequests={serializedServiceRequests} 
        />
    );
}
