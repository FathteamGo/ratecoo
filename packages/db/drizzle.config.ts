import { defineConfig } from "drizzle-kit";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: isProduction 
      ? process.env.TURSO_DATABASE_URL || ""
      : "file:local.db",
    authToken: isProduction ? process.env.TURSO_AUTH_TOKEN : undefined,
  },
});
