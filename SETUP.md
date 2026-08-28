# SETUP

Dos caminos para dejar este template andando. Si sabés lo que es Node y una
terminal, andá directo a **Ruta dev**. Si no, empezá por **Ruta guiada**.

> **Para el agente (Claude):** si el usuario te pide que lo guíes con este
> archivo (ej. *"guiame a correr el @SETUP.md"*), ejecutalo como **wizard**:
> un paso a la vez, en orden. Preguntá las decisiones con opciones (cloud vs
> local, ¿deploy ahora?), corré vos todos los comandos, verificá el resultado
> de cada paso antes de avanzar, y pedile al usuario solo lo que tiene que
> copiar desde un dashboard. Los secretos van directo a `.env.local` —
> guialo a pegarlos ahí, nunca en el chat. Al final corré el smoke y mostrá
> la evidencia.

## Ruta guiada (no técnica)

Asumo que usás la cuenta **Claude Team** de la empresa desde la app de
**Claude Desktop**, y que ya viste el curso de git de la academia — sabés qué
es un repo y qué es clonar; los comandos los ejecuta Claude.

1. **Creá tu repo desde el template**: en
   https://github.com/pamatute/go-kit, botón **"Use this template" →
   "Create a new repository"**, con el nombre de tu proyecto.
2. **Abrí Claude Code en la app de Claude Desktop** (sección **Code**),
   elegí la carpeta donde guardás tus proyectos y pedile en el chat que
   clone tu repo y trabaje ahí. Si a tu máquina le falta algo (Node.js, por
   ejemplo), Claude lo detecta y te guía para instalarlo desde
   [nodejs.org](https://nodejs.org) (versión LTS).
3. **Corré `/prep`** para definir el proyecto (qué es, para quién). Para la
   parte de Supabase y las claves, pedile a Claude en la misma sesión:
   *"guiame a correr el @SETUP.md"* — Claude ejecuta la Ruta dev como wizard
   por vos y te pide solo lo que tenés que copiar desde el dashboard de
   Supabase.

**¿Qué es un archivo `.env`?** Es un archivo de texto local (`.env.local`)
donde van claves y contraseñas que la app necesita para conectarse a
servicios (Supabase, etc.). Vive solo en tu computadora, nunca se sube al
repo (`.gitignore` ya lo excluye) y **nunca se pega en un chat, mensaje o
issue** — son credenciales, no texto para compartir.

**Si `context7` o `time` (los MCP del proyecto) no cargan** al abrir Claude
Code — un prompt de aprobación que no aceptás, o un error de conexión — no
pasa nada, se puede seguir igual: Claude va a pedir links de documentación
explícitos en vez de consultarlos solo, y va a usar la fecha del sistema en
vez del servidor de tiempo.

## Ruta dev (técnica)

### 1. Supabase

Elegí una opción:

**(a) Proyecto cloud:**
1. Creá un proyecto en [supabase.com](https://supabase.com).
2. Copiá **URL**, **anon key** y **service role key** a `.env.local`
   (basado en `.env.example`).
3. Aplicá las migraciones de `supabase/migrations/` con:
   ```bash
   npx supabase db push
   ```
   (o pegando el SQL manualmente en el SQL Editor del proyecto).
4. En **Authentication → URL Configuration**, configurá el **Site URL** y
   agregá `/**` a las **Redirect URLs**.

**(b) Local con Docker:**
1. Tené Docker corriendo.
2. Levantá el stack local:
   ```bash
   npx -y supabase@latest start
   ```
   Imprime las keys locales (URL, anon key, service role key) — copialas a
   `.env.local`. `DATABASE_URL` local es:
   ```
   postgresql://postgres:postgres@127.0.0.1:54322/postgres
   ```
3. Aplicá las migraciones:
   ```bash
   npx supabase db reset
   ```

**Cambios de schema después del bootstrap:** se manejan con Drizzle, no
tocando `supabase/migrations/` a mano — `npm run db:generate` (UP),
`npm run db:migrate` (aplica) y `npm run db:rollback` (revierte la última).
Regla dura: toda UP lleva su DOWN en el mismo commit; ver `CLAUDE.md`
§Migraciones.

### 2. App

```bash
npm install
npm test
npm run dev
```

Abrí `http://localhost:3000`.

### 3. Deploy (Vercel)

1. Importá el repo en Vercel.
2. Seteá las 4 env vars de `.env.example` (bloque APP): `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`.
3. Agregá el dominio de Vercel a las **Redirect URLs** de Supabase Auth
   (mismo lugar que en el paso de Supabase cloud).
4. **Smoke post-deploy** (correlo siempre, no asumas que anda):
   - La landing carga.
   - Signup crea un perfil.
   - Login + logout funcionan.
   - `/dashboard` sin sesión redirige a login.

**Nota:** si el proyecto de Supabase tiene "Confirm email" habilitado (por
default en proyectos nuevos), `signUp` no crea sesión inmediata — el usuario
tiene que confirmar por mail antes de poder loguearse. Tenelo en cuenta al
correr el smoke test o al desactivarlo para pruebas rápidas.

## Variables opcionales (DevOps)

El bloque DEVOPS de `.env.example` (Databricks, Metabase, OpenPanel, VPS) es
opcional — solo hace falta completarlo si vas a usar esas skills
(`databricks-sql`, `metabase`, `openpanel`, `vps-ssh`).
