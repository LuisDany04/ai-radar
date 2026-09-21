---
id: cc-uso-costes
title: "Adónde va el presupuesto en Claude Code: límites, subidas y cómo vigilarlo"
track: claude-code
type: dato
level: intermedio
tags: costes, limites de uso, monitorizacion, tokens
summary: "Claude Code cobra por tokens de API bajo el capó incluso en plan de suscripción. Cifras reales de coste por desarrollador, la subida de límites de mayo de 2026 y la polémica de enero."
updated: 2026-09-20
reading_minutes: 6
source_span: 2026-01-05..2026-05-06
confidence: alta
---

Claude Code mide el uso de dos formas: una ventana de sesión que se reinicia cada cinco horas y un límite semanal que cubre todos los modelos. En plan de suscripción (Pro, Max, Team, Enterprise seat-based) ese consumo no se factura en dólares directamente, pero por debajo sigue siendo consumo de tokens de API, y ese consumo es lo que determina cuándo se agota el límite.

## Por qué importa

Anthropic no publica cuotas exactas de tokens para ningún plan de consumidor: el "5x" o "20x" en los nombres de los planes Max son multiplicadores de uso relativos a Pro, no cifras de tokens. Eso hace que el único dato fiable de cuánto vas a gastar sea medirlo tú mismo, sesión a sesión.

## Datos

| Dato | Cifra | Fuente / fecha |
|---|---|---|
| Coste medio por desarrollador activo y día (despliegues enterprise) | ~13 USD | Anthropic, s/f |
| Coste medio por desarrollador y mes | 150-250 USD | Anthropic, s/f |
| Desarrolladores que se mantienen por debajo de 30 USD/día | 90% | Anthropic, s/f |
| Subida de límites de cinco horas para Pro, Max, Team y Enterprise seat-based | +100% (se duplican) | Anthropic, 2026-05-06 |
| Reducción de límites de tokens reportada por un usuario tras terminar un bonus navideño | ~60% según su propio análisis de logs | The Register, 2026-01-05 |

La subida de límites del 2026-05-06 coincidió con un acuerdo de cómputo con SpaceX para usar toda la capacidad de su centro de datos Colossus 1, más de 300 megavatios y 220,000 GPUs NVIDIA adicionales, según el anuncio oficial de Anthropic.

## Ejemplo

Comandos reales para vigilar el consumo dentro de la propia herramienta:

```bash
# Ver coste y tokens de la sesión actual
/usage

# Reporte HTML sobre patrones de trabajo y fricción en sesiones recientes
/insights

# Ver qué consume espacio de contexto ahora mismo
/context
```

Fuera de la herramienta, la comunidad usa `ccusage`, un CLI de terceros creado por ryoppippi que analiza los archivos JSONL locales donde Claude Code guarda cada interacción, sin subir nada a servidores externos, y calcula coste estimado por modelo, sesión o proyecto.

## Debate

En enero de 2026, varios usuarios de Claude Code reportaron en Discord y foros de la comunidad de desarrolladores que sus límites de tokens se agotaban mucho más rápido que antes; uno estimó una reducción de aproximadamente 60% a partir de su propio análisis de logs, y otro usuario de plan Max dijo que antes "solo raramente" tocaba el límite y de pronto lo agotaba en una hora de trabajo ligero un fin de semana. Una fuente anónima especuló que el cambio buscaba reducir costes de cara a una posible salida a bolsa de Anthropic. Anthropic negó categóricamente esa lectura y atribuyó la sensación de reducción a la expiración de un bono navideño: entre el 25 y el 31 de diciembre de 2025 había duplicado los límites de uso como regalo de temporada, aprovechando cómputo ocioso de clientes enterprise de vacaciones, y al volver a los límites estándar los usuarios simplemente estaban reajustándose a la normalidad. La compañía dijo no haber encontrado ningún bug técnico que afectara el consumo de tokens.

> [!duda] No hay forma de verificar de manera independiente si la caída de enero fue solo el fin del bono navideño o un ajuste real de límites, porque Anthropic no publica cifras exactas de cuota por plan.

## Cómo empezar

- Corre `/usage` con regularidad, no solo cuando ya te quedaste sin cuota.
- Si gestionas un equipo, usa `/insights` para ver patrones de fricción, no solo gasto total.
- Instala `ccusage` si quieres tendencias históricas entre sesiones y proyectos, algo que `/usage` no cubre por sí solo.
- Usa Sonnet en vez de Opus para la mayoría de tareas de codificación: Anthropic mismo lo recomienda como la primera palanca de ahorro.
- `/clear` entre tareas no relacionadas: una sesión abierta todo el día sigue reenviando el historial completo con cada mensaje, incluso si la pregunta es corta.

## Fuentes

- [Manage costs effectively](https://code.claude.com/docs/en/costs) — Anthropic — pub: s/f — visto: 2026-09-20
- [Higher usage limits and a SpaceX compute deal](https://www.anthropic.com/news/higher-limits-spacex) — Anthropic — pub: 2026-05-06 — visto: 2026-09-20
- [Claude devs complain about surprise usage limits, Anthropic blames expiring bonus](https://www.theregister.com/2026/01/05/claude_devs_usage_limits/) — The Register — pub: 2026-01-05 — visto: 2026-09-20
- [ccusage](https://ccusage.com/) — ryoppippi — pub: s/f — visto: 2026-09-20
