import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceRequest extends Document {
    name: string;
    email: string;
    phone: string;
    date: Date;
    details: string;
    status: 'Pending' | 'In Progress' | 'Resolved';
    createdAt: Date;
}

const ServiceRequestSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    details: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ServiceRequest || mongoose.model<IServiceRequest>('ServiceRequest', ServiceRequestSchema);
