import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { generateSlug } from "@/lib/slug-util";

export async function GET(request: NextRequest) {
  try {
    const categories = await db.skillCategory.findMany({
      include: {
        skills: {
          orderBy: { order: "asc" }
        }
      },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("ERROR fetching skill categories:", error);
    return NextResponse.json({ error, message: 'Failed to fetch skill categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, icon, color, order } = body;

    if (!name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    const slug = generateSlug(name);
    const existingCategory = await db.skillCategory.findUnique({ where: { slug } });
    if (existingCategory) {
      return NextResponse.json({ message: 'Category with this name already exists' }, { status: 409 });
    }

    const newCategory = await db.skillCategory.create({
      data: {
        name,
        slug,
        description: description || null,
        icon: icon || null,
        color: color || null,
        order: order || 0,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("ERROR creating skill category:", error);
    return NextResponse.json({ error, message: 'Failed to create skill category' }, { status: 500 });
  }
}
