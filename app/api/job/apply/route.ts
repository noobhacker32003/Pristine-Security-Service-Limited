import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import JobApplication from '@/models/JobApplication';
import JobPost from '@/models/JobPost';

export async function POST(request: Request) {
    try {
        await connectDB();
        const { jobId, applicantName, age, phone } = await request.json();
        
        if (!jobId || !applicantName || !age || !phone) {
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
            age,
            phone
        });
        
        await application.save();
        
        return NextResponse.json({ success: true, application }, { status: 201 });
    } catch (error) {
        console.error("Error submitting job application:", error);
        return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to submit application" }, { status: 500 });
    }
}
