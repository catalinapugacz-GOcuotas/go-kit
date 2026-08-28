import { readFileSync, readdirSync, existsSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { join } from "node:path";
import postgres from "postgres";
import { requireEnv } from "../lib/env";

const DRIZZLE_DIR = join(process.cwd(), "drizzle");

// tsx (a diferencia de Next.js) no carga .env.local solo.
if (existsSync(".env.local")) process.loadEnvFile(".env.local");

async function confirm(question: string): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(question);
  rl.close();
  return answer.trim().toLowerCase() === "yes";
}

// Última migración aplicada: journal de drizzle-kit si existe, si no
// (solo la base de Supabase) el .down.sql de mayor índice en drizzle/.
function lastDownFile(): { tag: string; path: string } {
  const journalPath = join(DRIZZLE_DIR, "meta", "_journal.json");
  if (existsSync(journalPath)) {
    const journal = JSON.parse(readFileSync(journalPath, "utf8"));
    const last = journal.entries.at(-1);
    if (!last) throw new Error("drizzle/meta/_journal.json no tiene entries.");
    return { tag: last.tag, path: join(DRIZZLE_DIR, `${last.tag}.down.sql`) };
  }
  const downs = readdirSync(DRIZZLE_DIR).filter((f) => f.endsWith(".down.sql")).sort();
  const last = downs.at(-1);
  if (!last) throw new Error("No hay ningún *.down.sql en drizzle/.");
  return { tag: last.replace(".down.sql", ""), path: join(DRIZZLE_DIR, last) };
}

async function main() {
  const url = requireEnv("DATABASE_URL");
  if (!/localhost|127\.0\.0\.1/.test(url)) {
    const ok = await confirm(`DATABASE_URL no es local (${url}). Escribí "yes" para confirmar el rollback: `);
    if (!ok) {
      console.log("Rollback cancelado.");
      process.exit(1);
    }
  }

  const { tag, path } = lastDownFile();
  const downSql = readFileSync(path, "utf8");
  const sql = postgres(url);

  try {
    await sql.begin(async (tx) => {
      await tx.unsafe(downSql);
      // Borra la última fila del journal de drizzle-kit en DB, si la tabla existe
      // (no aplica todavía: la migración base la aplicó Supabase, no drizzle-kit migrate).
      // Una transacción de Postgres aborta ante cualquier error, así que se chequea
      // la existencia en vez de confiar en un catch.
      const [{ reg }] = await tx`select to_regclass('drizzle.__drizzle_migrations') as reg`;
      if (reg) {
        await tx`delete from drizzle.__drizzle_migrations where created_at = (select max(created_at) from drizzle.__drizzle_migrations)`;
      }
    });
    console.log(`Rollback aplicado: ${tag} (${path})`);
  } finally {
    await sql.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
