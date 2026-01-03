import { NextRequest, NextResponse } from "next/server";
import { PaymentService } from "@ratecoo/db/payment-service";
import { database } from "@ratecoo/db/client";
import { users } from "@ratecoo/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "@/lib/auth-utils";

export async function POST(request: NextRequest) {
  try {
    // Get session to verify user is authenticated
    const session = await requireAuth();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find user in database
    const dbUsers = await database
      .select()
      .from(users)
      .where(eq(users.email, session.user.email!));

    if (dbUsers.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user = dbUsers[0];
    
    // Check if user is already Pro
    if (user.tier === "pro") {
      return NextResponse.json(
        { error: "User is already on Pro tier" },
        { status: 400 }
      );
    }

    // Create payment transaction
    const paymentService = PaymentService.getInstance();
    const transaction = await paymentService.createTransaction(user.id);

    return NextResponse.json({
      success: true,
      transaction,
    });
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