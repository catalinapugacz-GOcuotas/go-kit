import { afterEach, describe, expect, it, vi } from "vitest";
import { requireEnv } from "@/lib/env";

describe("requireEnv", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("tira si la variable no está definida", () => {
    vi.stubEnv("FOO_VAR", "");
    delete process.env.FOO_VAR;
    expect(() => requireEnv("FOO_VAR")).toThrow(/Falta la variable FOO_VAR/);
  });

  it("tira si el valor es un placeholder REEMPLAZAR_x", () => {
    vi.stubEnv("FOO_VAR", "REEMPLAZAR_con_tu_valor");
    expect(() => requireEnv("FOO_VAR")).toThrow(/Falta la variable FOO_VAR/);
  });

  it("devuelve el valor si está definido y no es placeholder", () => {
    vi.stubEnv("FOO_VAR", "valor-real");
    expect(requireEnv("FOO_VAR")).toBe("valor-real");
  });
});
