import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Report from '@/models/Report';
import ServiceRequest from '@/models/ServiceRequest';
import JobPost from '@/models/JobPost';
import JobApplication from '@/models/JobApplication';
import AdminDashboardClient from '@/components/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session');

    if (!adminSession || !process.env.ADMIN_SESSION_SECRET || adminSession.value !== process.env.ADMIN_SESSION_SECRET) {
        redirect('/admin');
    }

    await dbConnect();

    // Fetch data and lean() to get plain JS objects
    const reports = await Report.find({}).sort({ createdAt: -1 }).lean() as any[];
    const serviceRequests = await ServiceRequest.find({}).sort({ createdAt: -1 }).lean() as any[];
    const jobs = await JobPost.find({}).sort({ createdAt: -1 }).lean() as any[];
    const jobApplications = await JobApplication.find({}).sort({ createdAt: -1 }).lean() as any[];

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

    const serializedJobs = jobs.map(j => ({
        ...j,
        _id: j._id.toString(),
        createdAt: j.createdAt ? new Date(j.createdAt).toISOString() : null,
        updatedAt: j.updatedAt ? new Date(j.updatedAt).toISOString() : null,
    }));

    const serializedJobApplications = jobApplications.map(a => ({
        ...a,
        _id: a._id.toString(),
        jobId: a.jobId.toString(),
        createdAt: a.createdAt ? new Date(a.createdAt).toISOString() : null,
        updatedAt: a.updatedAt ? new Date(a.updatedAt).toISOString() : null,
    }));

    return (
        <AdminDashboardClient 
            initialReports={serializedReports} 
            initialServiceRequests={serializedServiceRequests} 
            initialJobs={serializedJobs}
            initialJobApplications={serializedJobApplications}
        />
    );
}
