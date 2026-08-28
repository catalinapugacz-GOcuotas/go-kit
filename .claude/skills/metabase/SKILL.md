---
name: metabase
description: "Consultas a Metabase vía API: listar bases, correr queries nativas, leer y correr Cards, exportar reportes. Usar cuando el usuario diga 'consultá Metabase', 'corré esta card', 'traeme un reporte de Metabase', o pida datos de un dashboard/card existente."
---

# Metabase

Ejecuta operaciones contra una instancia de Metabase vía su REST API (sin
driver de base de datos). Sirve tanto si Claude corre en una terminal con
acceso al repo como si la persona usa Claude web/desktop sin archivos.

Contrato de preguntas interactivas: si existe una tool de preguntas con
opciones (`AskUserQuestion` o equivalente), usala; si no existe, ofrecé
opciones numeradas en texto y esperá la respuesta antes de seguir. Nunca
asumas la respuesta.

## Credenciales

Vars: `METABASE_URL`, `METABASE_API_KEY`.

- Path estándar (`CLAUDE.md` §Secrets):
  - Mac/Linux: `~/Documents/metabase-config.env`
  - Windows: `%USERPROFILE%\Documents\metabase-config.env`
  - o `.env.local` del proyecto (mismo formato, mismas vars).
- Permisos `600` en el archivo (`chmod 600 ~/Documents/metabase-config.env`).
- Cómo obtener el API key (lo genera un admin de Metabase):
  - Entrar a Metabase → ícono de **Settings** (arriba a la derecha) →
    **Admin settings** → pestaña **Authentication** → sección **API keys**
    → **Create API key** → elegir un **grupo/rol** para asignarle permisos
    → copiar el valor (**solo se muestra una vez**).
  - Pegar ese valor directo en el archivo `-config.env` local, nunca en el
    chat: `METABASE_API_KEY=mb_...`.
- **Nunca** pegues el API key en el chat, en un commit ni en ningún archivo
  versionado. `.env.example` solo tiene placeholders `REEMPLAZAR_*`.

## Modo con terminal

Claude tiene acceso a la shell y al archivo de credenciales:

1. Validar credencial (ver sección siguiente). Si falta, ir a Credenciales
   y no seguir.
2. Operar vía `curl` (ver Operaciones).
3. Mostrar evidencia: el JSON de respuesta relevante o la tabla de
   resultados ya formateada — nunca el API key usado en el header.

## Modo sin terminal

Para guiar a alguien sin acceso a terminal ni a archivos del proyecto
(Claude web/desktop):

1. Pedirle que abra Metabase en el navegador y genere el API key siguiendo
   los pasos de Credenciales (arriba). Aclarar que el key NO se pega en el
   chat.
2. Si solo necesita ver una Card ya existente y tiene acceso de UI a
   Metabase, es más simple pedirle que abra la Card directamente en el
   navegador y te copie/pegue la tabla de resultados o una captura —
   evita exponer el key.
3. Si hace falta la API (por ejemplo, exportar o correr algo puntual),
   guiarla a usar una herramienta con UI para requests (ej. una extensión
   de REST client) donde:
   - Method: según la operación (`GET` o `POST`, ver Operaciones)
   - URL: `{METABASE_URL}/api/...`
   - Header `x-api-key: <su key>` (ella lo pega, vos no lo ves)
   - Body JSON si aplica (ver Operaciones)
4. Pedirle que te copie y pegue **solo el body de la respuesta**. Si algo
   falla, pedirle el mensaje de error tal cual aparece — nunca le pidas
   que te diga el key para "revisar si está bien copiado".

## Detección de credencial faltante

Antes de cualquier operación, revisar `METABASE_URL` y `METABASE_API_KEY`:

- Si alguna var no está definida, o su valor empieza con `REEMPLAZAR`
  (el placeholder de `.env.example`): ir a la sección Credenciales y guiar
  para completarla. **No** seguir con Operaciones hasta tener las dos.

## Operaciones

### Test de conexión / listar bases

```bash
curl -s "$METABASE_URL/api/database" \
  -H "x-api-key: $METABASE_API_KEY"
```

Si devuelve la lista de bases (campo `data` con `id`/`name` de cada una),
la credencial está OK. El `id` de cada base hace falta para correr queries
nativas.

### Correr una query nativa (SQL)

```bash
curl -s "$METABASE_URL/api/dataset" \
  -H "x-api-key: $METABASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type": "native", "native": {"query": "SELECT 1"}, "database": <id>}'
```

- Reemplazar `<id>` por el `id` de la base (ver arriba) y el `query` por
  el SQL pedido.
- La respuesta trae `data.rows` (filas) y `data.cols` (nombres/orden de
  columnas) para armar la tabla. Si `error` viene presente, mostrarlo tal
  cual, sin inventar causa.

### Leer o correr una Card existente

```bash
# Metadata de la card (incluye su query y visualización)
curl -s "$METABASE_URL/api/card/<card_id>" \
  -H "x-api-key: $METABASE_API_KEY"

# Correr la card y traer resultados frescos
curl -s -X POST "$METABASE_URL/api/card/<card_id>/query" \
  -H "x-api-key: $METABASE_API_KEY"
```

Mismo formato de resultados que la query nativa (`data.rows` + `data.cols`).

### Exportar resultados de una Card (CSV)

```bash
curl -s -X POST "$METABASE_URL/api/card/<card_id>/query/csv" \
  -H "x-api-key: $METABASE_API_KEY" \
  -o resultado.csv
```

Guardar el archivo en `ai_docs/scratch/` si es algo puntual, o pasarle la
ruta al usuario si lo pidió en otro lado.

### Reporte repetible

Si el usuario quiere guardar una query nativa para correrla de nuevo más
adelante:

1. Guardarla en `ai_docs/knowledge/reporte-<slug>.md` con el frontmatter
   estándar (`type: knowledge`), el SQL en un bloque de código, el `id`
   de la base, y una nota de cadencia (diario/semanal/manual) si el
   usuario la mencionó.
2. Para volver a correrla, leer ese archivo y repetir el flujo de
   Correr una query nativa con el `query` guardado.
