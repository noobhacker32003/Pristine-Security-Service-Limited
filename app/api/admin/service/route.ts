import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const service = await Service.create(body);
        return NextResponse.json({ service }, { status: 201 });
    } catch (error) {
        console.error("Error creating service:", error);
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, ...updates } = body;
        if (!id) return NextResponse.json({ error: "Service ID is required" }, { status: 400 });

        const service = await Service.findByIdAndUpdate(id, updates, { new: true });
        if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

        return NextResponse.json({ service }, { status: 200 });
    } catch (error) {
        console.error("Error updating service:", error);
        return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: "Service ID is required" }, { status: 400 });

        await Service.findByIdAndDelete(id);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting service:", error);
        return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const services = await Service.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json(services, { status: 200 });
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}
