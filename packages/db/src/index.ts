import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

let db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (db) return db;

  // Always use local SQLite database
  const url = "file:local.db";

  const client = createClient({
    url,
  });

  db = drizzle(client, { schema });

  return db;
}

export const database = getDb();
export * from "./schema";
export * from "./validators";
export * from "./services";
export * from "./payment-service";