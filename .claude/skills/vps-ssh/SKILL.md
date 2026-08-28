---
name: vps-ssh
description: "Operar un VPS por SSH: diagnóstico read-only, deploy pull-based, hardening básico. Usar cuando el usuario diga 'conectate al VPS', 'fijate cómo está el servidor', 'deployá esto en el VPS', o pida revisar/reiniciar servicios por SSH."
---

# VPS SSH

Opera un VPS genérico por SSH: diagnóstico, deploy pull-based y hardening
básico. A diferencia de las skills de API (Databricks, Metabase,
OpenPanel), esta requiere una sesión de shell real — no hay equivalente
"sin terminal" para correr comandos remotos, solo para guiar a alguien que
sí tiene terminal.

Contrato de preguntas interactivas: si existe una tool de preguntas con
opciones (`AskUserQuestion` o equivalente), usala; si no existe, ofrecé
opciones numeradas en texto y esperá la respuesta antes de seguir. Nunca
asumas la respuesta.

## Credenciales

Var: `VPS_SSH_HOST` (formato `usuario@host`).

- Path estándar (`CLAUDE.md` §Secrets):
  - Mac/Linux: `~/Documents/vps-ssh-config.env`
  - Windows: `%USERPROFILE%\Documents\vps-ssh-config.env`
  - o `.env.local` del proyecto (mismo formato, misma var).
- **Autenticación por keys, nunca por contraseña en texto:**
  - Generar un par de keys si no existe: `ssh-keygen -t ed25519 -C "<comentario>"`.
  - Copiar la key pública al VPS: `ssh-copy-id -i ~/.ssh/id_ed25519.pub <usuario>@<host>`
    (pide la contraseña **una sola vez**, para instalar la key; después no
    hace falta).
  - Nunca guardar ni pedir la contraseña del VPS en el chat, en
    `-config.env` ni en ningún archivo del repo — solo la key privada local
    (que ya vive fuera del repo, en `~/.ssh/`).
- **Nunca** pegues `VPS_SSH_HOST` con contraseña embebida, ni ninguna key
  privada, en el chat, en un commit ni en ningún archivo versionado.
  `.env.example` solo tiene el placeholder `REEMPLAZAR_user@host`.

## Modo con terminal

Claude tiene acceso a la shell:

1. Validar credencial (ver Detección de credencial faltante). Si falta, ir
   a Credenciales y no seguir.
2. **Diagnóstico primero, siempre read-only** (ver Operaciones) antes de
   proponer cualquier acción que cambie estado.
3. Si la operación pedida reinicia un servicio, borra datos o corta acceso,
   presentar el GO (`CLAUDE.md` §Modelo de ejecución: qué corre / qué
   afecta / cómo se reversa) y esperar confirmación explícita antes de
   ejecutar.
4. Mostrar evidencia: la salida del comando tal cual — nunca la key
   privada ni contraseñas.

## Modo sin terminal

SSH interactivo no tiene equivalente vía navegador como las APIs REST, así
que Claude no puede operar el VPS en nombre de alguien sin terminal. Guía
para ese caso:

1. Si la persona tiene una terminal disponible en algún dispositivo (o
   puede instalar un cliente SSH gráfico, ej. una app de terminal/SSH para
   su SO), guiarla paso a paso por texto para que corra ella misma los
   comandos de Credenciales y Operaciones — sin pedirle que te pegue
   contraseñas ni keys privadas, solo la salida de los comandos.
2. Si no tiene forma de abrir una sesión SSH, indicar que esta operación
   necesita a alguien con acceso a terminal — no hay fallback sin
   terminal para SSH.

## Detección de credencial faltante

Antes de cualquier operación:

- Si `VPS_SSH_HOST` no está definida o empieza con `REEMPLAZAR`: ir a
  Credenciales y guiar para completarla. **No** seguir con Operaciones.
- Si la var está definida pero la conexión falla (probar con
  `ssh -o BatchMode=yes -o ConnectTimeout=5 $VPS_SSH_HOST true`), la key
  probablemente no está instalada en el VPS: guiar el paso de
  `ssh-copy-id` de Credenciales. No pedir ni asumir una contraseña.

## Operaciones

### Diagnóstico (read-only, sin GO — correr siempre primero)

```bash
ssh $VPS_SSH_HOST 'df -h'
ssh $VPS_SSH_HOST 'free -m'
ssh $VPS_SSH_HOST 'systemctl status <servicio>'
ssh $VPS_SSH_HOST 'docker ps'
ssh $VPS_SSH_HOST 'journalctl -u <servicio> -n 50'
```

Usar esto para entender el estado real antes de proponer cualquier cambio.

### Deploy (pull-based — requiere GO)

```bash
ssh $VPS_SSH_HOST 'cd <path-del-repo> && git pull && systemctl restart <unidad>'
```

Antes de correrlo, presentar el GO: qué corre (comando exacto), qué afecta
(unidad systemd, downtime esperado del servicio), cómo se reversa
(`git reset --hard <commit-anterior> && systemctl restart <unidad>`, o
"sin rollback automático" si no aplica).

### Hardening básico (checklist — cada ítem que cambia estado requiere GO)

Diagnóstico primero (read-only): revisar qué está activo antes de tocar
nada.

- **Firewall (`ufw`):** deny incoming por default, allow solo lo necesario:
  ```bash
  ssh $VPS_SSH_HOST 'ufw status verbose'   # diagnóstico, sin GO
  # con GO:
  ssh $VPS_SSH_HOST 'ufw default deny incoming && ufw allow ssh && ufw allow http && ufw allow https && ufw enable'
  ```
- **`fail2ban`:** instalado y con jail de `sshd` activa
  (`systemctl status fail2ban`, luego instalar/activar con GO si falta).
- **`unattended-upgrades`:** activo para parches de seguridad automáticos.
- **SSH endurecido** (`/etc/ssh/sshd_config`, con GO antes de aplicar y
  reiniciar `sshd`):
  - `PermitRootLogin no`
  - `PasswordAuthentication no`
  - **Anti-lockout obligatorio:** antes de aplicar, confirmá desde una
    sesión NUEVA que la key ya loguea sin password (`ssh -o
    PasswordAuthentication=no $VPS_SSH_HOST 'echo ok'`). Si falla, NO
    reinicies `sshd`: desactivar password auth sin key funcionando corta
    el acceso sin rollback remoto posible.

Cada cambio de este checklist reinicia un servicio o corta una vía de
acceso — nunca aplicarlo sin el GO explícito del formato de
`CLAUDE.md` §Modelo de ejecución.
