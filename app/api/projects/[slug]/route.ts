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
        const project = await db.project.findUnique({
            where: { slug },
            include: {
                tools: true,
            },
        });

        if (!project) {
            return NextResponse.json({ message: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error("ERROR fetching project:", error);
        return NextResponse.json({
            error,
            message: 'Failed to fetch project'
        }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        const body = await request.json();
        const { title, description, content, coverImage, githubUrl, liveUrl, category, technologies, publishedAt } = body;

        if (!title || !description || !content || !coverImage || !category || !technologies || !publishedAt) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const newSlug = generateSlug(title);

        // Check if the new slug already exists for another project
        if (newSlug !== slug) {
            const existingProjectWithNewSlug = await db.project.findUnique({
                where: { slug: newSlug },
            });
            if (existingProjectWithNewSlug) {
                return NextResponse.json({ message: 'Project with this new title already exists' }, { status: 409 });
            }
        }

        const updatedProject = await db.project.update({
            where: { slug },
            data: {
                title,
                slug: newSlug,
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

        return NextResponse.json(updatedProject);
    } catch (error) {
        console.error("ERROR updating project:", error);
        return NextResponse.json({
            error,
            message: 'Failed to update project'
        }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        await db.project.delete({
            where: { slug },
        });
        return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error("ERROR deleting project:", error);
        return NextResponse.json({
            error,
            message: 'Failed to delete project'
        }, { status: 500 });
    }
}