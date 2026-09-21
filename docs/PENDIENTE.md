# Estado y pendientes

Última sesión: **2026-09-21**. El panel está publicado y funcionando con 74 fichas.
Esto es lo que quedó a medias, para retomarlo sin volver a investigar lo ya hecho.

## Temas completos

| Tema | Fichas | Estado |
|---|---:|---|
| Claude Code | 16 | completo, corregido ortográficamente |
| Agent Skills | 8 | completo, corregido ortográficamente |
| Modelos | 8 | completo, corregido ortográficamente |
| MCP | 8 | completo, **falta corrección ortográfica** |
| Herramientas | 8 | completo, **falta corrección ortográfica** |
| Tendencias | 8 | completo, **falta corrección ortográfica** |
| Prácticas | 12 | **faltan 4 fichas** |
| Seguridad | 6 | **faltan 2 fichas** |

## Fichas que faltan

En `content/practicas/`:

- `prompts-para-agentes` (`guia`) — qué funciona hoy en el diseño de prompts para agentes,
  qué dejó de funcionar respecto a 2023-2024, con ejemplos antes/después reales.
- `spec-driven-development` (`guia`) — qué es, herramientas que lo implementan en 2026,
  plantillas reales de spec, y las críticas serias.
- `tdd-con-agentes` (`guia`) — si funciona o no, cómo lo aplica la gente, evidencia de
  ambos lados.
- `debate-trabajo-y-oficio` (`opinion`) — qué significa ser desarrollador en 2026 según
  quienes escriben sobre ello, con posturas enfrentadas y sección `## Dónde queda el debate`.

En `content/seguridad/`:

- `seg-calidad-del-codigo-generado` (`dato`) — estudios empíricos sobre vulnerabilidades en
  código generado por IA, con metodología y muestra, **más las críticas metodológicas** a
  esos estudios. Tabla comparativa.
- `seg-gobernanza-equipo-pequeno` (`guia`) — políticas mínimas para un equipo de 3-10
  personas sin equipo de seguridad: permisos, auditoría, qué exigir antes de producción.

## Corrección ortográfica pendiente

Las carpetas `mcp/`, `herramientas/` y `tendencias/` no han pasado por el corrector.
Los fallos típicos que hay que buscar son tildes ausentes (configuracion, codigo, analisis,
ademas, segun, tambien) e interrogativos indirectos sin tilde (qué, cómo, cuándo, cuánto),
además de algún voseo suelto ("usá", "tenés", "corré").

`bash scripts/build.sh` avisa de las palabras que siempre llevan tilde, pero el aviso no es
exhaustivo: hay que leer el texto.

## Cómo retomar

Dentro de Claude Code, en este repo:

```
/refresh-radar practicas
```

O lanzando agentes a mano según `docs/WORKFLOW.md`. Recuerda: **tandas de dos o tres
agentes como máximo** y **escritura incremental obligatoria**; en esta sesión el límite de
uso mató tandas enteras cuatro veces, y lo único que sobrevivió fue lo ya escrito en disco.
