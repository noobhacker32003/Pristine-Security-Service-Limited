import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
    title: string;
    description: string;
    image: string;
    icon: string;
    tags: string[];
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const serviceSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    icon: { type: String, default: 'Shield' },
    tags: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

// In dev mode, delete the cached model so schema changes take effect on hot reload
if (process.env.NODE_ENV !== 'production') {
    delete mongoose.models.Service;
}

const Service = mongoose.models.Service || mongoose.model<IService>('Service', serviceSchema);
export default Service;
