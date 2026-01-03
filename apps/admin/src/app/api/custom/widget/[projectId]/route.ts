import { NextRequest, NextResponse } from "next/server";
import { database } from "@ratecoo/db/client";
import { projects, users } from "@ratecoo/db/schema";
import { eq, and } from "drizzle-orm";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) => {
  try {
    // Resolve the params promise
    const resolvedParams = await params;
    
    // Fetch project and associated user from database
    const projectResult = await database
      .select({
        id: projects.id,
        name: projects.name,
        settings: projects.settings,
        user_id: projects.user_id,
        user_tier: users.tier,
      })
      .from(projects)
      .leftJoin(users, eq(projects.user_id, users.id))
      .where(eq(projects.id, resolvedParams.projectId));

    if (projectResult.length === 0) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const project = projectResult[0];
    
    // Apply branding rules based on user tier
    const showBranding = project.user_tier === "free";
    
    // Return project with branding settings
    const projectWithSettings = {
      id: project.id,
      name: project.name,
      settings: {
        color: project.settings?.color || "#3B82F6",
        show_branding: showBranding,
        auto_approve_status: project.settings?.auto_approve_status || "pending",
      },
    };

    return NextResponse.json(projectWithSettings, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error fetching widget configuration:", error);
    return NextResponse.json(
      { error: "Failed to fetch widget configuration" },
      { status: 500 }
    );
  }
};

export const OPTIONS = async () => {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};