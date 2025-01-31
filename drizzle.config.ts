import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env.local' });

export default defineConfig({
  schema: "./utils/schema.ts", 
  out: "./migrations",          
  dialect: "postgresql",        
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIGGLE_DB_URL!, 
  },
});
