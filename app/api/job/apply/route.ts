import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import JobApplication from '@/models/JobApplication';
import JobPost from '@/models/JobPost';

export async function POST(request: Request) {
    try {
        await connectDB();
        const { jobId, applicantName, email, phone, resumeLink, details } = await request.json();
        
        if (!jobId || !applicantName || !email || !phone || !resumeLink) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const job = await JobPost.findById(jobId);
        if (!job) {
            return NextResponse.json({ error: "Job post not found" }, { status: 404 });
        }

        const application = new JobApplication({
            jobId,
            jobTitle: job.title,
            applicantName,
            email,
            phone,
            resumeLink,
            details
        });
        
        await application.save();
        
        return NextResponse.json({ success: true, application }, { status: 201 });
    } catch (error) {
        console.error("Error submitting job application:", error);
        return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }
}
