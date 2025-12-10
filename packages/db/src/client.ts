import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

let db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (db) return db;

  // Always use local SQLite database
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const dbPath = join(__dirname, "..", "local.db");
  const url = `file:${dbPath}`;

  const client = createClient({
    url,
  });

  db = drizzle(client, { schema });

  return db;
}

export const database = getDb();