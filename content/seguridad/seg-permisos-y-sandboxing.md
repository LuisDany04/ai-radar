---
id: seg-permisos-y-sandboxing
title: "Permisos y sandboxing: cómo limitar lo que un agente puede hacer en tu máquina"
track: seguridad
type: guia
level: intermedio
tags: sandboxing, permisos, contenedores, devcontainers, claude-code
summary: "Repaso de las capas reales para contener un agente de código: reglas allow/ask/deny, el sandbox de sistema operativo, dev containers, contenedores propios y VMs, con configuraciones copiables de Claude Code."
updated: 2026-09-21
reading_minutes: 9
source_span: 2025-12-09..2025-12-15
confidence: alta
---

Un agente de código puede leer archivos, ejecutar comandos de shell, instalar paquetes y hacer peticiones de red. Contenerlo implica dos capas distintas que conviene no confundir: **permisos** (qué acción exige tu aprobación antes de ejecutarse) y **sandboxing/aislamiento** (qué puede tocar esa acción aunque nadie la haya aprobado explícitamente, porque el sistema operativo o el contenedor se lo impide). Un agente con muchos permisos "sí" pero sin aislamiento sigue teniendo acceso total a tu máquina si algo sale mal; un agente bien aislado pero mal configurado en permisos te va a interrumpir constantemente. Ninguna de las dos capas sola resuelve el problema.

## Por qué importa

Cuanto menos se le pregunta al usuario, más depende la seguridad de los límites impuestos de antemano. Esto importa especialmente cuando el agente procesa contenido no confiable (un issue, una página web, un resultado de búsqueda): si una instrucción oculta ahí logra que el agente actúe, lo único que evita el daño es el límite técnico, no la buena voluntad del modelo. La documentación de Claude Code lo dice de forma explícita para su modo sin preguntas: "Only use this mode in isolated environments like containers or VMs where Claude Code can't cause damage" (advertencia sobre `bypassPermissions`).

## Ejemplo

### Reglas de permisos (allow / ask / deny)

Claude Code evalúa las reglas en este orden fijo: **deny, luego ask, luego allow** — la primera que coincide decide, sin importar qué tan específica sea otra regla. Una regla `deny` amplia como `Bash(git push *)` bloquea aunque exista una `allow` más específica. Ejemplo tomado de la documentación oficial (`code.claude.com/docs/en/permissions`, consultada el 21-09-2026):

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git commit *)"
    ],
    "deny": [
      "Bash(git push *)"
    ]
  }
}
```

Para bloquear el acceso a un archivo de secretos sin importar qué haga el agente:

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./secrets/**)"
    ]
  }
}
```

Un detalle importante que documenta Anthropic: una regla `deny` como `Bash(curl *)` bloquea la forma exacta en que Claude suele escribir el comando, pero no bloquea variantes como `/usr/bin/curl ...` o `sh -c 'curl ...'`. La página lo marca de forma expresa: las reglas de permisos "aren't a security boundary around the program"; para un límite real a nivel de sistema hace falta sandboxing.

### Sandbox de Bash integrado

Claude Code trae un sandbox de sistema operativo para comandos Bash/PowerShell (Seatbelt en macOS, `bubblewrap` en Linux y WSL2; Windows nativo no está soportado, hay que usar WSL2). Se activa con `/sandbox` y admite dos modos: **auto-allow** (corre sandboxed sin preguntar) y **permisos normales** (sigue preguntando aunque el comando esté aislado). Ejemplo de configuración que restringe lectura a la carpeta del proyecto y define un allowlist de red:

```json
{
  "sandbox": {
    "enabled": true,
    "filesystem": {
      "denyRead": ["~/"],
      "allowRead": ["~/projects/mi-proyecto"]
    },
    "network": {
      "allowedDomains": ["github.com", "*.npmjs.org"]
    }
  }
}
```

Este sandbox por sí solo cubre solo Bash/PowerShell/Monitor: las herramientas de archivo integradas (Read, Edit, WebFetch), los servidores MCP y los hooks corren directo en el host y no quedan dentro de ese límite. Para meter todo el proceso de Claude Code —incluidos MCP y hooks— dentro de un mismo límite de sistema operativo sin usar contenedores, Anthropic ofrece el paquete beta `@anthropic-ai/sandbox-runtime`, que reutiliza el mismo Seatbelt/bubblewrap:

```bash
npx @anthropic-ai/sandbox-runtime claude
```

### Dev container de referencia

El repositorio `anthropics/claude-code` publica un dev container de ejemplo con firewall `iptables` de denegación por defecto (`init-firewall.sh`), que se puede copiar y adaptar:

```json
{
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
  }
}
```

Con esa base, la documentación oficial señala que correr con `--dangerously-skip-permissions` dentro del contenedor es razonable porque el usuario no root y el firewall limitan el radio de daño — pero advierte igual: no montar `~/.ssh` ni credenciales de nube en el contenedor, y usar tokens de vida corta y de alcance acotado al repositorio.

## Datos

Comparación de las capas de aislamiento que documenta Claude Code, según lo que cada una aísla y si requiere Docker (fuente: `code.claude.com/docs/en/sandbox-environments`, consultada el 21-09-2026):

| Enfoque | Qué aísla | Requiere Docker | Esfuerzo de configuración |
|---|---|---|---|
| Sandbox de Bash integrado | Bash, PowerShell y Monitor, y sus procesos hijos | No | Mínimo en macOS; bajo en Linux/WSL2 |
| Sandbox runtime (beta) | Todo el proceso: herramientas de archivo, MCP y hooks | No | Bajo |
| Dev container | Entorno de desarrollo completo | Sí | Medio |
| Contenedor propio | Entorno de desarrollo completo | Sí | Medio a alto |
| Máquina virtual | Sistema operativo completo | No | Alto |
| Sesión en la nube (gestionada por Anthropic) | Sistema operativo completo, alojado | No | Ninguno; requiere suscripción Claude |

> [!duda] La tabla no es una jerarquía estricta de "más seguro": el sandbox de Bash es el único que Claude Code puede *imponer* de forma nativa a través de managed settings; los dev containers y contenedores propios son, según la misma documentación, "una convención, no un límite de cumplimiento", porque nada impide correr Claude Code fuera de ellos salvo el control de dispositivos de la organización.

## Cómo empezar

1. Define primero las reglas de permisos (`allow`/`ask`/`deny`) en `.claude/settings.json` para los comandos y rutas que ya sabes que quieres bloquear siempre, como archivos `.env` o `git push`.
2. Activa el sandbox de Bash con `/sandbox` para reducir interrupciones en trabajo cotidiano sobre tu propia máquina; no lo trates como límite suficiente para sesiones desatendidas.
3. Si vas a usar `--dangerously-skip-permissions` o el modo `auto`, hazlo siempre dentro de un dev container, un contenedor propio o una VM — nunca directo sobre el host, según la advertencia explícita de la documentación oficial.
4. Para código de origen no confiable (un repo externo, un fork sin revisar), usa una VM dedicada o una sesión en la nube en vez de un contenedor sobre tu propia máquina.
5. En equipo, distribuye la política vía managed settings o el dev container de referencia del repositorio, en lugar de confiar en que cada quien configure su `settings.json` local.

## Fuentes

- [Configure permissions](https://code.claude.com/docs/en/permissions) — Anthropic (code.claude.com/docs) — pub: s/f — visto: 2026-09-21
- [Configure the sandboxed Bash tool](https://code.claude.com/docs/en/sandboxing) — Anthropic (code.claude.com/docs) — pub: s/f — visto: 2026-09-21
- [Choose a sandbox environment](https://code.claude.com/docs/en/sandbox-environments) — Anthropic (code.claude.com/docs) — pub: s/f — visto: 2026-09-21
- [Development containers](https://code.claude.com/docs/en/devcontainer) — Anthropic (code.claude.com/docs) — pub: s/f — visto: 2026-09-21
- [OWASP Top 10 for Agentic Applications for 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) — OWASP GenAI Security Project — pub: 2025-12-09 — visto: 2026-09-21
- [OWASP Top 10 for Agentic Applications 2026: Key Takeaways & How to Take Action](https://goteleport.com/blog/owasp-top-10-agentic-applications/) — Teleport — pub: 2025-12-15 — visto: 2026-09-21
