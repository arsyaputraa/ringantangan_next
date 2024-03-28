import { sql } from "@vercel/postgres";
import { drizzle, VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema/";

const db = drizzle(sql, { schema }) as VercelPgDatabase<typeof schema>;

export default db;
