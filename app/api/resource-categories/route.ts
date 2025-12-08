import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\\s-]/g, '')
        .replace(/[\\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export async function GET(request: NextRequest) {
    try {
        const categories = await db.resourceCategory.findMany();
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching resource categories:", error);
        return NextResponse.json({ message: "Error fetching resource categories" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, description } = body;

        if (!name) {
            return NextResponse.json({ message: "Name is required" }, { status: 400 });
        }

        const slug = generateSlug(name);

        const existingCategory = await db.resourceCategory.findUnique({
            where: { slug },
        });

        if (existingCategory) {
            return NextResponse.json({ message: "Resource category with this name already exists" }, { status: 409 });
        }

        const newCategory = await db.resourceCategory.create({
            data: {
                name,
                slug,
                description,
            },
        });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error("Error creating resource category:", error);
        return NextResponse.json({ message: "Error creating resource category" }, { status: 500 });
    }
}