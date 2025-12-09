import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/db";
import { generateSlug } from "@/lib/slug-util";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const skill = await db.skill.findUnique({ where: { slug } });

    if (!skill) {
      return NextResponse.json({ message: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json(skill);
  } catch (error) {
    console.error("ERROR fetching skill:", error);
    return NextResponse.json({ error, message: 'Failed to fetch skill' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { name, category, proficiency } = body;

    if (!name || !category || !proficiency) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newSlug = generateSlug(`${name}-${category}`);
    if (newSlug !== slug) {
      const existingSkillWithNewSlug = await db.skill.findUnique({ where: { slug: newSlug } });
      if (existingSkillWithNewSlug) {
        return NextResponse.json({ message: 'Skill with this new name and category already exists' }, { status: 409 });
      }
    }

    const updatedSkill = await db.skill.update({
      where: { slug },
      data: {
        name,
        slug: newSlug,
        category,
        proficiency,
      },
    });

    return NextResponse.json(updatedSkill);
  } catch (error) {
    console.error("ERROR updating skill:", error);
    return NextResponse.json({ error, message: 'Failed to update skill' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    await db.skill.delete({ where: { slug } });
    return NextResponse.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error("ERROR deleting skill:", error);
    return NextResponse.json({ error, message: 'Failed to delete skill' }, { status: 500 });
  }
}
