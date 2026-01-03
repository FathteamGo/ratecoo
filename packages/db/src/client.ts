import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

let db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (db) return db;

  // Detect if we're in Edge runtime
  const isEdgeRuntime = typeof process !== 'undefined' && process.env?.NEXT_RUNTIME === 'edge';
  
  // In Edge runtime, we can't use direct database access
  if (isEdgeRuntime) {
    throw new Error('Direct database access is not supported in Edge runtime. Use API routes instead.');
  }
  
  // Use environment variables for database configuration
  // In development, use local SQLite file
  // In production, use Turso database
  const isProduction = process.env.NODE_ENV === 'production';
  
  const url = isProduction 
    ? process.env.TURSO_DATABASE_URL || ''
    : process.env.LOCAL_DB_PATH || 'file:../local.db';
    
  const authToken = isProduction 
    ? process.env.TURSO_AUTH_TOKEN
    : undefined;
  
  const client = createClient({
    url,
    authToken,
  });

  db = drizzle(client, { schema });

  return db;
}

export const database = getDb();