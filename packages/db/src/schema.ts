import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

function generateId(): string {
  return "id_" + Math.random().toString(36).substr(2, 9);
}

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => generateId()),
  name: text("name"),
  email: text("email").unique().notNull(),
  image: text("image"),
  password: text("password"),
  tier: text("tier", { enum: ["free", "pro"] }).notNull().default("free"),
  created_at: text("created_at")
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  updated_at: text("updated_at")
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey().$defaultFn(() => generateId()),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  settings: text("settings", { mode: "json" }).$type<{
    color: string;
    show_branding: boolean;
    auto_approve_status: "pending" | "approved";
  }>(),
  api_key: text("api_key").unique(),
  created_at: text("created_at")
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  updated_at: text("updated_at")
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});

export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey().$defaultFn(() => generateId()),
  project_id: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  customer_name: text("customer_name").notNull(),
  customer_email: text("customer_email"),
  customer_whatsapp: text("customer_whatsapp"),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  source: text("source", { enum: ["widget", "import"] }).notNull().default("widget"),
  status: text("status", { enum: ["pending", "approved", "rejected"] })
    .notNull()
    .default("pending"),
  is_featured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  created_at: text("created_at")
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  updated_at: text("updated_at")
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;
