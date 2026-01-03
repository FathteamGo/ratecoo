import { NextRequest } from "next/server";
import { database } from "@ratecoo/db/client";
import { projects } from "@ratecoo/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "@/lib/auth-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Require authentication
    const session = await requireAuth();
    const userId = session.user?.id;

    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;

    // Fetch the project for the authenticated user
    const project = await database
      .select({
        id: projects.id,
        name: projects.name,
        slug: projects.slug,
        settings: projects.settings,
        api_key: projects.api_key,
        created_at: projects.created_at,
        updated_at: projects.updated_at,
        user_id: projects.user_id,
      })
      .from(projects)
      .where(
        eq(projects.id, id)
      )
      .limit(1);

    if (project.length === 0 || project[0].user_id !== userId) {
      return Response.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return Response.json(project[0]);
  } catch (error) {
    console.error("Error fetching project:", error);
    return Response.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}