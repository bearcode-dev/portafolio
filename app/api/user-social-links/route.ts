import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const content = await db.userSocialLink.findMany();
        return NextResponse.json(content);

    } catch (error) {
        console.log("ERROR: ", error);
        return NextResponse.json({
            error,
            message: 'Failed to fetch content'
        });

    }
}