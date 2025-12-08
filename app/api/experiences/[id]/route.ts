import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/db";




export async function GET(request: NextRequest, { params }: { params: { id: string } }) {


    try {
        const experience = await db.experience.findUnique({
            where: {
                id: params.id
            }
        });
        return NextResponse.json(experience);

    } catch (error) {
        console.log("ERROR: ", error);
        return NextResponse.json({
            error,
            message: 'Failed to fetch experience'
        });

    }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {


    const id = params.id

    if (!id) {
        return NextResponse.json(
            { error: 'Missing id' },
            { status: 400 }
        );
    }

    try {
        await db.experience.delete({
            where: {
                id: id
            }

        });
        return NextResponse.json(
            { message: 'Experience deleted successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR: ", error);
        return NextResponse.json({
            error,
            message: 'Failed to delete category'
        });

    }
}