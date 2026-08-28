---
name: escribir-spec
description: "Documentar un diseño ya acordado como spec formal. Usar cuando el usuario diga 'escribí el spec', 'documentá el diseño', o cuando `brainstorm` termina y hay que pasar el diseño a un archivo."
---

# Escribir spec

Convierte un diseño ya discutido (típicamente salido de `brainstorm`) en un
archivo de spec formal en `ai_docs/specs/`. Ver `CLAUDE.md` §Schema de
documentación para naming y frontmatter — no se duplican acá, se usan tal
cual están definidos ahí.

Contrato de preguntas interactivas: si existe una tool de preguntas con
opciones (`AskUserQuestion` o equivalente), usala; si no existe, ofrecé
opciones numeradas en texto y esperá la respuesta antes de seguir. Nunca
asumas la respuesta.

Si no venís de un `brainstorm` reciente (el usuario pide el spec directo),
hacé un mini-brainstorm antes: no escribas una spec sobre un diseño que
nadie aprobó todavía.

## 1. Definir destino

- Slug en kebab-case a partir del tema (mismo criterio que usa `backlog`:
  minúsculas, sin tildes, `[a-z0-9-]`).
- Archivo: `ai_docs/specs/<slug>.md`. Si el spec sale del flujo `prep`, usá
  el prefijo `prep-<slug>.md` (ver `ai_docs/specs/README.md`).
- Si ya existe un spec con ese slug, preguntá si es una actualización
  (editar `status`/`updated` y agregar una sección) o un spec nuevo con
  otro slug — nunca lo pises sin confirmación.

## 2. Frontmatter

Completalo con el schema estándar de `CLAUDE.md` (`title, type, status,
created, updated, tags, sources, related`). `type: spec`, `status: draft`
mientras se escribe. `sources` apunta a la conversación de brainstorm o a
`ai_docs/sources/` si hubo algo raw involucrado; `related` linkea al item
de backlog si existe.

## 3. Estructura del cuerpo

```
# Spec — <título>

## Decisiones tomadas
(tabla o lista: decisión → elección, tal como se cerraron en brainstorm)

## Diseño por secciones
(una sección por cada bloque acordado: modelo de datos, flujo, casos
borde, etc. — mismas secciones que se aprobaron en brainstorm, no inventes
estructura nueva acá)

## Qué NO incluye
(alcance explícitamente afuera — evita que se asuma scope creep después)

## Definition of Done
(checklist verificable: qué tiene que ser cierto para dar el spec por
completo y pasar a plan)
```

No copies contenido de `CLAUDE.md` ni de otras specs — citalas por
wikilink en `related` en vez de repetirlas.

## 4. Self-review (4 checks, fix inline)

Antes de mostrarle el archivo al usuario, releelo buscando:

1. **Placeholders** — nada de "TBD", "a definir después", `<completar>`
   sin resolver. Si falta info, es una pregunta pendiente, no un
   placeholder: volvé al usuario con la tool de preguntas.
2. **Contradicciones** — que una sección no diga lo contrario de otra
   (p.ej. "no incluye X" en una sección y X detallado en otra).
3. **Ambigüedad** — frases que dos personas leerían distinto ("rápido",
   "simple", "cuando corresponda") sin un criterio concreto al lado.
4. **Scope** — que "Qué NO incluye" cubra lo que quedó afuera en las
   preguntas de brainstorm, y que "Diseño por secciones" no se meta en
   territorio que el usuario dijo que no.

Corregí lo que encuentres directo en el archivo antes de pedir revisión —
no le muestres al usuario una spec con fallas que vos mismo detectaste.

## 5. Gate de revisión del usuario

Mostrale el path del archivo y un resumen corto de las secciones.
**Esperá su aprobación explícita sobre el archivo** antes de ofrecer el
plan — el spec es el contrato que el plan va a implementar; si tiene
correcciones, aplicalas y volvé a pedir conformidad.

## 6. Cierre

Con el archivo aprobado:

- `status: draft` → dejalo así hasta que el plan esté armado (pasa a
  `done` cuando el plan lo reemplaza como fuente de verdad de trabajo
  pendiente, según decida el usuario).
- Agregá una línea a `ai_docs/LOG.md`:
  `- YYYY-MM-DD · spec/draft · <slug> · [[specs/<slug>]]`.
- Preguntá si seguís con `escribir-plan` para convertir esta spec en un
  plan ejecutable.
