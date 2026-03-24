import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ServiceRequest from '@/models/ServiceRequest';

export async function POST(req: Request) {
    try {
        await dbConnect();
        
        const body = await req.json();
        const { name, email, phone, date, details } = body;

        if (!name || !email || !phone || !date || !details) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            );
        }

        const newRequest = await ServiceRequest.create({
            name,
            email,
            phone,
            date,
            details,
        });

        return NextResponse.json(
            { message: 'Service request submitted successfully', data: newRequest },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Service request error:', error);
        return NextResponse.json(
            { message: error.message || 'Failed to submit service request' },
            { status: 500 }
        );
    }
}
