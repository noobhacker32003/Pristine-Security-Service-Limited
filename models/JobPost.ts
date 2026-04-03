import mongoose, { Schema, models, Document } from 'mongoose';

export interface IJobPost extends Document {
    title: string;
    description: string;
    requirements: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const jobPostSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const JobPost = models.JobPost || mongoose.model<IJobPost>('JobPost', jobPostSchema);
export default JobPost;
