import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/db";

// Helper function to generate a slug from a title
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        const resource = await db.resource.findUnique({
            where: { slug },
            include: {
                category: true,
            },
        });

        if (!resource) {
            return NextResponse.json({ message: 'Resource not found' }, { status: 404 });
        }

        return NextResponse.json(resource);
    } catch (error) {
        console.error("ERROR fetching resource:", error);
        return NextResponse.json({
            error,
            message: 'Failed to fetch resource'
        }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        const body = await request.json();
        const { title, description, content, coverImage, link, type, categoryId, tags, author, publishedAt, readTimeMinutes } = body;

        if (!title || !description || !content || !coverImage || !type || !categoryId || !tags || !author || !publishedAt) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const newSlug = generateSlug(title);

        // Check if the new slug already exists for another resource
        if (newSlug !== slug) {
            const existingResourceWithNewSlug = await db.resource.findUnique({
                where: { slug: newSlug },
            });
            if (existingResourceWithNewSlug) {
                return NextResponse.json({ message: 'Resource with this new title already exists' }, { status: 409 });
            }
        }

        const updatedResource = await db.resource.update({
            where: { slug },
            data: {
                title,
                slug: newSlug,
                description,
                content,
                coverImage,
                link,
                type,
                categoryId,
                tags,
                author,
                publishedAt: new Date(publishedAt),
                readTimeMinutes: readTimeMinutes ? parseInt(readTimeMinutes) : undefined,
            },
        });

        return NextResponse.json(updatedResource);
    } catch (error) {
        console.error("ERROR updating resource:", error);
        return NextResponse.json({
            error,
            message: 'Failed to update resource'
        }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        await db.resource.delete({
            where: { slug },
        });
        return NextResponse.json({ message: 'Resource deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error("ERROR deleting resource:", error);
        return NextResponse.json({
            error,
            message: 'Failed to delete resource'
        }, { status: 500 });
    }
}