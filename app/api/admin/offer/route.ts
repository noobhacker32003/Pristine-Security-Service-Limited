import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Offer from '@/models/Offer';

export async function POST(request: Request) {
    try {
        await connectDB();
        const { title, badgeText, benefits } = await request.json();
        
        let offer = await Offer.findOne({ isActive: true });
        
        if (offer) {
            offer.title = title;
            offer.badgeText = badgeText;
            offer.benefits = benefits;
        } else {
            offer = new Offer({
                title,
                badgeText,
                benefits,
                isActive: true
            });
        }
        
        await offer.save();
        
        return NextResponse.json({ success: true, offer }, { status: 200 });
    } catch (error) {
        console.error("Error saving offer:", error);
        return NextResponse.json({ error: "Failed to save offer" }, { status: 500 });
    }
}
