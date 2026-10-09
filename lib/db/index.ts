import { parseEnv } from "@neon/env"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import neonConfig from "@/neon"

import * as schema from "./schema"

// Pooled connection string (PgBouncer) for app traffic; `db:push` uses the
// direct URL via drizzle.config.ts.
const { postgres } = parseEnv(neonConfig, ["DATABASE_URL"])

// Reuse one pool across hot reloads in development.
const globalForDb = globalThis as unknown as { pgPool?: Pool }

const pool =
  globalForDb.pgPool ?? new Pool({ connectionString: postgres.databaseUrl })

if (process.env.NODE_ENV !== "production") globalForDb.pgPool = pool

export const db = drizzle({ client: pool, schema })
