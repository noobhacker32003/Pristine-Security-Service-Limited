import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import JobApplication from '@/models/JobApplication';

export async function PATCH(request: Request) {
    try {
        await connectDB();
        const { id, newStatus } = await request.json();

        if (!id || !newStatus) {
            return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
        }

        const application = await JobApplication.findByIdAndUpdate(
            id,
            { status: newStatus },
            { new: true }
        );

        return NextResponse.json({ success: true, application }, { status: 200 });
    } catch (error) {
        console.error("Error updating application status:", error);
        return NextResponse.json({ error: "Failed to update application status" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await JobApplication.findByIdAndDelete(id);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting application:", error);
        return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
    }
}