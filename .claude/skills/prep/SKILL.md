---
name: prep
description: "Definir un proyecto nuevo antes de codear. Usar cuando el usuario diga '/prep', 'arranquemos el proyecto', 'definamos la app', o recién clonó el template y todavía no hay nada definido."
---

# Prep

Cadena de definición pre-código que se corre **una vez**, al arrancar un
proyecto nuevo sobre este template. Ver `CLAUDE.md` §Ciclo de
vida: prep va antes del primer `/backlog add`, y termina sembrando el backlog.

Cada paso escribe un output en `ai_docs/specs/prep-<paso>.md` con frontmatter
`type: spec` (formato de la skill `escribir-spec`, no se duplica acá). Los
outputs entran al schema y lifecycle estándar de specs: nacen `status: draft` y
pasan a `status: done` al cerrar la cadena.

Contrato de preguntas interactivas: si existe una tool de preguntas con
opciones (`AskUserQuestion` o equivalente), usala; si no existe, ofrecé
opciones numeradas en texto y esperá la respuesta antes de seguir. Nunca
asumas la respuesta.

## Reglas del flujo (aplican a todos los pasos)

- **Draft-first.** Nunca arranques un paso con una pregunta abierta ni una
  página en blanco. Leé los `prep-*` anteriores, redactá un **borrador
  concreto** de lo que proponés, y presentáselo al usuario para que edite o
  reaccione. La pregunta es "¿esto va o lo cambiamos?", no "¿qué querés?".
- **Máximo 2 preguntas por paso.** Si necesitás más de dos decisiones, elegí
  las dos que más mueven la aguja y asumí defaults razonables para el resto
  (decílos en el borrador para que el usuario los corrija si quiere).
- **Un output por paso.** Cada paso escribe/actualiza su `prep-<paso>.md` con
  el frontmatter estándar y agrega una línea a `ai_docs/LOG.md`:
  `- YYYY-MM-DD · spec/draft · prep-<paso> · [[specs/prep-<paso>]]`.
- **Gate de aprobación.** El usuario aprueba el doc del paso antes de pasar al
  siguiente. Si tiene correcciones, aplicalas y volvé a pedir conformidad.
- **Resumible.** Al invocar `/prep`, listá los `prep-*.md` que ya existen en
  `ai_docs/specs/`. Si hay outputs previos, seguí desde el paso siguiente al
  último completado; no rehagas pasos ya aprobados sin que te lo pidan.

## Entrada: ¿APP o DEVOPS?

Antes del paso 1, preguntá (con la tool de preguntas) qué tipo de proyecto es:

- **APP** — producto con frontend/backend (Next + Supabase + Drizzle del
  template). Sigue el **Ramal APP** de abajo.
- **DEVOPS / infra** — trabajo de infraestructura, automatización u operación
  sin app propia. Sigue el **Ramal DEVOPS**.

Registrá la elección y seguí por el ramal correspondiente.

## Ramal APP

Ocho pasos, en orden. Cada uno lee los anteriores y produce su `prep-*.md`.

### 1 · `prep-idea-maestra`

- **Produce:** `ai_docs/specs/prep-idea-maestra.md` — problema que resuelve,
  usuarios/roles, modelo de negocio, alcance del MVP **por rol**, y user
  stories (formato "como <rol> quiero <acción> para <objetivo>").
- **Lee:** nada previo (es el primero).
- **Borrador:** a partir de lo poco que dijo el usuario, redactá una hipótesis
  completa de problema + usuarios + MVP para que la corrija.
- **Preguntas (máx 2):** (1) ¿quién es el usuario principal y cuál es su dolor
  central? (2) ¿qué entra en el MVP y qué queda explícitamente afuera?

### 2 · `prep-nombre`

- **Produce:** `ai_docs/specs/prep-nombre.md` — candidatos de nombre, shortlist
  con dominios a chequear, y la **decisión final registrada**.
- **Lee:** `prep-idea-maestra`.
- **Borrador:** proponé 5-8 candidatos con una línea de fundamento cada uno y
  una shortlist de 3. Listá los dominios a verificar (`.com`, `.app`, etc.);
  **la disponibilidad la confirma el usuario** (no la inventes ni la asumas).
- **Preguntas (máx 2):** (1) ¿cuál de la shortlist te cierra? (2) ¿el dominio
  elegido está disponible? (el usuario verifica y responde).

### 3 · `prep-theme`

- **Produce:** `ai_docs/specs/prep-theme.md` — el theme elegido y aplicado a
  `app/globals.css`.
- **Lee:** `prep-idea-maestra`, `prep-nombre`.
- **Primero preguntá (con opciones):** ¿el proyecto sigue la marca GOcuotas?
  - **Sí (default para proyectos de la empresa):** usá la skill
    `gocuotas-design` — aplicá sus tokens (`colors_and_type.css`: rosa
    `#EE2A7B`, tinta `#1C263F`, Poppins 400/500/700) a `app/globals.css`
    según el mapeo del paso 4, copiá los assets que necesites, y documentá
    en `prep-theme.md` que el proyecto sigue ese design system (sus reglas
    de marca mandan: botones pill, cards radius 8px, una sola sombra, sin
    emoji ni motion). Salteá los pasos 1-3.
  - **No (proyecto fuera de marca):** seguí los pasos 1-4.
- **Pasos:**
  1. Proponé **3 esquemas** (primario/secundario/acento/fondo/texto en claro y
     oscuro) con el porqué de cada uno según el tono de la marca.
  2. Copiá `.claude/skills/prep/theme-preview.html` a
     `ai_docs/scratch/theme-preview.html` e inyectá las paletas en los **3
     bloques marcados** `/* PALETA — reemplazar acá */` (uno por esquema, claro
     y oscuro), sin tocar el resto del archivo.
  3. Abrí la copia en el browser (`open ai_docs/scratch/theme-preview.html`).
     El usuario **elige viendo** botones, tarjetas, inputs y badges reales.
  4. Aplicá el esquema elegido a `app/globals.css`: los 5 colores de la
     paleta mapean directo a `--primary`, `--secondary`, `--accent`,
     `--background` y `--foreground` en `:root` (claro) y `.dark` (oscuro).
     Las demás variables del archivo (card, muted, border, ring, etc.)
     derivalas de esas 5 o dejalas como están; podés escribir los valores
     en hex — Tailwind 4 los acepta junto a los oklch existentes.
- **Preguntas (máx 2):** (1) ¿cuál de los 3 esquemas elegís? (2) ¿algún ajuste
  puntual de color antes de aplicarlo?

### 4 · `prep-paginas`

- **Produce:** `ai_docs/specs/prep-paginas.md` — inventario de páginas/rutas y
  la funcionalidad de cada una.
- **Lee:** `prep-idea-maestra` (roles, user stories).
- **Borrador:** derivá el árbol de rutas de las user stories (landing, auth,
  dashboard por rol, etc.). Para cada ruta: qué muestra, qué hace, quién
  accede.
- **Preguntas (máx 2):** (1) ¿falta alguna página clave del MVP? (2) ¿alguna
  ruta necesita protección/rol distinto del que asumí?

### 5 · `prep-wireframes`

- **Produce:** `ai_docs/specs/prep-wireframes.md` — un wireframe **ASCII** por
  página y un mapa de flujo con flechas entre páginas.
- **Lee:** `prep-paginas`.
- **Borrador:** dibujá cada pantalla en ASCII (header, contenido, acciones) y
  el mapa de navegación (`login → dashboard → detalle …`).
- **Preguntas (máx 2):** (1) ¿el layout de la pantalla principal va por ese
  lado? (2) ¿el flujo entre pantallas es el correcto?

### 6 · `prep-data-models`

- **Produce:** `ai_docs/specs/prep-data-models.md` — modelo de datos que
  **extiende el schema base** (`profiles` en `lib/db/schema.ts`).
- **Lee:** `prep-paginas`, `prep-wireframes`, `prep-idea-maestra`.
- **Borrador:** para cada entidad del MVP, tabla con columnas, tipos, FKs y
  relación con `profiles`. **Toda tabla nueva se documenta con su par UP+DOWN**
  según `CLAUDE.md` §Migraciones (DOWN con `IF EXISTS`, riesgos de pérdida de
  datos comentados). Acá se **especifica** el modelo; las migraciones reales se
  escriben en la ejecución de cada item de backlog.
- **Preguntas (máx 2):** (1) ¿faltan entidades o relaciones? (2) ¿algún campo
  con reglas especiales (único, RLS, soft-delete)?

### 7 · `prep-arquitectura`

- **Produce:** `ai_docs/specs/prep-arquitectura.md` — decisiones de
  arquitectura: server vs client components, data fetching, auth/roles, capas,
  librerías a sumar, integraciones externas.
- **Lee:** todos los `prep-*` anteriores.
- **Regla dura:** este paso es **solo planificación**. PROHIBIDO escribir
  código de producto acá — se documentan decisiones, no se implementan.
- **Preguntas (máx 2):** (1) ¿alguna integración externa condiciona la
  arquitectura? (2) ¿preferencia entre los approaches donde marqué un tradeoff?

### 8 · Siembra del backlog

- **Lee:** todos los `prep-*` (idea → arquitectura).
- **Antes de crear nada**, mostrá el **build order** y una **auto-crítica**:
  - Fases **verticales**: cada item junta feature + su migración + su test.
  - Orden **front-to-back** (lo que el usuario ve primero, primero).
  - Prioridades **P0** (MVP indispensable) / **P1** (siguiente ola).
  - Auto-crítica explícita: "¿qué falta?", "¿qué orden rompe dependencias?".
    Ajustá el orden hasta que las dependencias cierren.
- Con el build order aprobado, creá cada item con la skill `backlog`
  (`add <título>`) y, como `add` deja prioridad `P2` por default, fijá
  inmediatamente la de cada fase con `priority B-NNN <P0|P1|P2>`. No edites
  `backlog/*.md` a mano: la skill calcula el ID, arma el archivo y regenera
  `BACKLOG.md`.
- **Cierre de la cadena:**
  - Todos los `prep-*.md` → `status: done` (`updated` = hoy).
  - Actualizá `ai_docs/OVERVIEW.md` (Estado + Próximos pasos) con el proyecto
    definido y el backlog sembrado.
  - Línea final en `ai_docs/LOG.md`:
    `- YYYY-MM-DD · prep/done · <nombre-proyecto> · backlog sembrado (N items)`.

## Ramal DEVOPS

Cuatro pasos, en orden. Sin nombre/theme/wireframes/data-models: es
infraestructura, no producto con UI.

### 1 · `prep-contexto-sistema`

- **Produce:** `ai_docs/specs/prep-contexto-sistema.md` — inventario de
  sistemas existentes (Databricks, Metabase, OpenPanel, VPS, otros), quién los
  usa y qué duele hoy.
- **Lee:** nada previo (es el primero).
- **Borrador:** a partir de lo que dijo el usuario, armá una tabla de sistemas
  con dueño/usuarios y el dolor puntual de cada uno. Referenciá las skills
  operativas ya definidas (`databricks-sql`, `metabase`, `openpanel`,
  `vps-ssh`) como los brazos que van a operar cada sistema.
- **Preguntas (máx 2):** (1) ¿qué sistemas están en alcance de este trabajo?
  (2) ¿cuál es el dolor más urgente hoy?

### 2 · `prep-accesos`

- **Produce:** `ai_docs/specs/prep-accesos.md` — por sistema, qué credencial
  hace falta y dónde se guarda.
- **Lee:** `prep-contexto-sistema`.
- **Borrador:** tabla sistema → credencial → ubicación, citando `CLAUDE.md`
  §Secrets y la sección **Credenciales** de la skill devops correspondiente
  (`databricks-sql`, `metabase`, `openpanel`, `vps-ssh`). **Nunca pidas tokens
  en el chat** — si falta una credencial, guiá al usuario a la sección
  Credenciales de la skill que corresponda.
- **Preguntas (máx 2):** (1) ¿qué sistemas ya tienen credencial guardada y
  cuáles faltan? (2) ¿algún sistema queda fuera de alcance por ahora?

### 3 · `prep-objetivos`

- **Produce:** `ai_docs/specs/prep-objetivos.md` — resultados medibles
  esperados (reportes, automatizaciones, monitoreo).
- **Lee:** `prep-contexto-sistema`, `prep-accesos`.
- **Borrador:** para cada dolor identificado en el paso 1, proponé un
  resultado medible y concreto (qué reporte, qué automatización, qué alerta).
- **Preguntas (máx 2):** (1) ¿falta algún resultado clave? (2) ¿alguno de los
  propuestos no es prioritario todavía?

### 4 · Siembra del backlog

Igual que el paso 8 del Ramal APP: mismo build order + auto-crítica, misma
mecánica de creación con la skill `backlog` (`add` y después `priority
B-NNN`), y mismo cierre de la cadena (`prep-*.md` → `status: done`, update de
`OVERVIEW.md`, línea final en `LOG.md`).
