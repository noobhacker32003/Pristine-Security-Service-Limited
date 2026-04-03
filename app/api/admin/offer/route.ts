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

export async function DELETE(request: Request) {
    try {
        await connectDB();
        // Since there is only one active offer logic in the initial requirement, 
        // we can just delete all offers or specific one if ID is provided.
        // Let's support deleting all active offers if no ID is provided safely.
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            await Offer.findByIdAndDelete(id);
        } else {
            // Delete the active offer
            await Offer.deleteMany({ isActive: true });
        }
        
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting offer:", error);
        return NextResponse.json({ error: "Failed to delete offer" }, { status: 500 });
    }
}
