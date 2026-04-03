import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import JobPost from '@/models/JobPost';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();
        const jobs = await JobPost.find({ isActive: true }).sort({ createdAt: -1 });
        return NextResponse.json(jobs, { status: 200 });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}
