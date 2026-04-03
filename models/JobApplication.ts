import mongoose, { Schema, models, Document } from 'mongoose';

export interface IJobApplication extends Document {
    jobId: mongoose.Types.ObjectId;
    jobTitle: string;
    applicantName: string;
    email: string;
    phone: string;
    resumeLink: string;
    details?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const jobApplicationSchema = new Schema({
    jobId: { type: Schema.Types.ObjectId, ref: 'JobPost', required: true },
    jobTitle: { type: String, required: true },
    applicantName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resumeLink: { type: String, required: true },
    details: { type: String, default: '' },
    status: { type: String, default: 'Pending' } // Pending, Reviewed, Rejected
}, { timestamps: true });

const JobApplication = models.JobApplication || mongoose.model<IJobApplication>('JobApplication', jobApplicationSchema);
export default JobApplication;
