import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: Request) {
    try {
        await dbConnect();

        // Parse the request body
        const body = await req.json();
        const { name, email, message } = body;

        // Validate inputs
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Save to database
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        return NextResponse.json(
            { success: true, message: 'Message sent successfully!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error saving contact:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
