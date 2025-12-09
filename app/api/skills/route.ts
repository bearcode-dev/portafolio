import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { generateSlug } from "@/lib/slug-util";

export async function GET(request: NextRequest) {
  try {
    const skills = await db.skill.findMany({
      include: {
        category: true,
      },
      orderBy: { order: "asc" },
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
    const { name, categoryId, proficiency, order } = body;

    if (!name || !categoryId || proficiency === undefined) {
      return NextResponse.json({ message: 'Missing required fields (name, categoryId, proficiency)' }, { status: 400 });
    }

    // Verify category exists
    const category = await db.skillCategory.findUnique({ where: { id: categoryId } });
    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    const slug = generateSlug(name);
    const existingSkill = await db.skill.findUnique({ where: { slug } });
    if (existingSkill) {
      return NextResponse.json({ message: 'Skill with this name already exists' }, { status: 409 });
    }

    const newSkill = await db.skill.create({
      data: {
        name,
        slug,
        categoryId,
        proficiency: Number(proficiency),
        order: order || 0,
      },
      include: {
        category: true,
      }
    });

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    console.error("ERROR creating skill:", error);
    return NextResponse.json({ error, message: 'Failed to create skill' }, { status: 500 });
  }
}
