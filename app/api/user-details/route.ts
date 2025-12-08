import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";


export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const content = await db.userDetail.findFirst();
        return NextResponse.json(content);

    } catch (error) {
        console.log("ERROR: ", error);
        return NextResponse.json({
            error,
            message: 'Failed to fetch content'
        });

    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Check if a user detail already exists
        const existing = await db.userDetail.findFirst();

        if (existing) {
            return NextResponse.json({
                error: 'User detail already exists. Use PUT to update.',
                message: 'User detail already exists'
            }, { status: 400 });
        }

        const userDetail = await db.userDetail.create({
            data: {
                welcomeTitle: body.welcomeTitle,
                welcomeNote: body.welcomeNote,
                welcomeDescription: body.welcomeDescription,
                cvFile: body.cvFile || null,
                userImage: body.userImage,
            }
        });

        return NextResponse.json(userDetail, { status: 201 });

    } catch (error) {
        console.log("ERROR: ", error);
        return NextResponse.json({
            error,
            message: 'Failed to create user detail'
        }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        // Get the first (and should be only) user detail
        const existing = await db.userDetail.findFirst();

        if (!existing) {
            return NextResponse.json({
                error: 'User detail not found',
                message: 'User detail not found. Create one first.'
            }, { status: 404 });
        }

        const userDetail = await db.userDetail.update({
            where: { id: existing.id },
            data: {
                welcomeTitle: body.welcomeTitle,
                welcomeNote: body.welcomeNote,
                welcomeDescription: body.welcomeDescription,
                cvFile: body.cvFile || null,
                userImage: body.userImage,
            }
        });

        return NextResponse.json(userDetail);

    } catch (error) {
        console.log("ERROR: ", error);
        return NextResponse.json({
            error,
            message: 'Failed to update user detail'
        }, { status: 500 });
    }
}