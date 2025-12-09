import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { generateSlug } from "@/lib/slug-util";

export async function GET(request: NextRequest) {
  try {
    const categories = await db.resourceCategory.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("ERROR fetching categories:", error);
    return NextResponse.json({ error, message: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const slug = generateSlug(name);
    const existingCategory = await db.resourceCategory.findUnique({ where: { slug } });
    if (existingCategory) {
      return NextResponse.json({ message: 'Category with this name already exists' }, { status: 409 });
    }

    const newCategory = await db.resourceCategory.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("ERROR creating category:", error);
    return NextResponse.json({ error, message: 'Failed to create category' }, { status: 500 });
  }
}
