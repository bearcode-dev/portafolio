import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";


export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const experiences = await db.experience.findMany({
            include: {
                inputs: true
            }
        }

        );
        return NextResponse.json(experiences);

    } catch (error) {
        console.log("ERROR: ", error);
        return NextResponse.json({
            error,
            message: 'Failed to fetch content'
        });

    }
}



export async function POST(request: NextRequest, response: NextResponse) {
    try {

        const data = await request.json();
        const experiences = await db.experience.create({
            data: {
                name: data.name,
                title: data.title,
                start: data.start,
                end: data.end,
                image: data.image
            }
        }

        );
        return NextResponse.json(experiences);

    } catch (error) {
        console.log("ERROR: ", error);
        return NextResponse.json({
            error,
            message: 'Failed to fetch content'
        });

    }
}


export async function PUT(request: Request ) {

    const { id, title, name, start, end, image } = await request.json();

    try {
        const experience = await db.experience.update({
            where: {
                id
            },
            data: {
                title,
                name,
                start: start,
                end: end,
                image: image
            }
        });
        return NextResponse.json(experience);

    } catch (error) {
        console.log("ERROR: ", error);
        return NextResponse.json({
            error,
            message: 'Failed to update brand'
        });

    }
}