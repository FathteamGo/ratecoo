import { NextRequest, NextResponse } from "next/server";
import { database } from "@ratecoo/db/client";
import { users } from "@ratecoo/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if user with this email already exists
    const existingUser = await database.select()
      .from(users)
      .where(eq(users.email, body.email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Insert user to database
    const newUser = await database.insert(users).values({
      name: body.name,
      email: body.email,
      password: body.password, // In a real app, this should be hashed
      tier: "free",
    }).returning();

    // Remove password from response for security
    const { password, ...userWithoutPassword } = newUser[0];

    return NextResponse.json(userWithoutPassword, {
      status: 201,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
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