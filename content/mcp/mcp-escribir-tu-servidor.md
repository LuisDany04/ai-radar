---
id: mcp-escribir-tu-servidor
title: "Cómo escribir tu propio servidor MCP: SDKs, ejemplo mínimo y el Inspector"
track: mcp
type: guia
level: intermedio
tags: mcp, sdk, python, servidor, inspector
summary: "Los SDKs oficiales de MCP por lenguaje y su tier de soporte, un servidor mínimo funcional en Python paso a paso, y cómo probarlo con el MCP Inspector antes de conectarlo a un cliente real."
updated: 2026-09-21
reading_minutes: 9
source_span: 2024-11-25..2026-09-21
confidence: alta
---

Escribir un servidor MCP significa, en el caso más simple, declarar funciones con tipos y
un docstring y dejar que el SDK genere el esquema JSON-RPC por ti. El proyecto mantiene
SDKs oficiales en varios lenguajes, clasificados por **tier** según qué tan completos y
mantenidos están frente a la especificación vigente.

## Por qué importa

No todos los SDKs están al mismo nivel: los de **Tier 1** son los que el propio proyecto
se compromete a mantener al día con cada revisión de la especificación; los de tiers
inferiores pueden ir con retraso. Si vas a construir algo en producción, elegir un SDK de
Tier 1 reduce el riesgo de quedarte con una versión vieja del protocolo.

## Datos

| SDK | Tier | Repositorio | Estrellas (medidas 2026-09-21) |
|---|---|---|---|
| TypeScript | 1 | `modelcontextprotocol/typescript-sdk` | 13.439 |
| Python | 1 | `modelcontextprotocol/python-sdk` | 24.353 |
| C# | 1 | `modelcontextprotocol/csharp-sdk` | — |
| Go | 1 | `modelcontextprotocol/go-sdk` | — |
| Rust | 1 | `modelcontextprotocol/rust-sdk` | — |
| Java | 2 | `modelcontextprotocol/java-sdk` | — |
| Ruby | 2 | `modelcontextprotocol/ruby-sdk` | — |
| Swift | 3 | `modelcontextprotocol/swift-sdk` | — |
| PHP | 3 | `modelcontextprotocol/php-sdk` | — |
| Kotlin | 3 | `modelcontextprotocol/kotlin-sdk` | — |
| MCP Inspector (herramienta de prueba) | — | `modelcontextprotocol/inspector` | 10.917 |

## Ejemplo

Servidor mínimo en Python con el SDK oficial (`mcp[cli]`), tomado y adaptado de la guía
oficial "Build an MCP server". Requiere Python 3.10+ y el SDK 2.0.0 o superior.

```bash
# Instalar uv y crear el proyecto
curl -LsSf https://astral.sh/uv/install.sh | sh
uv init weather && cd weather
uv venv && source .venv/bin/activate
uv add "mcp[cli]"
```

```python
# weather.py
from typing import Any
import httpx2
from mcp.server import MCPServer

mcp = MCPServer("weather")
NWS_API_BASE = "https://api.weather.gov"

async def make_nws_request(url: str) -> dict[str, Any] | None:
    async with httpx2.AsyncClient() as client:
        try:
            r = await client.get(url, headers={"Accept": "application/geo+json"}, timeout=30.0)
            r.raise_for_status()
            return r.json()
        except Exception:
            return None

@mcp.tool()
async def get_alerts(state: str) -> str:
    """Get weather alerts for a US state.

    Args:
        state: Two-letter US state code (e.g. CA, NY)
    """
    data = await make_nws_request(f"{NWS_API_BASE}/alerts/active/area/{state}")
    if not data or not data.get("features"):
        return "No active alerts for this state."
    return "\n---\n".join(str(f["properties"]) for f in data["features"])

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

```bash
uv run weather.py
```

Dos detalles que la propia documentación marca como error común: en un servidor `stdio`
**nunca uses `print()`** (ni `console.log()` en TypeScript) — corrompe los mensajes
JSON-RPC porque comparten stdout. Usa el módulo `logging` (que escribe a stderr) o
`console.error()`.

## Cómo empezar

1. **Elige el SDK** de tu lenguaje (tabla de arriba); si no tienes preferencia, Python o
   TypeScript son Tier 1 y tienen la documentación más completa.
2. **Escribe el servidor** siguiendo el patrón de arriba: una función con tipos y
   docstring por herramienta.
3. **Pruébalo con el MCP Inspector antes de conectarlo a ningún cliente real** — no
   requiere instalación:

   ```bash
   # UI web, conectando directo a tu servidor stdio
   npx @modelcontextprotocol/inspector uv run weather.py

   # Modo CLI: lista las herramientas y sal, útil en scripts/CI
   npx @modelcontextprotocol/inspector --cli uv run weather.py --method tools/list

   # Contra un servidor remoto HTTP
   npx @modelcontextprotocol/inspector --server-url https://api.ejemplo.com/mcp --transport http
   ```

   El comando imprime una URL con un token de sesión de un solo uso; ábrela en el
   navegador para inspeccionar tools, resources y prompts, y probar llamadas antes de
   exponer el servidor a un modelo real.
4. **Conéctalo a un cliente** siguiendo la ficha `mcp-conectar-servidores`.
5. **Antes de publicarlo**, revisa la ficha `mcp-seguridad` (sandboxing, no aceptar
   tokens ajenos) y `mcp-registry-descubrimiento` (cómo darlo de alta con
   `mcp-publisher`).

## Fuentes

- [Build an MCP server](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server) — Model Context Protocol — pub: s/f — visto: 2026-09-21
- [SDKs](https://modelcontextprotocol.io/docs/sdk) — Model Context Protocol — pub: s/f — visto: 2026-09-21
- [MCP Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector) — Model Context Protocol — pub: s/f — visto: 2026-09-21
- [modelcontextprotocol/inspector](https://github.com/modelcontextprotocol/inspector) — GitHub / Model Context Protocol — pub: s/f — visto: 2026-09-21
- [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) — Anthropic — pub: 2024-11-25 — visto: 2026-09-21
