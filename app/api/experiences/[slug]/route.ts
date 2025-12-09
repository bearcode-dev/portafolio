import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/db";
import { generateSlug } from "@/lib/slug-util";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const experience = await db.experience.findUnique({ where: { slug } });

    if (!experience) {
      return NextResponse.json({ message: 'Experience not found' }, { status: 404 });
    }

    return NextResponse.json(experience);
  } catch (error) {
    console.error("ERROR fetching experience:", error);
    return NextResponse.json({ error, message: 'Failed to fetch experience' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { title, company, description, startDate, endDate, technologies } = body;

    if (!title || !company || !description || !startDate || !technologies) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newSlug = generateSlug(`${title}-${company}`);
    if (newSlug !== slug) {
      const existingExperienceWithNewSlug = await db.experience.findUnique({ where: { slug: newSlug } });
      if (existingExperienceWithNewSlug) {
        return NextResponse.json({ message: 'Experience with this new title and company already exists' }, { status: 409 });
      }
    }

    const updatedExperience = await db.experience.update({
      where: { slug },
      data: {
        title,
        slug: newSlug,
        company,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        technologies: technologies.split(', ').map((tech: string) => tech.trim()),
      },
    });

    return NextResponse.json(updatedExperience);
  } catch (error) {
    console.error("ERROR updating experience:", error);
    return NextResponse.json({ error, message: 'Failed to update experience' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    await db.experience.delete({ where: { slug } });
    return NextResponse.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error("ERROR deleting experience:", error);
    return NextResponse.json({ error, message: 'Failed to delete experience' }, { status: 500 });
  }
}
