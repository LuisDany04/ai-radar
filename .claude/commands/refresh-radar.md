---
description: Relanza la investigación de un tema del panel y reconstruye el sitio
argument-hint: "<tema> — claude-code | skills | mcp | modelos | herramientas | practicas | tendencias | seguridad | todo"
---

Vas a refrescar el contenido de AI Radar para el tema: **$ARGUMENTS**

Si no se indicó tema, o se indicó `todo`, procesa los ocho temas, pero **en tandas de tres
agentes como máximo**: lanzar muchos a la vez agota el límite de uso de la sesión y los mata
a todos.

## Pasos

### 1. Sitúate

Lee `docs/CONTENT-SCHEMA.md` y `docs/WORKFLOW.md`. Mira qué fichas existen ya en
`content/<tema>/` y cuándo se escribieron:

```bash
grep -h '^updated:' content/<tema>/*.md | sort | uniq -c
```

### 2. Decide qué está caducado

Prioriza por velocidad de cambio del tema:

| Tema | Caduca en |
|---|---|
| `modelos`, `herramientas` | 1 mes |
| `claude-code`, `skills`, `mcp` | 2 meses |
| `seguridad`, `practicas` | 3 meses |
| `tendencias` | 6 meses |

### 3. Lanza los agentes de investigación

Un agente por tema, en segundo plano, con modelo Sonnet. El prompt de cada uno **debe**
incluir, sin excepción:

- La fecha de hoy, y el aviso de que su conocimiento interno llega hasta su fecha de corte
  y que lo posterior no lo sabe.
- La orden de leer `docs/CONTENT-SCHEMA.md` como primer paso.
- La obligación de abrir con WebFetch cada página que cite, y de no citar la que no abra.
- **Escribir cada ficha a disco en cuanto la termine**, no acumular para el final.
- La carpeta exacta de destino y un prefijo de `id` propio, si hay más de un agente en el
  mismo tema.
- La regla de las contradicciones: dos fuentes que no coinciden van en un bloque
  `> [!duda] ...`, con las dos cifras y sus fuentes.
- La prohibición de inventar URLs, cifras, versiones o fechas.

Para las fichas que ya existen, dile al agente que **actualice el archivo existente**
conservando el `id`, y que ponga al día `updated`, `source_span` y las fuentes.

### 4. Valida, verifica y construye

```bash
bash scripts/build.sh
bash scripts/check-links.sh
bash scripts/build-standalone.sh
```

Si `build.sh` da errores, corrígelos ficha por ficha: casi siempre es frontmatter
incompleto o un `id` que no coincide con el nombre del archivo.

Si `check-links.sh` encuentra 404, abre cada una y decide: corregir la URL si el contenido
se movió, o quitar la afirmación que dependía de ella. **No dejes una cita apuntando a una
página que no existe.**

### 5. Publica

```bash
git add -A
git commit -m "Actualiza <tema>: <resumen en una línea>"
git push
```

### 6. Informa

Dile al usuario, en pocas líneas: cuántas fichas se crearon y cuántas se actualizaron, qué
cambió de verdad respecto a la versión anterior (lo nuevo, no el trabajo realizado), y
cualquier cosa que no se pudiera verificar.
