import { NextRequest, NextResponse } from "next/server";
import { database } from "@ratecoo/db/client";
import { projects, users } from "@ratecoo/db/schema";
import { CreateProjectSchema } from "@ratecoo/db/validators";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const allProjects = await database.select({
      id: projects.id,
      user_id: projects.user_id,
      name: projects.name,
      slug: projects.slug,
      api_key: projects.api_key,
      created_at: projects.created_at,
      user_name: users.name,
      user_email: users.email,
    })
    .from(projects)
    .leftJoin(users, eq(projects.user_id, users.id))
    .orderBy(desc(projects.created_at));

    return NextResponse.json(allProjects, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validated = CreateProjectSchema.parse({
      name: body.name,
      slug: body.slug,
    });

    const existingProject = await database.select()
      .from(projects)
      .where(eq(projects.slug, validated.slug));

    if (existingProject.length > 0) {
      return NextResponse.json(
        { error: "Project with this slug already exists" },
        { status: 400 }
      );
    }

    const apiKey = "rk_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const newProject = await database.insert(projects).values({
      user_id: body.user_id,
      name: validated.name,
      slug: validated.slug,
      api_key: apiKey,
    }).returning();

    return NextResponse.json(newProject[0], {
      status: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Project creation error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const updatedProject = await database.update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();

    if (updatedProject.length === 0) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject[0], {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Project update error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const deletedProject = await database.delete(projects)
      .where(eq(projects.id, id))
      .returning();

    if (deletedProject.length === 0) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Project deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}