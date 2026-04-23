import mongoose, { Schema, models, Document } from 'mongoose';

export interface IJobPost extends Document {
    title: string;
    description: string;
    requirements: string[];
    vacancy: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const jobPostSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    vacancy: { type: Number, default: 1, min: 1 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// In dev mode, delete the cached model so schema changes take effect on hot reload
if (process.env.NODE_ENV !== 'production') {
    delete mongoose.models.JobPost;
}

const JobPost = mongoose.models.JobPost || mongoose.model<IJobPost>('JobPost', jobPostSchema);
export default JobPost;
