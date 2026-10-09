import { loadEnvConfig } from "@next/env"
import { defineConfig } from "drizzle-kit"

// Load .env.local the same way `next dev` does.
loadEnvConfig(process.cwd())

const url = process.env.DATABASE_URL_UNPOOLED
if (!url) throw new Error("DATABASE_URL_UNPOOLED is not set")

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  // Direct (non-pooled) connection: schema pushes need session state that
  // PgBouncer's transaction mode doesn't provide.
  dbCredentials: { url },
  strict: true,
  verbose: true,
})
