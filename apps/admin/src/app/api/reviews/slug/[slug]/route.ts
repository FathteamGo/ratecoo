import { NextRequest, NextResponse } from "next/server";
import { database } from "@ratecoo/db/client";
import { reviews, projects } from "@ratecoo/db/schema";
import { CreateReviewSchema } from "@ratecoo/db/validators";
import { eq } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Resolve the params promise
    const resolvedParams = await params;
    
    // First, find the project by slug to get its ID
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
    
    // Parse and validate the review data
    const body = await request.json();
    
    const validated = CreateReviewSchema.parse({
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_whatsapp: body.customer_whatsapp,
      rating: body.rating,
      comment: body.comment,
    });

    // Create the review with the project ID
    const newReview = await database.insert(reviews).values({
      project_id: project.id,
      customer_name: validated.customer_name,
      customer_email: validated.customer_email,
      customer_whatsapp: validated.customer_whatsapp,
      rating: validated.rating,
      comment: validated.comment,
      source: body.source || "widget",
      status: "pending",
    }).returning();

    return NextResponse.json(
      { id: newReview[0].id, status: newReview[0].status },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Review creation error:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 400 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}