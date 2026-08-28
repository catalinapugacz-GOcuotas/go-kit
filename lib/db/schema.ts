import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

// Espejo de supabase/migrations/00000000000001_profiles.sql — no crear tablas
// nuevas acá sin su UP (drizzle-kit generate) + DOWN a mano en el mismo commit.
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
