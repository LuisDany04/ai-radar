# AI Radar — notas para trabajar en este repo

Panel de lectura estático sobre IA aplicada al desarrollo. Sin Node, sin Python, sin
framework, sin CDN: solo `bash`, `awk`, `curl` y `base64`. **No introduzcas dependencias.**

## Antes de tocar contenido

Lee [`docs/CONTENT-SCHEMA.md`](docs/CONTENT-SCHEMA.md). Es un contrato, no una sugerencia:
`scripts/build.sh` **aborta** si una ficha no lo cumple.

## Comandos

```bash
bash scripts/build.sh             # valida las fichas y regenera assets/data.js + content/index.json
bash scripts/check-links.sh       # curl contra cada URL citada; escribe docs/link-check.md
bash scripts/build-standalone.sh  # dist/ai-radar.html, todo en un archivo
```

`assets/data.js` y `content/index.json` son **generados**. No los edites a mano; edita el
Markdown de `content/` y vuelve a construir. Haz commit del bundle regenerado: la acción de
GitHub falla si no coincide con `content/`.

## Reglas del contenido

1. Ninguna afirmación con cifra, fecha, precio o versión entra sin fuente.
2. Mínimo 4 fuentes por ficha, al menos una primaria, todas con `pub:` y `visto:`.
3. **Nunca inventes una URL.** Ábrela antes de citarla; `check-links.sh` lo comprueba después.
4. Contradicciones entre fuentes → bloque `> [!duda] ...` con las dos versiones. No elijas una y calles la otra.
5. Opiniones atribuidas a una persona concreta con enlace. Nunca "algunos dicen".
6. Español **neutro y con tildes**. Nada de voseo (`resumí`, `creá`, `venís`): usa
   `resume`, `crea`, `vienes`. El build avisa de palabras sin tilde, pero el aviso no es
   exhaustivo.
7. Una cita literal por ficha como máximo, bajo 15 palabras, entre comillas y atribuida.

## Al investigar con agentes

Está documentado en [`docs/WORKFLOW.md`](docs/WORKFLOW.md) y automatizado en
`/refresh-radar`. Lo que más importa:

- **Tandas de 3 agentes como máximo.** Más agotan el límite de uso de la sesión y mueren todos.
- **Escritura incremental obligatoria**: cada ficha va a disco en cuanto se termina. Ya se
  perdió trabajo dos veces por no hacerlo.
- Cada agente recibe carpeta propia y prefijo de `id` propio, para que no se pisen.
- Dile siempre al agente hasta cuándo llega su conocimiento interno y que lo posterior
  tiene que buscarlo.

## Verifica lo que reportan los agentes

No des por buena una afirmación llamativa solo porque un agente la reporte con confianza.
Ya ocurrió: una ficha atribuía la fusión de comandos y skills a una versión concreta del
changelog, y esa entrada no decía nada de eso. La cita era real, la fecha no.

Para comprobar una versión o una fecha del changelog:

```bash
curl -s https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md | grep -n -i "<término>"
```

Para medir un repo en lugar de creerte una cifra:

```bash
gh api repos/<owner>/<repo> --jq '"\(.stargazers_count) \(.pushed_at)"'
```

## Frontend

- `assets/md.js` — renderizador de Markdown propio. Escapa HTML siempre: el contenido es
  dato, nunca marcado. Si añades una regla nueva, no rompas ese orden.
- `assets/app.js` — estado, filtros, rutas por hash, lector, vista de fuentes.
- `assets/styles.css` — tema claro y oscuro con variables. Sin fuentes externas.
- Todo acceso a `localStorage` va envuelto en `try/catch`: en modo privado lanza excepción.
