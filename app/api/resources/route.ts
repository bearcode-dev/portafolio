import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";

// Helper function to generate a slug from a title
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('categoryId');
        const tags = searchParams.get('tags')?.split(',');
        const type = searchParams.get('type');

        const where: any = {};
        if (categoryId) {
            where.categoryId = categoryId;
        }
        if (tags && tags.length > 0) {
            where.tags = { hasEvery: tags };
        }
        if (type) {
            where.type = type;
        }

        const resources = await db.resource.findMany({
            where,
            include: {
                category: true, // Include category details
            },
        });
        return NextResponse.json(resources);
    } catch (error) {
        console.error("ERROR fetching resources:", error);
        return NextResponse.json({
            error,
            message: 'Failed to fetch resources'
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, content, coverImage, link, type, categoryId, tags, author, publishedAt, readTimeMinutes } = body;

        if (!title || !description || !content || !coverImage || !type || !categoryId || !tags || !author || !publishedAt) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const slug = generateSlug(title);

        // Check if a resource with the same slug already exists
        const existingResource = await db.resource.findUnique({
            where: { slug },
        });

        if (existingResource) {
            return NextResponse.json({ message: 'Resource with this title already exists' }, { status: 409 });
        }

        const newResource = await db.resource.create({
            data: {
                title,
                slug,
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

        return NextResponse.json(newResource, { status: 201 });
    } catch (error) {
        console.error("ERROR creating resource:", error);
        return NextResponse.json({
            error,
            message: 'Failed to create resource'
        }, { status: 500 });
    }
}