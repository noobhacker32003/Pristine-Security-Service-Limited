import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Report from '@/models/Report';

export async function POST(req: Request) {
    try {
        await dbConnect();

        // Parse the request body
        const body = await req.json();
        const { guardName, guardId, incidentDescription } = body;

        // Validate inputs
        if (!guardName || !guardId || !incidentDescription) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Save to database
        const newReport = new Report({ guardName, guardId, incidentDescription });
        await newReport.save();

        return NextResponse.json(
            { success: true, message: 'Incident report submitted successfully!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error saving report:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
