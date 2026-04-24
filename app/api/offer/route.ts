import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Offer from '@/models/Offer';

export const revalidate = 60; // Cache for 60 seconds, then revalidate in background

export async function GET() {
    try {
        await connectDB();
        const activeOffer = await Offer.findOne({ isActive: true }).sort({ updatedAt: -1 });
        return NextResponse.json(activeOffer || null, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
            },
        });
    } catch (error) {
        console.error("Error fetching offer:", error);
        return NextResponse.json({ error: "Failed to fetch offer" }, { status: 500 });
    }
}
