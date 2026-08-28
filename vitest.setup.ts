// Defensa test-vs-prod — ver CLAUDE.md §Testing y verificación.
// Si DATABASE_URL apunta a algo que no sea la DB local, abortar antes de correr nada.
const dbUrl = process.env.DATABASE_URL;
if (dbUrl && !/localhost|127\.0\.0\.1/.test(dbUrl)) {
  throw new Error("Tests solo contra DB local — ver CLAUDE.md §Testing y verificación");
}
