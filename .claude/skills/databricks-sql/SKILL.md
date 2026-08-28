---
name: databricks-sql
description: "Consultar un warehouse Databricks vía SQL Statements API. Usar cuando el usuario diga 'corré esta query en Databricks', 'conectate a Databricks', 'traeme un reporte de Databricks', o pida armar un reporte repetible sobre un warehouse SQL."
---

# Databricks SQL

Ejecuta queries contra un SQL Warehouse de Databricks vía la SQL Statements
API (REST, sin driver). Sirve tanto si Claude corre en una terminal con
acceso al repo como si la persona usa Claude web/desktop sin archivos.

Contrato de preguntas interactivas: si existe una tool de preguntas con
opciones (`AskUserQuestion` o equivalente), usala; si no existe, ofrecé
opciones numeradas en texto y esperá la respuesta antes de seguir. Nunca
asumas la respuesta.

## Credenciales

Vars: `DATABRICKS_HOST`, `DATABRICKS_WAREHOUSE_ID`, `DATABRICKS_TOKEN`.

- Path estándar (`CLAUDE.md` §Secrets):
  - Mac/Linux: `~/Documents/databricks-config.env`
  - Windows: `%USERPROFILE%\Documents\databricks-config.env`
  - o `.env.local` del proyecto (mismo formato, mismas vars).
- Permisos `600` en el archivo (`chmod 600 ~/Documents/databricks-config.env`).
- Cómo obtener el token personal:
  - **Mac o Windows (mismo flujo, es la webapp de Databricks):** entrar al
    workspace → ícono de usuario (arriba a la derecha) → **User Settings** →
    pestaña **Developer** → **Access tokens** → **Manage** → **Generate new
    token** → copiar el valor (solo se muestra una vez).
  - Pegar ese valor directo en el archivo `-config.env` local, nunca en el
    chat: `DATABRICKS_TOKEN=dapi...`.
- **Nunca** pegues el token en el chat, en un commit ni en ningún archivo
  versionado. `.env.example` solo tiene placeholders `REEMPLAZAR_*`.

## Modo con terminal

Claude tiene acceso a la shell y al archivo de credenciales:

1. Validar credencial (ver sección siguiente). Si falta, ir a Credenciales
   y no seguir.
2. Operar vía `curl` (ver Operaciones).
3. Mostrar evidencia: el JSON de respuesta relevante o la tabla de
   resultados ya formateada — nunca el token usado en el header.

## Modo sin terminal

Para guiar a alguien sin acceso a terminal ni a archivos del proyecto
(Claude web/desktop):

1. Pedirle que abra el workspace de Databricks en el navegador y genere el
   token siguiendo los pasos de Credenciales (arriba). Aclarar que el token
   NO se pega en el chat.
2. Pedirle que abra una pestaña nueva a esta URL (reemplazando ella misma
   host/warehouse/token, sin decírtelos a vos):
   `{DATABRICKS_HOST}/api/2.0/sql/statements/` — como es un POST con JSON no
   se puede probar solo pegando la URL en el navegador; en su lugar, guiarla
   a usar una herramienta con UI para requests (ej. una extensión de
   REST client u otra herramienta similar) donde:
   - Method: `POST`
   - URL: `{DATABRICKS_HOST}/api/2.0/sql/statements/`
   - Header `Authorization: Bearer <su token>` (ella lo pega, vos no lo ves)
   - Body JSON: `{"warehouse_id": "<su warehouse id>", "statement": "<la query>", "wait_timeout": "30s"}`
3. Pedirle que te copie y pegue **solo el body de la respuesta** (no hace
   falta que copie headers). Ahí vas a ver `status.state` y, si
   `SUCCEEDED`, `result.data_array` + `manifest.schema.columns` para armar
   la tabla vos mismo.
4. Si algo falla, pedirle el mensaje de error tal cual aparece — nunca le
   pidas que te diga el token para "revisar si está bien copiado".

## Detección de credencial faltante

Antes de cualquier operación, revisar `DATABRICKS_HOST`,
`DATABRICKS_WAREHOUSE_ID` y `DATABRICKS_TOKEN`:

- Si alguna var no está definida, o su valor empieza con `REEMPLAZAR`
  (el placeholder de `.env.example`): ir a la sección Credenciales y guiar
  para completarla. **No** seguir con Operaciones hasta tenerlas las tres.

## Operaciones

### Test de conexión

Correr `SELECT 1` con el flujo de abajo. Si `status.state` llega a
`SUCCEEDED`, la credencial y el warehouse están OK.

### Ejecutar una query

```bash
curl -s "$DATABRICKS_HOST/api/2.0/sql/statements/" \
  -H "Authorization: Bearer $DATABRICKS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"warehouse_id": "'"$DATABRICKS_WAREHOUSE_ID"'", "statement": "SELECT 1", "wait_timeout": "30s"}'
```

- La respuesta trae `statement_id` y `status.state`
  (`PENDING`/`RUNNING`/`SUCCEEDED`/`FAILED`).
- Si no llegó a `SUCCEEDED`/`FAILED` dentro del `wait_timeout`, hacer poll:

```bash
curl -s "$DATABRICKS_HOST/api/2.0/sql/statements/<statement_id>" \
  -H "Authorization: Bearer $DATABRICKS_TOKEN"
```

Repetir hasta que `status.state` sea `SUCCEEDED` o `FAILED`. Si `FAILED`,
mostrar `status.error` tal cual (sin inventar causa).

- Con `SUCCEEDED`, armar la tabla de resultados combinando
  `manifest.schema.columns` (nombres/orden de columnas) con
  `result.data_array` (filas, como arrays de valores).

### Reporte repetible

Si el usuario quiere guardar una query para correrla de nuevo más
adelante:

1. Guardarla en `ai_docs/knowledge/reporte-<slug>.md` con el frontmatter
   estándar (`type: knowledge`), el SQL en un bloque de código, y una nota
   de cadencia (diario/semanal/manual) si el usuario la mencionó.
2. Para volver a correrla, leer ese archivo y repetir el flujo de
   Ejecutar una query con el `statement` guardado.
