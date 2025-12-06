import { defineConfig } from "drizzle-kit";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: isProduction ? "turso" : "better-sqlite",
  dbCredentials: isProduction
    ? {
        url: process.env.TURSO_DATABASE_URL || "",
        authToken: process.env.TURSO_AUTH_TOKEN,
      }
    : {
        url: "file:./local.db",
      },
});
