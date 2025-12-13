"use server";

import { database } from "@ratecoo/db/client";
import { projects } from "@ratecoo/db/schema";
import { eq } from "drizzle-orm";

const PLAN_LIMITS = {
  free: 1,
  pro: 5,
};

function cuid() {
  return "id_" + Math.random().toString(36).slice(2, 12);
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createProject(
  userId: string,
  name: string,
  slug: string,
  tier: "free" | "pro"
) {
  try {
    const cleanName = (name ?? "").trim();
    const cleanSlug = slugify(slug || name);

    if (!cleanName || !cleanSlug) {
      return { success: false, error: "Invalid name/slug" };
    }

    const userProjects = await database
      .select()
      .from(projects)
      .where(eq((projects as any).userId ?? (projects as any).user_id, userId));

    const limit = PLAN_LIMITS[tier];
    if (userProjects.length >= limit) {
      return {
        success: false,
        error: `You can only have ${limit} project(s) on your plan`,
      };
    }

    const id = cuid();

    await database.insert(projects).values({
      id,
      userId,
      name: cleanName,
      slug: cleanSlug,
      settings: {
        color: "#3B82F6",
        show_branding: tier === "free",
        auto_approve_status: "pending",
      } as any,
      apiKey: tier === "pro" ? cuid() : null,
    } as any);

    return { success: true, projectId: id };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create project" };
  }
}
