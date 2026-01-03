import { NextRequest, NextResponse } from "next/server";
import { PaymentService } from "@ratecoo/db/payment-service";

export async function POST(request: NextRequest) {
  try {
    // In a real implementation, Midtrans would send a notification to this endpoint
    // The request body would contain transaction details
    const body = await request.json();
    
    console.log("Payment notification received:", body);
    
    const { transaction_id, status_code, transaction_status, fraud_status, user_id } = body;
    
    const paymentService = PaymentService.getInstance();
    
    // Handle different transaction statuses
    if (transaction_status === "capture" || transaction_status === "settlement") {
      // Successful payment
      const result = await paymentService.handlePaymentSuccess(user_id, transaction_id);
      console.log("Payment success processed:", result);
    } else if (transaction_status === "cancel" || transaction_status === "deny" || transaction_status === "expire") {
      // Failed payment
      const result = await paymentService.handlePaymentFailure(user_id, transaction_id);
      console.log("Payment failure processed:", result);
    } else {
      console.log(`Unhandled transaction status: ${transaction_status}`);
    }
    
    // Return 200 OK to acknowledge the notification
    return NextResponse.json({ 
      status: "OK",
      message: "Notification received"
    });
  } catch (error) {
    console.error("Payment callback error:", error);
    return NextResponse.json(
      { error: "Failed to process payment callback" },
      { status: 500 }
    );
  }
}

// Handle Midtrans GET verification (sometimes used for validation)
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const orderId = url.searchParams.get("order_id");
    
    // In a real implementation, you might verify the transaction status
    // based on the order_id parameter
    
    return NextResponse.json({ 
      order_id: orderId,
      status: "verified" 
    });
  } catch (error) {
    console.error("Payment callback GET error:", error);
    return NextResponse.json(
      { error: "Failed to process payment callback" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}