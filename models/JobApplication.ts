import mongoose, { Schema, models, Document } from 'mongoose';

export interface IJobApplication extends Document {
    jobId: mongoose.Types.ObjectId;
    jobTitle: string;
    applicantName: string;
    age: string;
    phone: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const jobApplicationSchema = new Schema({
    jobId: { type: Schema.Types.ObjectId, ref: 'JobPost', required: true },
    jobTitle: { type: String, required: true },
    applicantName: { type: String, required: true },
    age: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: 'Pending' } // Pending, Reviewed, Rejected
}, { timestamps: true });

// Force clear the cached model to apply new schema changes during HMR development
if (process.env.NODE_ENV !== 'production' && mongoose.models.JobApplication) {
    delete mongoose.models.JobApplication;
}

const JobApplication = mongoose.models.JobApplication || mongoose.model<IJobApplication>('JobApplication', jobApplicationSchema);
export default JobApplication;
