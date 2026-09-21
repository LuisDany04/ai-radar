---
id: mcp-registry-descubrimiento
title: "El registry oficial de MCP: cuántos servidores hay y cómo publicar el tuyo"
track: mcp
type: guia
level: intermedio
tags: mcp, registry, descubrimiento, publicacion, server-json
summary: "El registry oficial de MCP pasó de ~2.000 servidores en noviembre de 2025 a 33.972 medidos directamente hoy. Cómo consultarlo y cómo publicar un servidor con server.json y mcp-publisher."
updated: 2026-09-21
reading_minutes: 7
source_span: 2025-11-25..2026-09-21
confidence: alta
---

El **registry oficial de MCP** (`registry.modelcontextprotocol.io`) es un directorio
público que indexa metadatos de servidores MCP —nombre, descripción, repositorio,
paquetes de instalación, transporte— para que los clientes los descubran
programáticamente. No aloja el código del servidor: apunta a dónde instalarlo (npm,
PyPI, OCI, un binario, etc.).

## Por qué importa

Antes del registry, "descubrir" un servidor MCP significaba buscar en README de GitHub o
en listas curadas a mano. El registry expone una API REST versionada (`/v0/servers`) con
paginación por cursor, así que un cliente (o un script) puede consultar el catálogo
completo de forma determinista, algo que ninguna lista en Markdown puede ofrecer.

## Ejemplo

Consultar la API pública sin autenticación:

```bash
curl "https://registry.modelcontextprotocol.io/v0/servers?limit=10&version=latest"
```

Un `server.json` mínimo válido para publicar un servidor distribuido por npm (ejemplo
adaptado de la documentación oficial del formato):

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  "name": "io.github.tu-usuario/tu-servidor",
  "description": "Qué hace tu servidor MCP",
  "title": "Tu Servidor",
  "version": "1.0.0",
  "packages": [
    {
      "registryType": "npm",
      "registryBaseUrl": "https://registry.npmjs.org",
      "identifier": "tu-paquete-npm",
      "version": "1.0.0",
      "transport": { "type": "stdio" },
      "environmentVariables": [
        { "name": "TU_API_KEY", "description": "Clave de API", "isRequired": true, "isSecret": true }
      ]
    }
  ]
}
```

Publicarlo:

```bash
brew install mcp-publisher
mcp-publisher init                 # genera server.json con detección automática
mcp-publisher login github         # o: login github-oidc / login dns / login http
mcp-publisher publish              # publica server.json en el registry de login
```

El namespace `io.github.{usuario}/*` exige haber iniciado sesión como ese usuario de
GitHub; un namespace de dominio propio (`com.tuempresa/*`) exige probar propiedad del
dominio por DNS TXT o por un archivo HTTP en `.well-known/mcp-registry-auth`.

## Datos

Medición propia contra la API pública el **2026-09-21**, paginando `/v0/servers` con
`version=latest` (una entrada por servidor, sin contar versiones antiguas del mismo
nombre):

| Estado en el registry | Cantidad | Fecha de medición |
|---|---|---|
| Total de servidores (última versión de cada uno) | 33.972 | 2026-09-21 |
| Con estado `active` | 33.613 | 2026-09-21 |
| Con estado `deprecated` | 359 | 2026-09-21 |
| Con estado `deleted` | 0 (la API no los devuelve por defecto) | 2026-09-21 |

Para contexto de crecimiento: el blog oficial de MCP reportó "cerca de dos mil" entradas
en el registry el día de su primer aniversario, con un crecimiento del 407% desde el lote
inicial publicado en septiembre de 2025.

> [!duda] El salto de ~2.000 (2025-11-25) a 33.972 (2026-09-21) es real según la propia
> API, pero no hay un reporte oficial intermedio que explique el ritmo mes a mes de ese
> crecimiento; la cifra de "407% desde septiembre" del blog oficial y la medición propia
> de esta ficha usan metodologías distintas (una es un anuncio editorial, la otra una
> consulta directa a la API), así que no son estrictamente comparables punto por punto.

## Cómo empezar

1. Explorar sin publicar: `curl "https://registry.modelcontextprotocol.io/v0/servers?limit=20"` o la web en `registry.modelcontextprotocol.io`.
2. Para publicar: instala `mcp-publisher` (Homebrew), corre `mcp-publisher init` dentro
   del repo de tu servidor para generar la plantilla de `server.json`.
3. Completa los campos `TODO:` que el `init` no pudo detectar (descripción, transporte,
   variables de entorno).
4. Autentícate según tu namespace: `login github` para `io.github.*`, `login dns` o
   `login http` para un dominio propio.
5. `mcp-publisher publish` valida el esquema, verifica que tengas permiso sobre el
   namespace y publica.

## Fuentes

- [Official MCP Registry](https://registry.modelcontextprotocol.io/) — Model Context Protocol — pub: s/f — visto: 2026-09-21
- [MCP Registry API — /v0/servers](https://registry.modelcontextprotocol.io/v0/servers) — Model Context Protocol — pub: s/f — visto: 2026-09-21
- [modelcontextprotocol/registry](https://github.com/modelcontextprotocol/registry) — GitHub / Model Context Protocol — pub: s/f — visto: 2026-09-21
- [Publisher CLI Commands Reference](https://github.com/modelcontextprotocol/registry/blob/main/docs/reference/cli/commands.md) — GitHub / Model Context Protocol — pub: s/f — visto: 2026-09-21
- [One Year of MCP: November 2025 Spec Release](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/) — Model Context Protocol — pub: 2025-11-25 — visto: 2026-09-21
