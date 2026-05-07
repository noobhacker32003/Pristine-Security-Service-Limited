import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { defaultServices } from '@/lib/site-data';

/**
 * GET /api/services/seed
 * Seeds the services collection if it's empty.
 * Safe to call multiple times — it only inserts when the collection is empty.
 */
export async function GET() {
    try {
        await connectDB();
        const count = await Service.countDocuments();

        if (count > 0) {
            return NextResponse.json(
                { message: `Services already seeded (${count} found). Skipping.` },
                { status: 200 }
            );
        }

        const inserted = await Service.insertMany(
            defaultServices.map(s => ({ ...s, isActive: true }))
        );

        return NextResponse.json(
            { message: `Successfully seeded ${inserted.length} services.`, count: inserted.length },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error seeding services:", error);
        return NextResponse.json({ error: "Failed to seed services" }, { status: 500 });
    }
}
