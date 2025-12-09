import { NextRequest, NextResponse } from "next/server";
import db from '../../../../lib/db';
import { generateSlug } from "@/lib/slug-util";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const category = await db.resourceCategory.findUnique({ where: { slug } });

    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("ERROR fetching category:", error);
    return NextResponse.json({ error, message: 'Failed to fetch category' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newSlug = generateSlug(name);
    if (newSlug !== slug) {
      const existingCategoryWithNewSlug = await db.resourceCategory.findUnique({ where: { slug: newSlug } });
      if (existingCategoryWithNewSlug) {
        return NextResponse.json({ message: 'Category with this new name already exists' }, { status: 409 });
      }
    }

    const updatedCategory = await db.resourceCategory.update({
      where: { slug },
      data: {
        name,
        slug: newSlug,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("ERROR updating category:", error);
    return NextResponse.json({ error, message: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    await db.resourceCategory.delete({ where: { slug } });
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error("ERROR deleting category:", error);
    return NextResponse.json({ error, message: 'Failed to delete category' }, { status: 500 });
  }
}
