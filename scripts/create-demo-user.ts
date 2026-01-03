import { database } from "../packages/db/src/client";
import { users } from "../packages/db/src/schema";

async function createDemoUser() {
  try {
    const demoUser = await database.insert(users).values({
      name: "Demo User",
      email: "demo@example.com",
      password: "password", // In a real app, this should be hashed
      tier: "free",
      role: "user", // Regular user, not admin
    }).returning();
    
    console.log("Demo user created successfully:", demoUser[0]);
  } catch (error) {
    console.error("Error creating demo user:", error);
  }
}

createDemoUser();