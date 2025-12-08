import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const aboutMe = await db.aboutContent.findMany();
        return NextResponse.json(aboutMe);

    } catch (error) {
        console.log("ERROR: ", error);
        return NextResponse.json({
            error,
            message: 'Failed to fetch aboutMe'
        });

    }
}