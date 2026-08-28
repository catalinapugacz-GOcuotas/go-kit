---
name: brainstorm
description: "Diseñar antes de codear. Usar cuando el usuario diga 'quiero construir X', 'agreguemos X', 'diseñemos X', 'pensemos X', o proponga una feature/cambio sin un diseño aprobado todavía."
---

# Brainstorm

Fase de diseño antes de escribir código. Ver `CLAUDE.md` §Ciclo de vida: esta
skill es el paso `brainstorm` entre la idea (`/backlog add`) y la spec.

**Regla dura: no se implementa código de producto sin un diseño aprobado por
el usuario.** Un one-liner o un script de diagnóstico read-only puede saltear
esta skill (ver `CLAUDE.md` §Ciclo de vida); todo lo demás pasa por acá.

**Anti-patrón nombrado: "esto es muy simple para diseñar".** No existe. Si el
diseño final termina siendo 3 líneas, igual pasó por preguntas y aprobación —
la simplicidad es un resultado del proceso, no una excusa para saltearlo.

Contrato de preguntas interactivas: si existe una tool de preguntas con
opciones (`AskUserQuestion` o equivalente), usala; si no existe, ofrecé
opciones numeradas en texto y esperá la respuesta antes de seguir. Nunca
asumas la respuesta.

## Proceso

### 1. Explorar el contexto del repo

Antes de preguntar nada, andá a buscar lo que ya existe:

- Si el pedido viene de un item de backlog (`B-NNN`), leé
  `backlog/B-NNN-*.md` completo (Qué / Por qué / Criterios de éxito).
- Buscá specs o knowledge existentes en `ai_docs/specs/` y
  `ai_docs/knowledge/` relacionadas al dominio (mismo tag o slug parecido).
- Revisá el código o la estructura real que el cambio va a tocar — no
  asumas nombres de archivos ni convenciones, leelos.
- Si nada de esto existe todavía, decilo explícitamente ("no encontré
  contexto previo, arrancamos de cero") y seguí.

### 2. Preguntas, de a una

Una pregunta por turno, nunca un cuestionario. Priorizá lo que cambia el
diseño (alcance, usuarios, restricciones técnicas, qué pasa con casos
borde) por sobre detalles cosméticos. Parná de preguntar en cuanto tengas
lo suficiente para armar approaches — no preguntes por preguntar.

### 3. 2-3 approaches con tradeoffs

Presentá entre 2 y 3 formas de resolverlo. Para cada una: qué implica, qué
cuesta (tiempo de desarrollo, complejidad, riesgo, deuda técnica), qué
gana. **La recomendación va primero**, con la razón en una línea, seguida
de las alternativas. No presentes un monólogo con una sola opción
disfrazada de análisis.

Usá la tool de preguntas para que el usuario elija el approach (o pida una
variante). Esperá su decisión antes de seguir al detalle.

### 4. Diseño por secciones, aprobación incremental

Con el approach elegido, desarrollá el diseño en secciones chicas (p.ej.
"modelo de datos", "flujo principal", "casos borde", "qué no incluye").
Presentá una sección, pedí conformidad o ajustes, y recién ahí pasá a la
siguiente. No tires el diseño completo de una sola vez esperando que lo
apruebe en bloque — si hay que corregir algo a mitad de camino, es más
barato corregir una sección que rehacer todo.

Si el usuario pide un cambio, ajustá esa sección y las que dependan de
ella antes de seguir avanzando.

### 5. Cerrar e invocar `escribir-spec`

Cuando todas las secciones están aprobadas, resumí el diseño final en un
párrafo y preguntá si lo pasás a spec ahora. Si confirma, invocá la skill
`escribir-spec` con el diseño acordado (decisiones tomadas, secciones del
diseño, qué quedó explícitamente afuera). No dupliques ahí el trabajo de
formato — eso es responsabilidad de `escribir-spec`.
