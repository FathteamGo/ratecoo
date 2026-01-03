import { NextRequest, NextResponse } from "next/server";
import { PaymentService } from "@ratecoo/db/payment-service";
import { database } from "@ratecoo/db/client";
import { users } from "@ratecoo/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    // This endpoint should not be used directly
    return NextResponse.json(
      { error: "Use the member app payment endpoint" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Payment upgrade error:", error);
    return NextResponse.json(
      { error: "Failed to create payment transaction" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}