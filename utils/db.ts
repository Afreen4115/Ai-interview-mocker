import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load environment variables from .env.local
config({ path: ".env.local" });

const dbUrl = process.env.NEXT_PUBLIC_DRIGGLE_DB_URL;

if (!dbUrl) {
  throw new Error('NEXT_PUBLIC_DRIGGLE_DB_URL is not defined in .env.local');
}

// Initialize the Neon SQL client
const sqlClient = neon(dbUrl);

// Check if the client is initialized correctly
if (!sqlClient) {
  throw new Error("Failed to create Neon SQL client");
}

// Initialize Drizzle ORM with the SQL client
export const db = drizzle(sqlClient);
