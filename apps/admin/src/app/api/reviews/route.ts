import { NextRequest, NextResponse } from "next/server";
import { database } from "@ratecoo/db/client";
import { reviews } from "@ratecoo/db/schema";
import { CreateReviewSchema } from "@ratecoo/db/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validated = CreateReviewSchema.parse({
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_whatsapp: body.customer_whatsapp,
      rating: body.rating,
      comment: body.comment,
    });

    // Insert review to database
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

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
