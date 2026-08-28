---
name: tdd
description: "Ciclo rojo-verde-refactor para implementar features y bugfixes. Usar cuando el usuario diga 'implementá esto', 'arreglá este bug', o al arrancar la ejecución de un plan (`escribir-plan`) task por task."
---

# TDD (rojo → verde → refactor)

Ver `CLAUDE.md` §Testing y verificación para la regla dura de evidencia
antes de decir "listo" — acá se define el ciclo previo a esa evidencia y
cuándo aplica en su forma estricta. El cierre con checks va en la skill
`verificacion`; no lo dupliques acá.

Contrato de preguntas interactivas: si existe una tool de preguntas con
opciones (`AskUserQuestion` o equivalente), usala; si no existe, ofrecé
opciones numeradas en texto y esperá la respuesta antes de seguir. Nunca
asumas la respuesta.

## Regla de alcance: cuándo TDD estricto y cuándo check mínimo

No todo cambio pesa igual. Antes de arrancar, clasificá el trabajo:

- **TDD estricto** — features y bugfixes con superficie de runtime en
  producto (endpoint, componente de UI, función de negocio, query que
  corre en producción). Sigue los 5 pasos completos de abajo.
- **Check mínimo** — scripts de diagnóstico read-only, one-liners, y
  código de scratch/exploración. Alcanza con un assert o test pequeño que
  falle si la lógica se rompe; no hace falta el ciclo completo con commit
  intermedio en rojo.

Si tenés dudas sobre en qué categoría cae algo, preguntale al usuario en
vez de asumir — la clasificación equivocada en cualquier dirección sale
cara: de más es tiempo perdido, de menos es un bug en producción sin red.

## Los 5 pasos (TDD estricto)

- [ ] **Paso 1 — Escribir el test que falla.** Un solo caso, el más
  específico posible para el comportamiento que falta. No escribas
  producción todavía.
- [ ] **Paso 2 — Correrlo y verlo fallar.** Ejecutá el test y confirmá que
  falla por la razón esperada (no por un error de sintaxis o de setup). Si
  falla por otra cosa, el test está mal escrito — arreglalo antes de
  seguir.
- [ ] **Paso 3 — Código mínimo que lo pasa.** La implementación más chica
  que hace pasar ese test puntual, sin adelantarte a casos que todavía no
  tienen test.
- [ ] **Paso 4 — Correrlo y verlo pasar.** Confirmá el verde. Si además hay
  suite completa, corré la suite entera para descartar que rompiste algo
  ya cubierto.
- [ ] **Paso 5 — Commit.** Un commit por ciclo rojo→verde (más el refactor
  si aplicó). Mensajes chicos y descriptivos; no acumules varios ciclos en
  un commit gigante.

Refactor es parte del ciclo, no un paso aparte opcional: una vez en verde,
mirá si el código o el test necesitan limpieza antes de pasar al próximo
caso. Si no hace falta, seguí — no fuerces un refactor sin motivo.

## Bugs: reproducir antes de tocar código

Para cualquier bugfix, el paso 1 es siempre un test que reproduce el bug
tal como se reporta — corriendo y en rojo — **antes** de tocar el código de
producción. Sin esa reproducción no hay forma de confirmar después que el
fix arregló la causa real y no un síntoma. Si el bug no es reproducible con
un test (depende de infra externa, timing real, etc.), documentá por qué y
usá el check mínimo más cercano posible (script que dispara el mismo path)
en vez de saltear directo al fix a ciegas.

## Spikes exploratorios

Código de spike (probar un approach, explorar una librería, prototipo
descartable) no sigue el ciclo estricto mientras es exploración. Pero **no
se borra automáticamente** al terminar: si el spike deja aprendizaje útil
(qué funcionó, qué no), decidí con el usuario si se documenta en
`ai_docs/knowledge/` antes de tirar el código, o si directamente se
promueve a implementación real siguiendo ahora sí el ciclo completo.
