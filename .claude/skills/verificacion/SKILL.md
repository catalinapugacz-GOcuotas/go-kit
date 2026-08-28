---
name: verificacion
description: "Checklist de evidencia antes de decir que algo está listo. Usar antes de afirmar 'listo', 'completo', 'funciona' o 'smoke verde' sobre cualquier cambio de código."
---

# Verificación

Ver `CLAUDE.md` §Testing y verificación para la regla dura ("evidencia
antes de decir listo") y el modelo de auto-ejecución de checks. Esta skill
es el checklist operativo de cierre; el ciclo rojo-verde-refactor previo
vive en la skill `tdd` — no lo dupliques acá.

Contrato de preguntas interactivas: si existe una tool de preguntas con
opciones (`AskUserQuestion` o equivalente), usala; si no existe, ofrecé
opciones numeradas en texto y esperá la respuesta antes de seguir. Nunca
asumas la respuesta.

## Regla dura

**"Debería funcionar" está prohibido.** Si no corriste el check vos mismo y
no tenés el output pegado en este mismo turno, el trabajo no está listo —
no importa cuán obvio parezca el cambio.

**Nunca delegués la verificación al usuario.** "Probalo vos" o "fijate si
anda" no son un cierre válido de ningún task. El agente corre los checks;
el usuario decide qué hacer con el resultado.

## Antes de decir "listo": correr todos los checks aplicables

No elijas uno solo. Para el stack de este repo, correspondan según lo que
tocaste:

- [ ] **Type-check** — `npx tsc --noEmit`.
- [ ] **Tests** — `npm test` (unitarios/integración de la superficie
  tocada, no solo el archivo que editaste).
- [ ] **Build** — `npm run build`.
- [ ] **Smoke de la superficie tocada** — si hay UI, navegar el flujo real
  (screenshot o puppeteer); si hay datos, correr la query o el endpoint
  contra el entorno correcto y mostrar el resultado; si es un script,
  ejecutarlo con un input real.

Pegá el output concreto de cada check en el mismo turno en que decís que
algo está listo. Un resumen ("corrí los tests y pasaron") sin el output no
cuenta como evidencia.

## Si un check no se puede correr

Decilo explícitamente, con el motivo puntual (falta credencial, entorno no
disponible, dependencia externa caída) — no lo omitas en silencio ni lo
reemplaces por una suposición. Un check ausente y declarado es honesto; un
check ausente y no mencionado es un "debería funcionar" disfrazado.

## Multi-fase: smoke por fase, no al final

En trabajo de varias fases, cerrá cada fase con su propio smoke antes de
seguir a la siguiente. Batchear todos los checks para el final deja bugs
sueltos hasta que ya es tarde para aislarlos fácil.

## Si algo no converge

Si estás haciendo cambios sucesivos sin que el check pase (shotgun
debugging), parás y resumís para el usuario qué verificaste y qué
resultado dio cada intento, en vez de seguir probando cambios a ciegas. Una
hipótesis fallida se explica antes de probar la siguiente — ver
`CLAUDE.md` §Ciclo de vida sobre investigar antes de especular.
