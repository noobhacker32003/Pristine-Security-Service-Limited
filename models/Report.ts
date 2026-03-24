import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
    guardName: string;
    guardId: string;
    incidentDescription: string;
    status: 'Pending' | 'In Progress' | 'Resolved';
    createdAt: Date;
}

const ReportSchema: Schema = new Schema({
    guardName: { type: String, required: true },
    guardId: { type: String, required: true },
    incidentDescription: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);
