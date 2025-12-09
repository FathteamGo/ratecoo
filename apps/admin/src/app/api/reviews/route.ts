import { NextRequest, NextResponse } from "next/server";
import { database } from "@ratecoo/db/client";
import { reviews, projects } from "@ratecoo/db/schema";
import { CreateReviewSchema } from "@ratecoo/db/validators";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const allReviews = await database.select({
      id: reviews.id,
      project_id: reviews.project_id,
      customer_name: reviews.customer_name,
      customer_whatsapp: reviews.customer_whatsapp,
      rating: reviews.rating,
      comment: reviews.comment,
      source: reviews.source,
      status: reviews.status,
      is_featured: reviews.is_featured,
      created_at: reviews.created_at,
      project_name: projects.name,
    })
    .from(reviews)
    .leftJoin(projects, eq(reviews.project_id, projects.id))
    .orderBy(desc(reviews.created_at));

    return NextResponse.json(allReviews, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validated = CreateReviewSchema.parse({
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_whatsapp: body.customer_whatsapp,
      rating: body.rating,
      comment: body.comment,
    });

    const newReview = await database.insert(reviews).values({
      project_id: body.project_id,
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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    const updatedReview = await database.update(reviews)
      .set(updateData)
      .where(eq(reviews.id, id))
      .returning();

    if (updatedReview.length === 0) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedReview[0], {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Review update error:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
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
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    const deletedReview = await database.delete(reviews)
      .where(eq(reviews.id, id))
      .returning();

    if (deletedReview.length === 0) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Review deleted successfully" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Review deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
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