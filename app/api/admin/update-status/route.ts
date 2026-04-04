import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Report from '@/models/Report';
import ServiceRequest from '@/models/ServiceRequest';
import { requireAdminAuth } from '@/lib/auth';

export async function PATCH(req: Request) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        await dbConnect();
        
        const body = await req.json();
        const { id, collectionType, newStatus } = body;

        if (!id || !collectionType || !newStatus) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const validStatuses = ['Pending', 'In Progress', 'Resolved'];
        if (!validStatuses.includes(newStatus)) {
            return NextResponse.json({ message: 'Invalid status value' }, { status: 400 });
        }

        let updatedDoc;
        
        if (collectionType === 'Report') {
            updatedDoc = await Report.findByIdAndUpdate(
                id,
                { status: newStatus },
                { new: true }
            );
        } else if (collectionType === 'ServiceRequest') {
            updatedDoc = await ServiceRequest.findByIdAndUpdate(
                id,
                { status: newStatus },
                { new: true }
            );
        } else {
            return NextResponse.json({ message: 'Invalid collection type' }, { status: 400 });
        }

        if (!updatedDoc) {
            return NextResponse.json({ message: 'Document not found' }, { status: 404 });
        }

        return NextResponse.json({ 
            message: 'Status updated successfully', 
            data: updatedDoc 
        }, { status: 200 });

    } catch (error) {
        console.error('Status update error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}
