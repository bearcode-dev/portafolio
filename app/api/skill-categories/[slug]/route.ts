import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/db";
import { generateSlug } from "@/lib/slug-util";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const category = await db.skillCategory.findUnique({
      where: { slug },
      include: {
        skills: {
          orderBy: { order: "asc" }
        }
      }
    });

    if (!category) {
      return NextResponse.json({ message: 'Skill category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("ERROR fetching skill category:", error);
    return NextResponse.json({ error, message: 'Failed to fetch skill category' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { name, description, icon, color, order } = body;

    if (!name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    const newSlug = generateSlug(name);
    if (newSlug !== slug) {
      const existingCategoryWithNewSlug = await db.skillCategory.findUnique({ where: { slug: newSlug } });
      if (existingCategoryWithNewSlug) {
        return NextResponse.json({ message: 'Category with this new name already exists' }, { status: 409 });
      }
    }

    const updatedCategory = await db.skillCategory.update({
      where: { slug },
      data: {
        name,
        slug: newSlug,
        description: description || null,
        icon: icon || null,
        color: color || null,
        order: order || 0,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("ERROR updating skill category:", error);
    return NextResponse.json({ error, message: 'Failed to update skill category' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;

    // Check if category has skills
    const category = await db.skillCategory.findUnique({
      where: { slug },
      include: { skills: true }
    });

    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    if (category.skills.length > 0) {
      return NextResponse.json({
        message: 'Cannot delete category with existing skills. Please delete or reassign the skills first.'
      }, { status: 400 });
    }

    await db.skillCategory.delete({ where: { slug } });
    return NextResponse.json({ message: 'Skill category deleted successfully' });
  } catch (error) {
    console.error("ERROR deleting skill category:", error);
    return NextResponse.json({ error, message: 'Failed to delete skill category' }, { status: 500 });
  }
}
