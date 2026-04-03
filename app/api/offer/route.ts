import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Offer from '@/models/Offer';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();
        const activeOffer = await Offer.findOne({ isActive: true }).sort({ updatedAt: -1 });
        return NextResponse.json(activeOffer || null, { status: 200 });
    } catch (error) {
        console.error("Error fetching offer:", error);
        return NextResponse.json({ error: "Failed to fetch offer" }, { status: 500 });
    }
}
