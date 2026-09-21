---
id: mcp-que-es-y-estado-spec
title: "MCP en 2026: qué es y en qué versión está la especificación"
track: mcp
type: guia
level: intro
tags: mcp, especificacion, protocolo, versiones, gobernanza
summary: "Qué es Model Context Protocol, cómo pasó de 2024-11-05 a la reescritura sin sesiones de 2026-07-28 y qué cambió en cada versión intermedia, con la donación del proyecto a la Agentic AI Foundation."
updated: 2026-09-21
reading_minutes: 7
source_span: 2024-11-25..2026-07-28
confidence: alta
---

Model Context Protocol (MCP) es un estándar abierto, creado por Anthropic, para conectar
aplicaciones de IA con fuentes de datos y herramientas externas mediante mensajes
JSON-RPC 2.0. Anthropic lo presentó el 25 de noviembre de 2024 como una forma de
reemplazar integraciones a medida por un protocolo único entre "hosts" (la aplicación de
IA), "clientes" (el conector dentro del host) y "servidores" (el servicio que expone
datos o funciones). Desde entonces la especificación tuvo cinco revisiones fechadas —
2024-11-05, 2025-03-26, 2025-06-18, 2025-11-25 y 2026-07-28 — y en diciembre de 2025
Anthropic cedió la gobernanza del proyecto a una fundación independiente.

MCP versiona con fechas (`YYYY-MM-DD`) en vez de números: el identificador marca la
última vez que hubo cambios incompatibles hacia atrás. Las revisiones pueden estar en
estado *Draft*, *Current* (la vigente, que aún puede recibir cambios compatibles) o
*Final* (cerrada, no vuelve a tocarse). A septiembre de 2026 la revisión **Current** es
**2026-07-28**.

## Por qué importa

La versión 2026-07-28 no es un ajuste menor: elimina el *handshake* `initialize` /
`notifications/initialized` y las sesiones de protocolo (`Mcp-Session-Id`) que existían
desde el origen del protocolo. Cada request ahora declara su propia versión y
capacidades en el campo `_meta`, y los servidores deben implementar un nuevo método
obligatorio, `server/discover`, para anunciar qué versiones y capacidades soportan. Esto
convierte a MCP en un protocolo sin estado a nivel de conexión, algo que cualquiera que
mantenga un servidor o cliente MCP construido sobre versiones anteriores (2025-06-18 o
2025-11-25, todavía muy extendidas) necesita entender antes de actualizar sus
dependencias.

## Ejemplo

Así declara un cliente la versión de protocolo que usa en un request, bajo el esquema de
2026-07-28 (campo `_meta`, y de forma paralela en el header `MCP-Protocol-Version` cuando
el transporte es Streamable HTTP):

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "buscar_incidentes",
    "arguments": { "estado": "abierto" }
  },
  "_meta": {
    "io.modelcontextprotocol/protocolVersion": "2026-07-28",
    "io.modelcontextprotocol/clientInfo": { "name": "mi-cliente", "version": "1.0.0" }
  }
}
```

Si el servidor no soporta esa versión, responde con `UnsupportedProtocolVersionError` y
la lista de versiones que sí soporta, para que el cliente reintente con una compatible.
(Estructura descrita en el changelog oficial de 2026-07-28, ver Fuentes.)

## Datos

| Versión | Fecha | Qué cambió (resumen) |
|---|---|---|
| `2024-11-05` | 2024-11-25 (anuncio) | Versión inicial: JSON-RPC 2.0, conexiones con estado, resources/prompts/tools, sampling |
| `2025-03-26` | 2025-03-26 | Framework de autorización con OAuth 2.1, transporte Streamable HTTP (reemplaza HTTP+SSE), batching JSON-RPC, anotaciones de herramientas |
| `2025-06-18` | 2025-06-18 | Elimina el batching JSON-RPC, añade salida estructurada de tools, clasifica servidores como OAuth Resource Servers, exige Resource Indicators (RFC 8707), añade *elicitation* |
| `2025-11-25` | 2025-11-25 | Discovery vía OpenID Connect, iconos para tools/resources/prompts, *tasks* experimentales, tool calling en sampling, OAuth Client ID Metadata Documents |
| `2026-07-28` | 2026-07-28 | Elimina sesiones y el handshake `initialize`; protocolo sin estado por request vía `_meta`; nuevo `server/discover` obligatorio; `subscriptions/listen` reemplaza `resources/subscribe`; deprecados Roots, Sampling, Logging y HTTP+SSE |

Gobernanza: el 9 de diciembre de 2025 Anthropic donó MCP a la **Agentic AI Foundation**
(AAIF), un proyecto nuevo bajo la Linux Foundation, con Anthropic, Block y OpenAI como
cofundadores y Google, Microsoft, AWS, Cloudflare y Bloomberg como miembros de soporte.
En ese anuncio Anthropic citó más de 10.000 servidores MCP públicos activos y más de 97
millones de descargas mensuales combinadas de los SDK de Python y TypeScript.

> [!duda] La especificación marca 2026-07-28 como versión "Current" (aún puede recibir
> cambios compatibles hacia atrás), no "Final". Los números de adopción real por versión
> (cuántos servidores ya implementan 2026-07-28 frente a 2025-06-18) no están publicados
> por el proyecto; el anuncio de la AAIF de diciembre de 2025 solo da una cifra agregada
> de servidores activos, sin desglose por versión de protocolo.

## Cómo empezar

- La especificación completa vigente está en `modelcontextprotocol.io/specification/2026-07-28/`.
- El changelog de cada revisión enlaza al diff completo en GitHub
  (`modelcontextprotocol/specification`, comparación `vX...vY`).
- Para verificar compatibilidad entre cliente y servidor, revisa qué revisión soporta
  cada SDK: los servidores construidos sobre versiones previas a 2026-07-28 siguen
  usando el handshake `initialize`, por lo que clientes nuevos deben implementar
  compatibilidad hacia atrás si necesitan hablar con ambos.

## Fuentes

- [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) — Anthropic — pub: 2024-11-25 — visto: 2026-09-21
- [Donating the Model Context Protocol and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation) — Anthropic — pub: 2025-12-09 — visto: 2026-09-21
- [Versioning](https://modelcontextprotocol.io/specification/versioning) — Model Context Protocol — pub: s/f — visto: 2026-09-21
- [Key Changes (2026-07-28)](https://modelcontextprotocol.io/specification/2026-07-28/changelog) — Model Context Protocol — pub: 2026-07-28 — visto: 2026-09-21
- [Key Changes (2025-11-25)](https://modelcontextprotocol.io/specification/2025-11-25/changelog) — Model Context Protocol — pub: 2025-11-25 — visto: 2026-09-21
- [Key Changes (2025-06-18)](https://modelcontextprotocol.io/specification/2025-06-18/changelog) — Model Context Protocol — pub: 2025-06-18 — visto: 2026-09-21
- [Key Changes (2025-03-26)](https://modelcontextprotocol.io/specification/2025-03-26/changelog) — Model Context Protocol — pub: 2025-03-26 — visto: 2026-09-21
- [Releases · modelcontextprotocol/modelcontextprotocol](https://github.com/modelcontextprotocol/modelcontextprotocol/releases) — GitHub — pub: s/f — visto: 2026-09-21
