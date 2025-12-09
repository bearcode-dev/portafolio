import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { generateSlug } from "@/lib/slug-util";

export async function GET(request: NextRequest) {
  try {
    const experiences = await db.experience.findMany({
      orderBy: { start: "desc" },
    });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error("ERROR fetching experiences:", error);
    return NextResponse.json({ error, message: 'Failed to fetch experiences' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, company, description, startDate, endDate, technologies } = body;

    if (!title || !company || !description || !startDate || !technologies) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const slug = generateSlug(`${title}-${company}`);
    const existingExperience = await db.experience.findUnique({ where: { slug } });
    if (existingExperience) {
      return NextResponse.json({ message: 'Experience with this title and company already exists' }, { status: 409 });
    }

    const newExperience = await db.experience.create({
      data: {
        title,
        slug,
        company,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        technologies: technologies.split(', ').map((tech: string) => tech.trim()),
      },
    });

    return NextResponse.json(newExperience, { status: 201 });
  } catch (error) {
    console.error("ERROR creating experience:", error);
    return NextResponse.json({ error, message: 'Failed to create experience' }, { status: 500 });
  }
}
