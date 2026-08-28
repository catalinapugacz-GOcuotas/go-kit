# CLAUDE.md

Convenciones y metodología del proyecto. Autocontenido: todo lo que un dev o un
agente necesita para trabajar acá vive en este archivo. Leelo entero antes de
tocar código. Las reglas marcadas como **regla dura** no se negocian: son
contratos que las skills y los hooks del repo asumen cumplidos.

## Qué es este proyecto

<!-- Este bloque lo completa `/prep` al arrancar el proyecto. Dos líneas: qué es
     y para quién. Hasta entonces queda como placeholder. -->

- **Qué:** _(pendiente — lo completa `/prep`)_
- **Para quién:** _(pendiente — lo completa `/prep`)_

## Ciclo de vida del trabajo

Todo trabajo sigue este flujo. Cada flecha es un paso con su artefacto; no se
saltea el backlog ni la verificación.

```
idea → /backlog add (B-NNN idea)
     → brainstorm → spec (ai_docs/specs/)
     → /backlog plan → plan (ai_docs/plans/) → status: planned
     → /backlog start → ejecución TDD → in_progress
     → verificación con evidencia → deploy
     → /backlog done → done/YYYY-MM/ + LOG.md
bug  → consultar ai_docs/bugfixes/ → fix root-cause → postmortem → LOG.md
```

Reglas de flujo:

- **Nada de código sin plan** para features y bugfixes con superficie de runtime.
  Un one-liner o un script de diagnóstico read-only puede ir directo.
- **Investigar antes de especular.** Ante un bug, leé el código relevante primero;
  no hipotetices "cache", "timing" o "doble click" sin evidencia del codebase.
- **Un cambio, su verificación.** Ver la sección Testing y verificación.

## Modelo de ejecución

**El humano orquesta, el agente ejecuta.** El agente hace el trabajo mecánico y
propone; el humano decide en los puntos irreversibles o costosos.

### Qué se auto-ejecuta vs qué requiere GO

| Se auto-ejecuta (sin pedir permiso) | Requiere GO explícito del humano |
|---|---|
| Lint / type-check | `git push`, `merge`, abrir PR |
| Tests (unit, integración) | Deploy a cualquier entorno |
| Build local | Migraciones contra prod |
| Scripts de diagnóstico read-only | Borrado de datos / DROP en prod |
| `git commit` (en la branch actual) | Cualquier gasto (infra, API paga, tokens de un servicio) |

### Formato de pedido de GO

Cuando algo requiere GO, presentá el pedido con estas tres líneas antes de
esperar la confirmación:

- **Qué corre:** el comando o acción exacta.
- **Qué afecta:** entorno, tablas, servicios, datos tocados.
- **Cómo se reversa:** rollback disponible, o "irreversible" si no lo hay.

No asumas el GO. Esperá una confirmación positiva explícita.

### Protocolo de subagentes

- **Regla dura: los subagentes commitean, nunca pushean.** Push, merge y deploy
  son siempre del orquestador (el humano o el agente principal que él dirige).
- **Secuencial por default:** los subagentes corren en la branch actual, uno
  después de otro. **Dirty-check antes de despachar cada uno**: si el working
  tree está sucio con cambios ajenos al task, frená y resolvé antes de seguir.
- **Paralelo → un worktree por agente.** Si necesitás correr subagentes en
  paralelo, cada uno trabaja en su propio git worktree; el orquestador integra
  los commits después. Nunca dos subagentes escribiendo el mismo working tree.

## Schema de documentación

Toda la documentación viva en `ai_docs/`. Un solo path, sin duplicar en otros
lados. Estructura:

| Carpeta | Qué guarda | Naming |
|---|---|---|
| `plans/` | Planificación futura, mutable, se cierra al implementar | `YYYY-MM-DD-<slug>.md` |
| `specs/` | Contratos estables (APIs, schemas, data models) | `<slug>.md` (prep: `prep-<slug>.md`) |
| `bugfixes/` | Post-mortems, inmutables tras cerrar | `YYYY-MM-DD_<slug>.md` |
| `tasks/` | Registro de una sesión de trabajo del agente | `YYYY-MM-DD-<slug>.md` |
| `knowledge/` | Cómo funciona X en este proyecto (estable, sin fecha) | `<slug>.md` |
| `sources/` | Raw ingest: transcripts, docs externos, notas del user | `YYYY-MM-DD_<slug>.md` |
| `scratch/` | Throwaway | libre |

Slug: kebab-case, ASCII, sin espacios. Fechas siempre `YYYY-MM-DD`.

### Frontmatter estándar

Todo `.md` en `ai_docs/` (excepto `INDEX`, `OVERVIEW`, `LOG`) arranca con este
bloque, generado **al crear** el archivo:

```yaml
---
title: "Título legible"
type: plan | spec | bugfix | task | knowledge | source | scratch
status: draft | in-progress | done | archived
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [dominio, ...]
sources: []          # wikilinks a sources/ o URLs si es derivado
related: []          # wikilinks a otras notas
---
```

### Reglas del schema

- **`sources/` es inmutable.** Es raw ingest: transcripts, dumps, docs externos.
  Nunca lo edités después de crearlo. Si hay síntesis derivable, va a una
  `knowledge/<slug>.md` que cita el source vía `sources: [[sources/...]]`. Nunca
  mezcles raw y derivado en el mismo archivo.
- **`LOG.md` es append-only.** Al crear o cerrar un artefacto (plan, spec,
  bugfix, task), agregá una línea al final:
  ```
  - YYYY-MM-DD · tipo/estado · slug · [[wikilink]]
  ```
  Ejemplo: `- 2026-07-06 · plan/done · migrar-auth · [[plans/2026-07-06-migrar-auth]]`
- **`OVERVIEW.md`** describe el estado del proyecto (decisiones, próximos pasos).
  Actualizalo cuando cierres algo que cambia ese estado.
- **`INDEX.md`** es un catálogo (1 línea por página). Lo regenera el sync; no lo
  edités a mano.
- Cuando una `knowledge/` o `spec/` queda obsoleta, **no la borres**: cambiá
  `status: archived` y agregá `superseded_by: [[nueva-nota]]`.

## Backlog

El trabajo pendiente vive en `backlog/` con el sistema **B-NNN**. Cada item es un
`B-NNN-<slug>.md` con frontmatter (id, title, status, priority, plan_ref,
progress, blocked_reason, depends_on, tags, created, updated); ver
`backlog/_template.md`.

- **Estados:** `idea` → `planned` → `in_progress` → `done` (con `blocked` como
  desvío temporal, requiere `blocked_reason`).
- **Prioridades:** `P0` (urgente/bloqueante) · `P1` (alta) · `P2` (normal) ·
  `P3` (nice-to-have).
- **`BACKLOG.md` es un índice derivado.** No lo edités a mano: lo regenera la
  skill `backlog`.
- **Al cerrar un item:** se mueve a `backlog/done/YYYY-MM/` con `git mv` (preserva
  historia). **Regla dura: los IDs son inmutables** — un B-NNN nunca se reusa ni
  se renumera, aunque el item se cancele.

Para todas las operaciones (add / plan / start / progress / block / done) usá la
skill `backlog`; no manipules los archivos ni `BACKLOG.md` a mano.

## Testing y verificación

**Regla dura: evidencia antes de decir "listo".** "Debería funcionar" no cuenta.

- Antes de marcar cualquier cosa como hecha, **corré vos mismo** los checks del
  stack: type-check, tests, build, y smoke de la superficie tocada (query,
  endpoint, UI). Mostrá el output concreto en el mismo turno.
- **Nunca delegues la verificación al usuario.** "Probalo vos" no es un cierre
  válido. Si no lo verificaste, no está listo.
- **Smoke por fase, no batcheado al final.** En trabajo multi-fase, cerrá cada
  fase con su smoke. Juntar todos los tests para el final deja bugs sueltos hasta
  que ya es tarde.
- Si estás haciendo cambios sucesivos sin converger (shotgun debugging), **pará y
  resumí lo que verificaste** en vez de seguir adivinando. Una hipótesis fallida
  se explica antes de probar la siguiente.

Detalle de red→green→refactor y cuándo aplica TDD estricto: skill `tdd`. Checklist
de cierre con evidencia: skill `verificacion`.

## Migraciones

**Regla dura: toda migración UP tiene su DOWN en el mismo commit.** Una migración
sin DOWN no se mergea.

- **UP:** generada con `drizzle-kit generate`.
- **DOWN:** escrita a mano en el mismo commit, en `drizzle/NNNN_slug.down.sql`.
  Usá `IF EXISTS` en todos los `DROP` y comentá los riesgos de pérdida de datos.
- **Rollback:** Drizzle no lo trae; el template incluye el suyo. Comandos:
  `npm run db:migrate` (aplica) / `npm run db:rollback` (revierte la última,
  en transacción, y limpia su entrada del journal).
- **Test de rollback (regla dura):** `migrate → rollback → migrate` y comparar el
  dump de schema normalizado (`pg_dump --schema-only`). Debe cubrir tablas,
  triggers, functions y policies RLS. Si el schema difiere, la DOWN está mal.

## Secrets

**Regla dura: ningún secreto se versiona ni aparece en el chat.**

- `.gitignore` incluye `.env`, `.env.local`, `.env.*.local`, `*-config.env`.
  **`.env.example` es el único env versionado** (solo placeholders, sin valores
  reales).
- **Credenciales personales** (tokens de skills devops) viven en un archivo local
  estándar, permisos `600`:
  - Mac / Linux: `~/Documents/<servicio>-config.env`
  - Windows: `%USERPROFILE%\Documents\<servicio>-config.env`
- **Nunca** pegues tokens ni keys en el chat, en commits ni en docs. Si una skill
  necesita una credencial y no está, guiá al usuario a obtenerla y guardarla —
  nunca se la pidas en texto plano en la conversación.

## Skills disponibles

Slash commands del repo. Cada una encapsula un contrato; usalas en vez de
reinventar el proceso a mano.

| Skill | Cuándo se usa |
|---|---|
| `prep` | Arrancar un proyecto nuevo: cadena de definición pre-código que siembra el backlog |
| `backlog` | Operar el sistema B-NNN: add / plan / start / progress / block / done |
| `brainstorm` | Diseñar antes de codear: contexto → preguntas → approaches con tradeoffs → spec |
| `escribir-spec` | Escribir una spec con formato y frontmatter correctos + self-review |
| `escribir-plan` | Convertir una spec en plan ejecutable con tasks y criterios de verificación |
| `tdd` | Implementar con red → green → refactor; decidir estricto vs check mínimo |
| `verificacion` | Antes de decir "listo": correr checks y mostrar evidencia |
| `bugfix-postmortem` | Tras arreglar un bug: documentar root cause, prevención y lecciones |
| `databricks-sql` | Consultar un warehouse Databricks vía SQL Statements API |
| `metabase` | Crear/consultar cards y queries de Metabase vía API |
| `openpanel` | Gestionar un VPS con OpenPanel (sitios, DBs, usuarios) |
| `vps-ssh` | Operar un VPS por SSH: deploy, systemd, docker, hardening básico |
| `gocuotas-design` | Design system GOcuotas: tokens, tipografía, assets y UI kit — toda UI con marca GOcuotas lo sigue |

## Idioma y comunicación

- **Todo en español.** Nombres de archivos y carpetas quedan en inglés técnico
  (`ai_docs/`, `specs/`, `backlog/`); el resto —mensajes, docs, comentarios de
  proceso— en español.
- **Conciso y directo.** Sin relleno, sin sobre-explicar lo obvio. Andá al punto.
- **Decisiones como opciones con tradeoffs**, no como monólogos. Proponé, no
  impongas.
- **Preguntas interactivas.** Cuando necesites que el usuario decida algo, usá la
  tool de preguntas con opciones seleccionables si el harness la expone
  (`AskUserQuestion` o equivalente); si no existe, caé a opciones numeradas en
  texto y esperá la respuesta. Nunca asumas la respuesta.
- **Audiencia mixta.** Hay lectores técnicos y no-técnicos. Cuando comuniques una
  decisión técnica a alguien no-técnico, ofrecé una versión ejecutiva clara.
