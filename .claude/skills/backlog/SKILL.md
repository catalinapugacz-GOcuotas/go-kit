---
name: backlog
description: "Gestión del backlog B-NNN. Usar cuando el usuario diga /backlog, 'agregalo al backlog', 'qué hay pendiente', o mencione ideas para después."
---

# Backlog (sistema B-NNN)

Operás el backlog descripto en `CLAUDE.md` §Backlog. Esta skill es la única
forma de tocar `backlog/*.md`, `backlog/done/**` y `backlog/BACKLOG.md` — nunca
edites esos archivos a mano fuera de estos pasos.

Referencias que ya existen y no se duplican acá: `backlog/_template.md`
(frontmatter y secciones del body de cada item) y `CLAUDE.md` §Backlog
(estados, prioridades, regla de IDs inmutables).

Contrato de preguntas interactivas: si existe una tool de preguntas con
opciones (`AskUserQuestion` o equivalente), usala; si no existe, ofrecé
opciones numeradas en texto y esperá la respuesta antes de seguir. Nunca
asumas la respuesta.

## Reglas transversales (aplican a toda operación)

### Próximo ID

Nunca asumas un ID por conteo de archivos. Calculalo siempre así:

1. Listar frontmatter `id:` de `backlog/B-*.md` (excluyendo `_template.md`)
   **y** de `backlog/done/**/B-*.md`.
2. Tomar el máximo numérico NNN entre todos esos archivos.
3. Próximo ID = máximo + 1, con padding a 3 dígitos (`B-007`). Si no hay
   ningún archivo todavía, el primero es `B-001`.

Esto vale tanto para `add` como para verificar que nunca se reusa un ID
cancelado o cerrado.

### Regeneración de BACKLOG.md

Regenerás `backlog/BACKLOG.md` completo **después de toda operación** que
toque un item activo (add, plan, start, progress, block, unblock, priority,
done, rm). Pasos:

1. Listar `backlog/B-*.md` (excluyendo `_template.md`; los archivos en
   `backlog/done/` NO entran a esta tabla).
2. Leer el frontmatter de cada uno: `id`, `title`, `status`, `priority`,
   `progress`.
3. Ordenar por prioridad (`P0` → `P1` → `P2` → `P3`) y, dentro de la misma
   prioridad, por ID ascendente.
4. Sobrescribir `backlog/BACKLOG.md` con el header existente seguido de la
   tabla:

```
# Backlog — índice derivado. NO editar a mano: lo regenera /backlog.

| ID | Título | Estado | Prioridad | Progreso |
|----|--------|--------|-----------|----------|
| B-001 | <title> | <status> | <priority> | <progress o "—"> |
```

No agregues columnas nuevas ni cambies el header sin que te lo pidan.

### Slug

Para nombres de archivo: título en minúsculas, sin tildes, espacios y
símbolos → `-`, solo `[a-z0-9-]`, sin `-` repetidos ni al borde.

### Fecha

Usá la fecha del sistema (`YYYY-MM-DD`) para `created`/`updated` y para
nombres de archivo que la requieran.

## Subcomandos

### `add <título>`

1. Calcular el próximo ID (ver arriba).
2. Generar el slug del título.
3. Copiar `backlog/_template.md` → `backlog/B-NNN-<slug>.md`.
4. Completar el frontmatter: `id: B-NNN`, `title`, `status: idea`,
   `priority` (si el usuario no la dio, usar `P2` y decírselo en la
   confirmación — puede cambiarla con `/backlog priority`; no frenes el
   `add` para preguntar), `created`/`updated` = hoy. Dejar `plan_ref`,
   `progress`, `blocked_reason` vacíos y `depends_on: []`.
5. Completar `## Qué` con lo que dijo el usuario. Si `## Por qué` o
   `## Criterios de éxito` no son evidentes del pedido, dejalos como
   placeholder — no inventes contenido para que el usuario lo complete
   después.
6. Regenerar `backlog/BACKLOG.md`.
7. Confirmar: `Creado B-NNN: <título> (prioridad P_)`.

### `show [B-NNN]`

- Sin argumento: mostrar la tabla de `backlog/BACKLOG.md` (activos). Si
  preguntan por lo cerrado, buscar en `backlog/done/`.
- Con `B-NNN`: buscar `backlog/B-NNN-*.md`; si no está, buscar en
  `backlog/done/*/B-NNN-*.md`. Mostrar el archivo completo.

### `plan B-NNN`

1. Leer `backlog/B-NNN-*.md`.
2. Crear `ai_docs/plans/YYYY-MM-DD-<slug>.md` (fecha de hoy, mismo slug del
   item) con el frontmatter estándar de `CLAUDE.md` §Schema de
   documentación (`type: plan`, `status: draft`). Para el contenido del
   plan (tasks, criterios de verificación) usá la skill `escribir-plan` si
   está disponible.
3. En el item del backlog: `plan_ref: ai_docs/plans/YYYY-MM-DD-<slug>.md`,
   `status: planned`, `updated`: hoy.
4. Regenerar `backlog/BACKLOG.md`.

### `start B-NNN`

1. Leer `backlog/B-NNN-*.md`.
2. `status: in_progress`, `updated`: hoy.
3. Regenerar `backlog/BACKLOG.md`.

### `progress B-NNN`

1. Leer `plan_ref` del item y abrir ese plan. Si `plan_ref` está vacío,
   informar que el item no tiene plan y ofrecer correr `/backlog plan` —
   no hay progreso que sincronizar sin plan.
2. Contar checkboxes del plan: total (`- [ ]` + `- [x]`) vs. marcados
   (`- [x]`).
3. `progress: "X/Y tasks"`, `updated`: hoy.
4. Regenerar `backlog/BACKLOG.md`.

### `block B-NNN <razón>`

1. `status: blocked`, `blocked_reason: <razón>`, `updated`: hoy.
2. Regenerar `backlog/BACKLOG.md`.

### `unblock B-NNN`

El frontmatter no guarda el estado previo al bloqueo, así que no lo
inventes: preguntale al usuario a qué estado vuelve (`idea` / `planned` /
`in_progress`) con la tool de preguntas, usando `plan_ref` como pista (si
tiene `plan_ref`, lo más probable es `planned` o `in_progress`).

1. `status: <lo que confirme el usuario>`, `blocked_reason: ""`,
   `updated`: hoy.
2. Regenerar `backlog/BACKLOG.md`.

### `priority B-NNN <P0-P3>`

1. `priority: <valor>`, `updated`: hoy.
2. Regenerar `backlog/BACKLOG.md` (cambia el orden de la tabla).

### `done B-NNN`

1. Leer `backlog/B-NNN-*.md`.
2. Insertar al tope del body (antes de `## Qué`) la línea
   `> **CERRADO YYYY-MM-DD:** <resumen>`. Si el resumen no surge del
   contexto de la conversación, preguntarlo.
3. `status: done`, `updated`: hoy.
4. Crear (si no existe) `backlog/done/YYYY-MM/` con el mes actual.
5. `git mv backlog/B-NNN-<slug>.md backlog/done/YYYY-MM/B-NNN-<slug>.md`
   (preserva historia). Si el archivo todavía no está trackeado en git
   (item creado en esta misma sesión, sin commit previo), `git mv` falla
   con "not under version control": usá `mv` + `git add` en su lugar — git
   detecta el rename por similitud de contenido igual, así que
   `git log --follow` sigue funcionando.
6. Regenerar `backlog/BACKLOG.md` (el item ya no aparece: dejó de estar en
   `backlog/*.md`).
7. Agregar línea a `ai_docs/LOG.md`:
   `- YYYY-MM-DD · backlog/done · B-NNN-<slug> · [[backlog/done/YYYY-MM/B-NNN-<slug>]]`.

### `rm B-NNN`

Regla dura de `CLAUDE.md`: un ID nunca se reusa, ni siquiera si el item se
cancela. Por eso `rm` no borra el archivo — lo cancela y lo archiva, igual
que `done`, para que su ID siga apareciendo en el cálculo de "próximo ID".

1. Pedir confirmación explícita (con la tool de preguntas) antes de tocar
   nada. Sin confirmación positiva, no seguir.
2. Insertar al tope del body la línea
   `> **CANCELADO YYYY-MM-DD:** <motivo>`.
3. `updated`: hoy (no fuerces `status: done`; dejá el status que tenía o,
   si el usuario da un motivo de cancelación, es indistinto porque el item
   sale de la tabla activa).
4. Crear (si no existe) `backlog/done/YYYY-MM/` y `git mv` el archivo ahí,
   igual que en `done` (mismo fallback a `mv` + `git add` si no está
   trackeado todavía).
5. Regenerar `backlog/BACKLOG.md`.
6. Agregar línea a `ai_docs/LOG.md`:
   `- YYYY-MM-DD · backlog/cancelado · B-NNN-<slug> · [[backlog/done/YYYY-MM/B-NNN-<slug>]]`.

## Captura proactiva

Si en la conversación el usuario dice algo como "después", "pendiente",
"algún día", "eso lo vemos más adelante" sobre algo accionable, ofrecele
agregarlo con `add` (tool de preguntas: sí/no + título sugerido). No lo
agregues sin confirmación.
