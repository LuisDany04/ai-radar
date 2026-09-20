---
id: skills-como-escribir-una-buena-skill
title: "Cómo escribir una skill que Claude realmente use bien"
track: skills
type: guia
level: intermedio
tags: agent-skills, buenas-practicas, description, evaluacion, skillmd
summary: "Reglas de redacción oficiales para SKILL.md: cómo escribir la description para que dispare bien, errores comunes con ejemplos antes/después, y el método de evaluación que recomienda Anthropic antes de escribir documentación."
updated: 2026-09-20
reading_minutes: 9
source_span: 2025-10-16..2026-09-20
confidence: alta
---

La guía oficial de Anthropic para escribir skills parte de una premisa incómoda: la mayoría de las skills fallan no por instrucciones mal escritas, sino porque el campo `description` no dispara cuando debería, o dispara cuando no debería. El resto de los errores comunes son variaciones de "tratar a Claude como si no supiera nada" o "no probar la skill antes de compartirla".

## Por qué importa

Con potencialmente más de 100 skills instaladas a la vez, `description` es el único texto que Claude ve de una skill antes de decidir si la usa. Una descripción vaga compite en desventaja contra una específica, y una skill que nunca se dispara es indistinguible de una que no existe.

## Ejemplo

**Regla 1 — Tercera persona siempre.** La descripción se inyecta en el system prompt; el punto de vista inconsistente rompe la detección.

- Bien: `"Processes Excel files and generates reports"`
- Mal: `"I can help you process Excel files"`
- Mal: `"You can use this to process Excel files"`

**Regla 2 — Específica, no vaga.** Debe decir qué hace y cuándo usarla, con términos clave que el usuario realmente escribiría.

Antes (mala, del propio checklist oficial):
```yaml
description: Helps with documents
```

Después (buena, ejemplo oficial de la skill de PDF):
```yaml
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

**Regla 3 — Concisión en el cuerpo.** Cada token del SKILL.md compite con el resto de la conversación una vez cargado. La premisa de partida: "Claude ya es muy inteligente" — solo agregar contexto que Claude de verdad no tiene.

Antes (mala, ~150 tokens, del checklist oficial):
```markdown
## Extract PDF text

PDF (Portable Document Format) files are a common file format that contains
text, images, and other content. To extract text from a PDF, you'll need to
use a library. There are many libraries available for PDF processing, but
pdfplumber is recommended because it's easy to use and handles most cases well.
First, you'll need to install it using pip. Then you can use the code below...
```

Después (buena, ~50 tokens):
~~~markdown
## Extract PDF text

Use pdfplumber for text extraction:

```python
import pdfplumber

with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```
~~~

**Regla 4 — Grados de libertad según fragilidad de la tarea.** Instrucciones en texto libre ("high freedom") cuando hay múltiples caminos válidos; pseudocódigo con parámetros ("medium freedom") cuando existe un patrón preferido con variación aceptable; script exacto sin parámetros ("low freedom") cuando la operación es frágil y debe seguir una secuencia exacta — el ejemplo oficial es una migración de base de datos: `python scripts/migrate.py --verify --backup`, sin agregar flags.

## Datos

| Regla técnica | Valor |
|---|---|
| Longitud máxima de `name` | 64 caracteres, minúsculas/números/guiones |
| Longitud máxima de `description` | 1.024 caracteres |
| Cuerpo recomendado de SKILL.md | menos de 500 líneas |
| Profundidad de referencias | un solo nivel desde SKILL.md (nada de A→B→C) |
| Modelos con los que probar | Haiku, Sonnet y Opus — lo que sobra para Opus puede faltarle a Haiku |
| Evaluaciones mínimas recomendadas antes de compartir | 3 |

## Errores comunes (anti-patrones documentados oficialmente)

- **Rutas estilo Windows** (`scripts\helper.py`): fallan en sistemas Unix; usar siempre `/`.
- **Demasiadas opciones**: "puedes usar pypdf, o pdfplumber, o PyMuPDF, o..." en vez de dar un default con una única excepción documentada.
- **Constantes mágicas sin justificar** en scripts (`TIMEOUT = 47 # Why 47?`) en vez de documentar el porqué del valor.
- **Delegar errores a Claude** en vez de manejarlos en el script (`return open(path).read()` sin try/except).
- **Información sensible al tiempo** ("antes de agosto de 2025 usa la API vieja, después la nueva") que se vuelve obsoleta; en su lugar, una sección "patrones antiguos" con fecha de deprecación.
- **Terminología inconsistente**: mezclar "API endpoint", "URL", "ruta de API" para lo mismo dificulta que Claude siga las instrucciones.
- **Nombres genéricos**: `helper`, `utils`, `tools`, `documents`, `data` no ayudan a que Claude ni el equipo entiendan qué hace la skill.

## Cómo probarla

Anthropic recomienda invertir el orden habitual: **crear las evaluaciones antes de escribir la documentación extensa**, para no terminar documentando problemas imaginarios.

1. Correr a Claude en tareas representativas sin la skill y anotar fallas concretas.
2. Construir al menos tres escenarios de evaluación que reproduzcan esas fallas, con este formato:

```json
{
  "skills": ["pdf-processing"],
  "query": "Extract all text from this PDF file and save it to output.txt",
  "files": ["test-files/document.pdf"],
  "expected_behavior": [
    "Successfully reads the PDF file using an appropriate PDF processing library or command-line tool",
    "Extracts text content from all pages in the document without missing any pages",
    "Saves the extracted text to a file named output.txt in a clear, readable format"
  ]
}
```

3. Medir el desempeño base sin la skill.
4. Escribir solo las instrucciones mínimas necesarias para pasar las evaluaciones.
5. Iterar: correr, comparar contra el base, ajustar.

No existe todavía un runner de evaluaciones incorporado; cada quien arma el suyo. Anthropic también recomienda un patrón de dos instancias: una "Claude A" ayuda a redactar y refinar la skill, otra "Claude B", fresca, la usa en tareas reales; las observaciones sobre cómo B navega los archivos (¿sigue las referencias?, ¿relee el mismo archivo una y otra vez?) alimentan la siguiente iteración de A.

## Debate

**Postura de la documentación oficial:** el problema es casi siempre de redacción — descripción vaga, exceso de opciones, exceso de explicación — y se corrige con las reglas de este listado.

**Postura de análisis independientes en 2026** (ver la ficha sobre colecciones comunitarias): incluso skills bien escritas pueden degradar el resultado simplemente por acumulación — más instrucciones compitiendo por el mismo contexto no es lo mismo que mejor guía, y la sensación de "más control" puede ser en realidad "más ruido". La recomendación práctica coincidente entre ambas posturas: menos skills, mejor escritas y con evaluaciones propias, en vez de instalar colecciones completas sin filtrar.

## Cómo empezar

1. Escribe primero 3 tareas reales que la skill debería resolver y verifica que Claude falla en ellas sin la skill.
2. Redacta la `description` en tercera persona, con lo que hace y cuándo usarla, usando las palabras que un usuario real escribiría.
3. Escribe el cuerpo asumiendo que Claude ya sabe lo básico del dominio.
4. Si el cuerpo se acerca a 500 líneas, mueve detalle a archivos referenciados desde SKILL.md (nunca más de un nivel de profundidad).
5. Corre las 3 evaluaciones con al menos Haiku y Sonnet antes de compartirla.

## Fuentes

- [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) — Anthropic (Claude Platform Docs) — pub: s/f — visto: 2026-09-20
- [Specification](https://agentskills.io/specification) — agentskills.io — pub: s/f — visto: 2026-09-20
- [anthropics/skills — skills/skill-creator/SKILL.md](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md) — Anthropic (GitHub) — pub: 2026-09-10 — visto: 2026-09-20
- [anthropics/skills — template/SKILL.md](https://github.com/anthropics/skills/blob/main/template/SKILL.md) — Anthropic (GitHub) — pub: 2026-09-10 — visto: 2026-09-20
- [Best Claude Code Skills: Which Are Actually Worth It](https://www.ksred.com/best-claude-code-skills-which-ones-are-actually-worth-installing/) — Kyle Redelinghuys — pub: 2026-08-10 — visto: 2026-09-20
