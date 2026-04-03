import mongoose, { Schema, models } from 'mongoose';

const offerSchema = new Schema({
    title: { type: String, required: true },
    badgeText: { type: String, required: true },
    benefits: { type: [String], required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Offer = models.Offer || mongoose.model('Offer', offerSchema);
export default Offer;
