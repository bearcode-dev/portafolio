import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { generateSlug } from "@/lib/slug-util";

export async function GET(request: NextRequest) {
  try {
    const skills = await db.skill.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error("ERROR fetching skills:", error);
    return NextResponse.json({ error, message: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, proficiency } = body;

    if (!name || !category || !proficiency) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const slug = generateSlug(`${name}-${category}`);
    const existingSkill = await db.skill.findUnique({ where: { slug } });
    if (existingSkill) {
      return NextResponse.json({ message: 'Skill with this name and category already exists' }, { status: 409 });
    }

    const newSkill = await db.skill.create({
      data: {
        name,
        slug,
        category,
        proficiency,
      },
    });

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    console.error("ERROR creating skill:", error);
    return NextResponse.json({ error, message: 'Failed to create skill' }, { status: 500 });
  }
}
