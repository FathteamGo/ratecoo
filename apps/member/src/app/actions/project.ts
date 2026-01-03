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
      .where(eq(projects.user_id, userId));

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

export async function getUserProjects(userId: string) {
  try {
    const userProjects = await database
      .select({
        id: projects.id,
        name: projects.name,
        slug: projects.slug,
        created_at: projects.created_at,
        settings: projects.settings,
        api_key: projects.api_key,
      })
      .from(projects)
      .where(eq(projects.user_id, userId));

    // Map to consistent format
    const mappedProjects = userProjects.map(project => ({
      ...project,
      createdAt: project.created_at,
      apiKey: project.api_key,
    }));

    return { success: true, projects: mappedProjects || [] };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch projects", projects: [] };
  }
}

export async function updateProject(id: string, userId: string, updates: Partial<typeof projects.$inferInsert>) {
  try {
    // First, verify that the user owns this project
    const existingProject = await database
      .select()
      .from(projects)
      .where(
        eq(projects.id, id)
      )
      .limit(1);

    if (existingProject.length === 0 || existingProject[0].user_id !== userId) {
      return { success: false, error: "Project not found or access denied" };
    }

    // Map the updates to match the database schema
    const dbUpdates: Partial<typeof projects.$inferInsert> = { ...updates };
    
    if (dbUpdates.created_at) delete dbUpdates.created_at;
    if (dbUpdates.api_key) delete dbUpdates.api_key; // Prevent updating api_key through this function
    if (dbUpdates.apiKey) {
      dbUpdates.api_key = dbUpdates.apiKey;
      delete dbUpdates.apiKey;
    }
    
    const result = await database
      .update(projects)
      .set(dbUpdates)
      .where(
        eq(projects.id, id)
      );

    return { success: true, projectId: id };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: string, userId: string) {
  try {
    // First, verify that the user owns this project
    const existingProject = await database
      .select()
      .from(projects)
      .where(
        eq(projects.id, id)
      )
      .limit(1);

    if (existingProject.length === 0 || existingProject[0].user_id !== userId) {
      return { success: false, error: "Project not found or access denied" };
    }

    await database
      .delete(projects)
      .where(
        eq(projects.id, id)
      );

    return { success: true, projectId: id };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete project" };
  }
}
