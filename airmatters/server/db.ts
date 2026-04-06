import pkg from 'pg';
const { Pool } = pkg;
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "../shared/schema.js";
import { config } from "dotenv";

config();

// SECURITY NOTE: It is unsafe to commit secrets to version control.
// If you must hardcode for debugging, do not commit this file.
const MANUAL_CONNECTION_STRING = "postgresql://neondb_owner:npg_1lDkTsO6dEcR@ep-super-shape-ahtilgy7.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || MANUAL_CONNECTION_STRING;

console.log("Using Database Connection String (redacted):", connectionString?.replace(/:([^@]+)@/, ':****@'));

if (!connectionString) {
  console.warn("Database connection string missing. DB operations will fail.");
}

const pool = new Pool({ 
  connectionString,
  connectionTimeoutMillis: 5000,
  ssl: {
    rejectUnauthorized: false
  }
});

export const db = connectionString ? drizzle(pool, { schema }) : null as any;

