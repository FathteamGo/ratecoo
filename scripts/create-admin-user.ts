import { database } from "../packages/db/src/client";
import { users } from "../packages/db/src/schema";

async function createAdminUser() {
  try {
    const adminUser = await database.insert(users).values({
      name: "Admin User",
      email: "admin@example.com",
      password: "password", // In a real app, this should be hashed
      tier: "pro",
      role: "admin",
    }).returning();
    
    console.log("Admin user created successfully:", adminUser[0]);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

createAdminUser();