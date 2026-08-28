---
name: bugfix-postmortem
description: "Post-mortem de un bug ya arreglado. Usar después de arreglar un bug real ('arreglamos un bug', 'ya está el fix'), o cuando el hook de commits (bugfix-reminder.sh) lo recuerda tras un commit de fix."
---

# Bugfix postmortem

Cierra el flujo `bug` de `CLAUDE.md` §Ciclo de vida del trabajo
(`consultar ai_docs/bugfixes/ → fix root-cause → postmortem → LOG.md`). El
paso de reproducir el bug con un test en rojo antes de tocar código vive en
la skill `tdd` (sección "Bugs: reproducir antes de tocar código") — no se
duplica acá; esta skill arranca donde `tdd` termina, con el fix ya en verde.

Contrato de preguntas interactivas: si existe una tool de preguntas con
opciones (`AskUserQuestion` o equivalente), usala; si no existe, ofrecé
opciones numeradas en texto y esperá la respuesta antes de seguir. Nunca
asumas la respuesta.

## 1. Antes de arreglar (zona sensible)

Si el bug está en una zona sensible (auth, migraciones, pagos, datos de
producción, cualquier cosa con "regla dura" en `CLAUDE.md`), antes de tocar
código buscá en `ai_docs/bugfixes/` incidentes similares (por área o
síntoma). Si encontrás uno, aplicá su **Prevention Strategy** como primer
intento en vez de re-derivar el fix desde cero — si ese incidente ya mapeó
la causa raíz de esa zona, reabrirla a ciegas es repetir el trabajo.

## 2. Después del fix: crear el postmortem

Un post-mortem por bug real (no para typos ni cambios triviales). Archivo:
`ai_docs/bugfixes/YYYY-MM-DD_<slug>.md` (naming de
`ai_docs/bugfixes/README.md`; fecha del sistema, slug en kebab-case del
síntoma). Es inmutable una vez cerrado (`status: done`) — no se edita
después, si aparece info nueva se crea un postmortem nuevo con `related`
apuntando al viejo.

Copiá este esqueleto completo:

```markdown
---
title: "Título legible del bug"
type: bugfix
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [dominio, ...]
sources: []
related: []
---

## Contexto y severidad

Qué parte del sistema, desde cuándo, quién lo reportó o cómo se detectó,
impacto real (usuarios afectados, datos, downtime).

## Descripción del error

Síntoma tal como se observó. Pasos para reproducir.

## Root Cause

La causa raíz real, no el síntoma. Cita de código (`path:line`) o evidencia
concreta — nada de "probablemente fue X" sin verificar.

## Solución (before → after)

Diff conceptual: qué hacía el código antes, qué hace después, por qué eso
resuelve la causa raíz y no solo el síntoma.

## Prevention Strategy

Qué evita que esto vuelva a pasar: test agregado, guard rail, chequeo en
CI, convención nueva. Esto es lo que el paso 1 de esta skill busca en
incidentes futuros — escribilo pensando en ese lector futuro.

## Lecciones

Qué aprendimos que no era obvio antes de este bug.
```

Al cerrar, `status: done`, `updated`: hoy.

## 3. Si el bug reveló una convención no documentada

Si la causa raíz fue "esto no estaba escrito en ningún lado" (una regla
implícita, un contrato no documentado), actualizá `CLAUDE.md` en el mismo
commit/PR que el fix y el postmortem — no lo dejes para después, porque
"después" es exactamente cómo se originó el bug.

## 4. Cerrar en LOG.md

Agregá una línea a `ai_docs/LOG.md` (ver `CLAUDE.md` §Schema de
documentación para el formato):

```
- YYYY-MM-DD · bugfix/done · <slug> · [[bugfixes/YYYY-MM-DD_<slug>]]
```
