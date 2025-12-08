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

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        const category = await db.resourceCategory.findUnique({ where: { slug } });

        if (!category) {
            return NextResponse.json({ message: "Resource category not found" }, { status: 404 });
        }

        return NextResponse.json(category);
    } catch (error) {
        console.error("Error fetching resource category:", error);
        return NextResponse.json({ message: "Error fetching resource category" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        const body = await request.json();
        const { name, description } = body;

        if (!name) {
            return NextResponse.json({ message: "Name is required" }, { status: 400 });
        }

        const newSlug = generateSlug(name);

        if (newSlug !== slug) {
            const existing = await db.resourceCategory.findUnique({ where: { slug: newSlug } });
            if (existing) {
                return NextResponse.json({ message: "Resource category with this new name already exists" }, { status: 409 });
            }
        }

        const updatedCategory = await db.resourceCategory.update({
            where: { slug },
            data: {
                name,
                slug: newSlug,
                description,
            },
        });

        return NextResponse.json(updatedCategory);
    } catch (error) {
        console.error("Error updating resource category:", error);
        return NextResponse.json({ message: "Error updating resource category" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;

        // Check if there are any resources associated with this category
        const associatedResources = await db.resource.count({ where: { category: { slug } } });
        if (associatedResources > 0) {
            return NextResponse.json({ message: "Cannot delete category with associated resources" }, { status: 409 });
        }

        await db.resourceCategory.delete({ where: { slug } });
        return NextResponse.json({ message: "Resource category deleted successfully" });
    } catch (error) {
        console.error("Error deleting resource category:", error);
        return NextResponse.json({ message: "Error deleting resource category" }, { status: 500 });
    }
}