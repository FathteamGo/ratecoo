import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

let db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (db) return db;

  const isProduction = process.env.NODE_ENV === "production";
  let url: string;
  let authToken: string | undefined;

  if (isProduction) {
    // Production: Use Turso
    url = process.env.TURSO_DATABASE_URL;
    authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
      throw new Error("TURSO_DATABASE_URL is not set in production");
    }
  } else {
    // Development: Use local SQLite database
    url = `file:./local.db`;
  }

  const client = createClient({
    url,
    authToken,
  });

  db = drizzle(client, { schema });

  return db;
}

export const database = getDb();
