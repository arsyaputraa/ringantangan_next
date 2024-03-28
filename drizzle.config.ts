import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./lib/db/schema/*",
  out: "./lib/db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
});
