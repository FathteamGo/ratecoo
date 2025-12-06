"use server";

import { database } from "@ratecoo/db";
import { projects } from "@ratecoo/db/schema";
import { eq } from "drizzle-orm";

const PLAN_LIMITS = {
  free: 1,
  pro: 5,
};

export async function createProject(
  userId: string,
  name: string,
  slug: string,
  tier: "free" | "pro"
) {
  try {
    // Check plan limits
    const userProjects = await database
      .select()
      .from(projects)
      .where(eq(projects.user_id, userId));

    const limit = PLAN_LIMITS[tier];
    if (userProjects.length >= limit) {
      return {
        success: false,
        error: `You can only have ${limit} project(s) on your plan`,
      };
    }

    // Create project
    const newProject = {
      user_id: userId,
      name,
      slug,
      settings: {
        color: "#3B82F6",
        show_branding: tier === "free",
        auto_approve_status: "pending",
      },
    };

    // TODO: Insert into database
    return {
      success: true,
      projectId: "new-project-id",
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to create project",
    };
  }
}
