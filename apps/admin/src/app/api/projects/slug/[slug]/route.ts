import { NextRequest, NextResponse } from "next/server";
import { database } from "@ratecoo/db/client";
import { projects } from "@ratecoo/db/schema";
import { eq } from "drizzle-orm";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  try {
    // Resolve the params promise
    const resolvedParams = await params;
    
    // Fetch project by slug
    const projectResult = await database.select()
      .from(projects)
      .where(eq(projects.slug, resolvedParams.slug));

    if (projectResult.length === 0) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const project = projectResult[0];

    // Apply branding rules based on user tier (simplified for now)
    // In a full implementation, you would join with the users table to check tier
    const projectWithSettings = {
      ...project,
      settings: {
        color: project.settings?.color || "#3B82F6",
        show_branding: project.settings?.show_branding !== undefined 
          ? project.settings.show_branding 
          : true, // Default to showing branding
        auto_approve_status: project.settings?.auto_approve_status || "pending",
      }
    };

    return NextResponse.json(projectWithSettings, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
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