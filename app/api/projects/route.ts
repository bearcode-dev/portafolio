import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";

// Helper function to generate a slug from a title
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export async function GET(request: NextRequest) {
    try {
        const projects = await db.project.findMany({
            include: {
                tools: true,
            },
        });
        return NextResponse.json(projects);
    } catch (error) {
        console.error("ERROR fetching projects:", error);
        return NextResponse.json({
            error,
            message: 'Failed to fetch projects'
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, content, coverImage, githubUrl, liveUrl, category, technologies, publishedAt } = body;

        if (!title || !description || !content || !coverImage || !category || !technologies || !publishedAt) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const slug = generateSlug(title);

        // Check if a project with the same slug already exists
        const existingProject = await db.project.findUnique({
            where: { slug },
        });

        if (existingProject) {
            return NextResponse.json({ message: 'Project with this title already exists' }, { status: 409 });
        }

        const newProject = await db.project.create({
            data: {
                title,
                slug,
                description,
                content,
                coverImage,
                githubUrl,
                liveUrl,
                category,
                technologies,
                publishedAt: new Date(publishedAt),
            },
        });

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        console.error("ERROR creating project:", error);
        return NextResponse.json({
            error,
            message: 'Failed to create project'
        }, { status: 500 });
    }
}