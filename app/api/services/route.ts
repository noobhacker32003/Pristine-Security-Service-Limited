import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export const revalidate = 60;

export async function GET() {
    try {
        await connectDB();
        const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        return NextResponse.json(services, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
            },
        });
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}
