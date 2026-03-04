import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
    guardName: string;
    guardId: string;
    incidentDescription: string;
    createdAt: Date;
}

const ReportSchema: Schema = new Schema({
    guardName: { type: String, required: true },
    guardId: { type: String, required: true },
    incidentDescription: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);
