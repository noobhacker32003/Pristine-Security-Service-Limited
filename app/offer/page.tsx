import connectDB from '@/lib/mongodb';
import Offer from '@/models/Offer';
import OfferClient from './OfferClient';

export const dynamic = 'force-dynamic';

export default async function OfferPage() {
    await connectDB();
    
    // Fetch the single most recently updated, active offer
    const activeOffer = await Offer.findOne({ isActive: true })
        .sort({ updatedAt: -1 })
        .lean();
        
    let offer = null;
    if (activeOffer) {
        offer = {
            title: activeOffer.title as string,
            badgeText: activeOffer.badgeText as string,
            benefits: activeOffer.benefits as string[]
        };
    }

    return <OfferClient offer={offer} />;
}
