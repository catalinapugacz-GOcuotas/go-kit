// Flujo de migraciones (contrato en CLAUDE.md § Migraciones):
//   1. Cambiar lib/db/schema.ts.
//   2. `npm run db:generate` → escribe drizzle/NNNN_slug.sql (el UP).
//   3. Escribir a mano drizzle/NNNN_slug.down.sql en el MISMO commit
//      (ejemplo: drizzle/0000_profiles.down.sql, DOWN de la tabla base
//      `profiles` creada en supabase/migrations/). Usar IF EXISTS en los
//      DROP y comentar los riesgos de pérdida de datos.
//   4. `npm run db:migrate` aplica; `npm run db:rollback` revierte la
//      última migración (scripts/db-rollback.ts).
// Sin DOWN en el mismo commit, la migración no se mergea.
// OJO (primer db:generate): la tabla base `profiles` vive en
// supabase/migrations/, no en el snapshot de drizzle-kit — el primer
// `db:generate` puede emitir un CREATE TABLE profiles espurio. Borrá esa
// sentencia del SQL generado antes de commitear.
import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";
import { requireEnv } from "./lib/env";

// drizzle-kit (a diferencia de Next.js) no carga .env.local solo: se hace acá
// con la API nativa de Node, sin agregar dotenv como dependencia.
if (existsSync(".env.local")) process.loadEnvFile(".env.local");

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: requireEnv("DATABASE_URL"),
  },
});
