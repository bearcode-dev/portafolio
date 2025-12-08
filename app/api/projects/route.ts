import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { seedDatabase } from "../../../lib/prisma-seed";


export async function GET(request: NextRequest, response: NextResponse) {

    // seedDatabase()
    //     .catch((e) => {
    //         throw e;
    //     })
    //     .finally(async () => {
    //         console.log('Database seeded');
    //         await db.$disconnect();
    //     });
    try {
        const content = await db.project.findMany({
            include: {
                tools: true
            }
        });
        return NextResponse.json(content);

    } catch (error) {
        console.log("ERROR: ", error);
        return NextResponse.json({
            error,
            message: 'Failed to fetch content'
        });

    }
}