---
name: escribir-plan
description: "Convertir una spec aprobada en un plan ejecutable con tasks concretas. Usar cuando el usuario diga 'armá el plan', 'cómo lo implementamos', o tras cerrar una spec con `escribir-spec`."
---

# Escribir plan

Convierte una spec de `ai_docs/specs/` en un plan de implementación
task-by-task en `ai_docs/plans/`. Ver `CLAUDE.md` §Ciclo de vida (el plan
es el paso entre spec y ejecución TDD) y §Schema de documentación (naming,
frontmatter). No dupliques esas reglas acá.

Contrato de preguntas interactivas: si existe una tool de preguntas con
opciones (`AskUserQuestion` o equivalente), usala; si no existe, ofrecé
opciones numeradas en texto y esperá la respuesta antes de seguir. Nunca
asumas la respuesta.

Si no hay una spec aprobada todavía, no armes el plan: ofrecé correr
`escribir-spec` primero. Un plan sin spec detrás no tiene contrato de qué
construir.

## 1. Leer la spec completa

Abrí la spec entera (no solo el resumen). Cada sección de "Diseño por
secciones" tiene que mapear a al menos una task del plan; "Qué NO incluye"
define qué tasks NO vas a crear.

## 2. Definir destino y frontmatter

- Archivo: `ai_docs/plans/YYYY-MM-DD-<slug>.md` (fecha de hoy, mismo slug
  de la spec si aplica).
- Frontmatter estándar de `CLAUDE.md`: `type: plan`, `status: draft`,
  `related: ["[[specs/<slug>]]"]`.

## 3. Header obligatorio

```
# <Título> — Implementation Plan

**Goal:** qué se construye, una o dos oraciones, citando la spec.

**Architecture:** cómo encajan las piezas nuevas con lo que ya existe en
el repo (qué se toca, qué queda intacto).

## Global Constraints

(reglas que aplican a TODAS las tasks: convenciones del repo, límites de
la spec en "Qué NO incluye", requisitos de `CLAUDE.md` que sean relevantes
— citados, no repetidos palabra por palabra)
```

## 4. Tasks

Agrupá tasks en fases si el plan es grande. Cada task sigue este formato
exacto:

```
### Task N: <título corto>

**Files:** Create/Modify: `path/exacto/al/archivo.ext`

**Interfaces:** Consume: <qué función/tipo/endpoint usa y su firma>.
Produces: <qué expone esta task para tasks futuras, con firma>.

- [ ] **Step 1: <acción concreta>**
  <código completo del step, no un resumen>
- [ ] **Step 2: <acción concreta>**
  ...
```

Reglas duras para las tasks:

- **Files exactos.** Nunca "el archivo de configuración" — el path
  completo, incluida la extensión.
- **Interfaces con firmas reales.** Si una task produce una función, poné
  su firma (`function foo(x: string): number`), no una descripción vaga.
- **Steps de 2 a 5 minutos**, con código completo pegado en el step. Está
  **prohibido**: `TBD`, "agregar validación" (sin decir cuál), "similar a
  Task N" (copiá el código, no remitas a otra task). Si un step de verdad
  reutiliza algo, extraelo a un helper compartido y referenciá el helper
  por nombre y path, no por "como en la task anterior".
- **Ciclo TDD por task.** Cada task con lógica no trivial (branch, loop,
  parser, cálculo, validación) arranca con un step de test que falla
  (red), sigue con el código mínimo que lo pasa (green), y cierra con
  refactor si aplica. Steps triviales (mover un archivo, un config de una
  línea) no necesitan este ciclo. El detalle de cuándo aplica TDD estricto
  vs. un check mínimo vive en la skill `tdd` — no lo repitas acá, invocala
  si hace falta el criterio completo.

## 5. Self-review antes de mostrarlo

Releé el plan completo buscando:

1. **Cobertura del spec** — toda sección de "Diseño por secciones" tiene
   task; nada de "Qué NO incluye" se coló como task.
2. **Placeholders** — cero `TBD`, cero código a medias, cero "similar a
   Task N".
3. **Consistencia de tipos** — si la Task 3 produce `User { id: string }`
   y la Task 7 la consume, que use exactamente ese tipo, no una versión
   distinta inventada al pasar.

Corregí lo que encuentres antes de pedir revisión.

## 6. Vincular al backlog

Si el trabajo tiene un item `B-NNN` asociado (preguntá si no está claro),
delegá a la skill `backlog` para que el item apunte a este plan
(`plan_ref` y `status: planned`) — no edites `backlog/*.md` ni
`BACKLOG.md` a mano, esa skill es la única que los toca.

## 7. Cierre

Agregá una línea a `ai_docs/LOG.md`:
`- YYYY-MM-DD · plan/draft · <slug> · [[plans/YYYY-MM-DD-<slug>]]`.

Mostrale al usuario el resumen de fases/tasks y esperá confirmación antes
de arrancar la ejecución (TDD por task, ver skill `tdd`).
