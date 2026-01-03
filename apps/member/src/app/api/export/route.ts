import { NextRequest, NextResponse } from "next/server";
import { database } from "@ratecoo/db/client";
import { users, projects, reviews } from "@ratecoo/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { requireAuth } from "@/lib/auth-utils";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();
    
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "json";
    const projectId = searchParams.get("project_id");

    // Get user's projects
    let projectIds: string[] = [];
    
    if (projectId) {
      // Check if the project belongs to the user
      const userProjects = await database
        .select({ id: projects.id })
        .from(projects)
        .where(and(
          eq(projects.id, projectId),
          eq(projects.user_id, session.user.id!)
        ));
      
      if (userProjects.length === 0) {
        return NextResponse.json(
          { error: "Project not found or access denied" },
          { status: 404 }
        );
      }
      
      projectIds = [projectId];
    } else {
      // Get all projects for the user
      const userProjects = await database
        .select({ id: projects.id })
        .from(projects)
        .where(eq(projects.user_id, session.user.id!));
      
      projectIds = userProjects.map(p => p.id);
    }

    // Get reviews for the projects
    const projectReviews = await database
      .select()
      .from(reviews)
      .where(inArray(reviews.project_id, projectIds));

    if (format === "csv") {
      // Create CSV export
      const csvContent = convertToCSV(projectReviews);
      
      return new Response(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="reviews-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    } else {
      // Default to JSON export
      return NextResponse.json({
        success: true,
        data: projectReviews,
        count: projectReviews.length,
        exported_at: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  }
}

// Helper function to convert reviews to CSV
function convertToCSV(reviews: any[]) {
  if (reviews.length === 0) {
    return "No data to export";
  }

  // Define headers
  const headers = [
    "ID",
    "Customer Name", 
    "Rating", 
    "Comment", 
    "Project ID", 
    "Status", 
    "Featured", 
    "Created At"
  ];

  // Create header row
  let csv = headers.join(",") + "\n";

  // Add data rows
  reviews.forEach(review => {
    const row = [
      `"${review.id.replace(/"/g, '""')}"`,
      `"${review.customer_name.replace(/"/g, '""')}"`,
      review.rating,
      `"${review.comment ? review.comment.replace(/"/g, '""') : ''}"`,
      `"${review.project_id.replace(/"/g, '""')}"`,
      `"${review.status.replace(/"/g, '""')}"`,
      review.is_featured ? "true" : "false",
      `"${review.created_at.replace(/"/g, '""')}"`
    ];
    csv += row.join(",") + "\n";
  });

  return csv;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}