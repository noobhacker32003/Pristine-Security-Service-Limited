import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import JobPost from '@/models/JobPost';
import { requireAdminAuth } from '@/lib/auth';

export async function POST(request: Request) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        await connectDB();
        const { title, description, requirements, isActive = true } = await request.json();
        
        const job = new JobPost({
            title,
            description,
            requirements,
            isActive
        });
        
        await job.save();
        
        return NextResponse.json({ success: true, job }, { status: 201 });
    } catch (error) {
        console.error("Error creating job:", error);
        return NextResponse.json({ error: "Failed to create job post" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        await connectDB();
        const { id, title, description, requirements, isActive } = await request.json();
        
        if (!id) {
            return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
        }

        const job = await JobPost.findByIdAndUpdate(
            id,
            { title, description, requirements, isActive },
            { new: true }
        );
        
        return NextResponse.json({ success: true, job }, { status: 200 });
    } catch (error) {
        console.error("Error updating job:", error);
        return NextResponse.json({ error: "Failed to update job post" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
        }

        await JobPost.findByIdAndDelete(id);
        
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting job:", error);
        return NextResponse.json({ error: "Failed to delete job post" }, { status: 500 });
    }
}
