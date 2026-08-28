# go-kit

Template de proyecto para arrancar con Claude Code: metodología (skills +
`CLAUDE.md`) más una app base funcionando (Next.js + Supabase + Drizzle) para
no salir de cero. No es solo boilerplate de código — es también el proceso
para no perder disciplina de diseño, tests y verificación a medida que el
proyecto crece.

Repo: **https://github.com/pamatute/go-kit**

## Quickstart (para devs)

Opción recomendada: en GitHub, botón **"Use this template" → "Create a new
repository"** — tu proyecto nace como repo propio, sin historia compartida.
Después:

```bash
git clone https://github.com/<tu-usuario>/<tu-proyecto>.git
cd <tu-proyecto>
npm install
```

O directo, sin repo propio todavía:

```bash
git clone https://github.com/pamatute/go-kit.git mi-proyecto
cd mi-proyecto
npm install
```

Después, el setup no lo hacés a mano: abrí Claude Code en la carpeta y
escribí **"guiame a correr el @SETUP.md"** — Claude lo ejecuta como wizard,
paso a paso (Supabase, env vars, migraciones, smoke), y solo te pide lo que
hay que copiar de un dashboard. Con eso resuelto, corré `/prep`: te guía para
definir el proyecto (qué es, para quién) y sembrar el backlog inicial. De ahí
en más, todo el trabajo pasa por las skills de abajo.

## Si no sos técnico (Claude Code en la app de Claude Desktop)

Usás la cuenta **Claude Team** de la empresa y ya viste el curso de git de la
academia — sabés qué es un repo y qué es clonar; los comandos no hacen falta:
**los ejecuta Claude**.

1. **Creá tu repo desde este template:** en https://github.com/pamatute/go-kit,
   botón **"Use this template" → "Create a new repository"**, con el nombre de
   tu proyecto.
2. **Abrí Claude Code en la app de Claude Desktop** (sección **Code**), elegí
   la carpeta donde guardás tus proyectos y escribí en el chat:
   *"cloná* `https://github.com/<tu-usuario>/<tu-proyecto>` *y trabajemos ahí"*
   — Claude hace el clone y abre el proyecto. Si a tu máquina le falta algo
   (Node.js, por ejemplo), Claude te lo dice y te guía para instalarlo.
3. **Escribí `/prep`** — Claude te hace pocas preguntas, con opciones para
   elegir, y arma la definición del proyecto por vos.
4. **Para la configuración técnica** (cuentas, claves): escribí
   *"guiame a correr el @SETUP.md"*. Claude lo ejecuta como wizard paso a
   paso: corre los comandos, verifica cada paso y solo te pide lo que tenés
   que copiar y pegar — **nunca pegues claves o contraseñas en el chat**:
   Claude te indica dónde guardarlas.

El detalle paso a paso está en **[SETUP.md](./SETUP.md)**, sección "Ruta
guiada".

## Skills (`.claude/skills/`)

| Skill | Para qué |
|---|---|
| `prep` | Definir un proyecto nuevo antes de codear (se corre una vez, al arrancar). |
| `backlog` | Gestionar el backlog B-NNN: agregar ideas, ver pendientes, cerrar items. |
| `brainstorm` | Diseñar antes de codear features o cambios sin diseño aprobado todavía. |
| `escribir-spec` | Documentar un diseño ya acordado como spec formal en `ai_docs/specs/`. |
| `escribir-plan` | Convertir una spec aprobada en un plan ejecutable con tasks concretas. |
| `tdd` | Ciclo rojo-verde-refactor para implementar features y bugfixes. |
| `verificacion` | Checklist de evidencia antes de decir que algo está "listo" o "funciona". |
| `bugfix-postmortem` | Post-mortem de un bug ya arreglado (root cause, no solo el fix). |
| `databricks-sql` | Consultar un warehouse Databricks vía SQL Statements API. |
| `metabase` | Consultas a Metabase vía API: bases, queries, cards, reportes. |
| `openpanel` | Gestionar un VPS con OpenPanel: sitios, usuarios, bases, estado. |
| `vps-ssh` | Operar un VPS por SSH: diagnóstico read-only, deploy, hardening básico. |
| `gocuotas-design` | Design system GOcuotas: colores, tipografía, assets y UI kit para mantener la línea de marca en toda UI. |

## Ciclo de vida del trabajo

Resumen (diagrama completo en `CLAUDE.md` §Ciclo de vida):

```
idea → backlog → brainstorm → spec → plan → TDD → verificación → deploy → done
bug  → bugfixes/ → fix root-cause → postmortem
```

Regla dura: sin plan no se toca código de producto (features/bugfixes con
superficie de runtime); un one-liner o script de diagnóstico read-only puede
saltear el proceso completo.

## Plugins opcionales

Para flujos avanzados de worktrees y ejecución paralela por subagentes existe
el plugin **[superpowers](https://github.com/obra/superpowers)**, opcional —
este template funciona completo sin plugins. Si lo querés, en Claude Code:

```
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

## Política de versiones

Las dependencias están pineadas (versión exacta, sin `^`/`~`) y con
`package-lock.json` commiteado. Actualizarlas al arrancar un proyecto nuevo es
un paso **opcional y separado** del setup inicial — si lo hacés, corré
`npm run build && npm test` después y confirmá que sigue todo verde antes de
seguir.
