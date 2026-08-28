---
name: openpanel
description: "Gestionar un VPS con OpenPanel: listar sitios/usuarios/bases, crear un sitio, consultar estado. Usar cuando el usuario diga 'fijate en OpenPanel', 'listá los sitios del panel', 'creá un sitio en OpenPanel', o pida administrar hosting vía OpenPanel."
---

# OpenPanel

Administra un panel de hosting self-hosted (OpenPanel) corriendo en un VPS.
Dos vías, en este orden de preferencia:

1. **API REST** (`OPENPANEL_URL` + `OPENPANEL_TOKEN`), si el token está
   configurado y el plan/edición del panel tiene la API habilitada.
2. **Fallback SSH admin + `opencli`**, si no hay token de API o la API no
   está disponible en esa instalación. Este fallback requiere terminal con
   acceso SSH al VPS (ver skill `vps-ssh` para la conexión en sí).

Contrato de preguntas interactivas: si existe una tool de preguntas con
opciones (`AskUserQuestion` o equivalente), usala; si no existe, ofrecé
opciones numeradas en texto y esperá la respuesta antes de seguir. Nunca
asumas la respuesta.

## Credenciales

Vars: `OPENPANEL_URL`, `OPENPANEL_TOKEN`.

- Path estándar (`CLAUDE.md` §Secrets):
  - Mac/Linux: `~/Documents/openpanel-config.env`
  - Windows: `%USERPROFILE%\Documents\openpanel-config.env`
  - o `.env.local` del proyecto (mismo formato, mismas vars).
- Permisos `600` en el archivo (`chmod 600 ~/Documents/openpanel-config.env`).
- Cómo obtener el token: entrar al panel de OpenPanel como admin → sección
  de **API** en la configuración de la cuenta/panel → generar token
  (**solo disponible si el plan/edición tiene la API habilitada** — si no
  aparece esa opción, usar el fallback SSH + `opencli`).
- Pegar el valor directo en el archivo `-config.env` local, nunca en el
  chat: `OPENPANEL_TOKEN=...`.
- **Nunca** pegues el token en el chat, en un commit ni en ningún archivo
  versionado. `.env.example` solo tiene placeholders `REEMPLAZAR_*`.
- Si no hay token de API pero sí hay `VPS_SSH_HOST` (ver skill `vps-ssh`),
  usar el fallback `opencli` por SSH — no bloquear la operación por falta
  de API.

## Modo con terminal

Claude tiene acceso a la shell:

1. Validar credencial (ver Detección de credencial faltante). Si hay token
   de API, usarlo; si no, caer al fallback SSH.
2. Operar vía `curl` (API) u `opencli` sobre SSH (fallback) — ver
   Operaciones.
3. Mostrar evidencia: el JSON de respuesta o la salida del comando
   `opencli` tal cual — nunca el token usado en el header.

## Modo sin terminal

Solo aplica a la vía API (el fallback `opencli` necesita SSH, es decir,
terminal). Para guiar a alguien sin acceso a terminal ni a archivos del
proyecto (Claude web/desktop):

1. Pedirle que genere el token de API siguiendo los pasos de Credenciales
   (arriba). Aclarar que el token NO se pega en el chat.
2. Pedirle que abra una pestaña nueva a esta URL (reemplazando ella misma
   host/token, sin decírtelos a vos), o use una herramienta con UI para
   requests (ej. una extensión de REST client) si el endpoint requiere
   headers:
   - Método: `GET`
   - URL: `{OPENPANEL_URL}/api/<endpoint>` (ver Operaciones)
   - Header `Authorization: Bearer <su token>` (ella lo pega, vos no lo ves)
3. Pedirle que te copie y pegue **solo el body de la respuesta**.
4. Si algo falla, pedirle el mensaje de error tal cual — nunca le pidas
   que te diga el token para "revisar si está bien copiado". Si la API no
   existe en su plan, decirle que necesita que alguien con acceso SSH al
   VPS use el fallback `opencli` (modo con terminal).

## Detección de credencial faltante

Antes de cualquier operación:

- Si `OPENPANEL_TOKEN` no está definida o empieza con `REEMPLAZAR`: no usar
  la vía API. Revisar si hay `VPS_SSH_HOST` configurada (skill `vps-ssh`)
  para el fallback `opencli`.
- Si ninguna de las dos está disponible (ni token de API ni SSH), ir a
  Credenciales y guiar para completar al menos una. **No** seguir con
  Operaciones sin credencial.

## Operaciones

Listado read-only: se ejecutan sin pedir GO. Cualquier operación que
**crea, borra o modifica** un sitio/usuario/base es un cambio de estado —
seguir el formato de GO de `CLAUDE.md` §Modelo de ejecución (qué corre /
qué afecta / cómo se reversa) antes de correrla, salvo que el usuario ya
haya dado el GO explícito para esa acción puntual.

### Listar sitios

- API: `curl -s "$OPENPANEL_URL/api/websites" -H "Authorization: Bearer $OPENPANEL_TOKEN"`
- Fallback SSH: `ssh $VPS_SSH_HOST opencli websites-all`

### Listar usuarios

- API: `curl -s "$OPENPANEL_URL/api/users" -H "Authorization: Bearer $OPENPANEL_TOKEN"`
- Fallback SSH: `ssh $VPS_SSH_HOST opencli user-list`

### Listar bases de datos de un sitio/usuario

- Fallback SSH (no siempre expuesto por API): `ssh $VPS_SSH_HOST opencli db-list <usuario>`

### Crear un sitio (requiere GO)

- Fallback SSH: `ssh $VPS_SSH_HOST opencli websites-add --domain <dominio> --user <usuario>`
- Antes de correrlo, presentar el GO: qué corre (comando exacto arriba),
  qué afecta (usuario/dominio en el VPS), cómo se reversa (borrar el sitio
  con `opencli websites-delete`, o "sin rollback automático" si no aplica).

### Crear un usuario (requiere GO)

- Fallback SSH: `ssh $VPS_SSH_HOST opencli user-add <usuario> <plan>`
- Mismo formato de GO que arriba antes de ejecutar.
