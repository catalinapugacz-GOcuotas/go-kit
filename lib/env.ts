export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.startsWith("REEMPLAZAR")) {
    throw new Error(`Falta la variable ${name} — ver .env.example y SETUP.md`);
  }
  return value;
}
