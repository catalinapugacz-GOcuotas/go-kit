import { describe, expect, it } from "vitest";

// Test permanente: si DATABASE_URL apunta a algo remoto, esto debe fallar.
// El guard real vive en vitest.setup.ts (corre antes que cualquier test);
// este test re-asserta el mismo invariante para que quede documentado y
// se rompa explícitamente si alguien lo saca del setup.
describe("aislamiento test-vs-prod", () => {
  it("DATABASE_URL, si está definida, apunta a la DB local", () => {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) return;
    expect(dbUrl).toMatch(/localhost|127\.0\.0\.1/);
  });
});
