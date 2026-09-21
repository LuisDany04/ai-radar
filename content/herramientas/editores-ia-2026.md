---
id: editores-ia-2026
title: "Editores con IA en 2026: el año en que Cursor terminó siendo de SpaceX"
track: herramientas
type: opinion
level: intermedio
tags: cursor, windsurf, zed, vscode, copilot, adquisiciones, editores
summary: "Cursor fue comprada por SpaceX por 60,000 millones de dólares, Windsurf desapareció como marca dentro de Devin, y VS Code tuvo que revertir un cambio que atribuía código humano a Copilot. El resumen corporativo de los editores con IA en 2026."
updated: 2026-09-21
reading_minutes: 9
source_span: 2025-11-13..2026-09-21
confidence: alta
---

Si en enero de 2026 alguien hubiera dicho que la empresa de cohetes de Elon Musk terminaría siendo dueña del editor de código con IA más popular del año, habría sonado a broma de Hacker News. No lo fue: SpaceX cerró la adquisición de Cursor (Anysphere) el 14 de agosto de 2026 por 60,000 millones de dólares. Fue el movimiento corporativo más grande del año en esta categoría, pero no el único: Windsurf dejó de existir como marca, y Microsoft tuvo que pedir disculpas públicas por un cambio que le atribuía a Copilot código escrito por humanos.

## Por qué importa

Los cuatro editores de esta ficha —Cursor, Windsurf, Zed y VS Code + Copilot— compiten por el mismo bucle de trabajo diario del desarrollador, pero en 2026 la historia relevante no fue de features sino de propiedad: quién es dueño de cada uno y qué incentivos trae esa propiedad. Un editor que enruta cada llamada a un modelo de un competidor (Anthropic, OpenAI) mientras su dueño tiene sus propios modelos de IA es una tensión estructural nueva que no existía hace un año.

## Datos

| Editor | Empresa (sept. 2026) | Movimiento corporativo del año | Fecha |
|---|---|---|---|
| Cursor | Anysphere → subsidiaria de SpaceX | Adquisición por $60,000M en acciones (389.3M acciones Clase A de SpaceX); previamente compró Continue.dev | Cierre: 2026-08-14 |
| Windsurf | Cognition (ex Codeium) | Rebrandeado a "Devin Desktop"; Cascade (el agente original) fue retirado | Rebrand: 2026-06-02 |
| Zed | Zed Industries | Sin adquisición ni controversia mayor reportada en 2026 | — |
| VS Code + Copilot | Microsoft/GitHub | Reversión pública tras atribuir código humano a Copilot por defecto en cada commit | Bug: 2026-04-16, revertido: 2026-05-03 |

## El año de las adquisiciones

**SpaceX compra Cursor.** El 16 de junio de 2026 SpaceX anunció un acuerdo que le daba a Cursor 10,000 millones de dólares por una colaboración continua en IA de código y trabajo de conocimiento, con la opción de comprar la empresa entera por 60,000 millones antes de fin de año. Ejerció esa opción y cerró la compra el 14 de agosto de 2026, en una operación totalmente en acciones (389,289,254 acciones Clase A de SpaceX transferidas a los accionistas de Anysphere). Cursor lo justificó como acceso a cómputo: la razón declarada fue tener "acceso a la flota de GPUs más grande del mundo" (Colossus, en Memphis, con cerca de 200,000 GPUs Nvidia y planes de escalar a un millón). Tres días después del cierre, el 17 de agosto de 2026, Cursor lanzó "Origin", un sistema propio de hosting de código con repositorios, pull requests y sincronización con GitHub — su primer movimiento de producto como parte de SpaceX.

Lo que no cambió, según los propios términos post-cierre: los precios (Hobby gratis, Pro $20, Pro+ $60, Ultra $200 por mes) y el acceso multi-modelo (Claude, GPT y Gemini siguen disponibles junto a los modelos propios de Cursor). Lo que sí genera dudas es el incentivo de fondo: cada llamada de API de Cursor enrutada a Anthropic es ingreso que sale del ecosistema de SpaceX, una tensión que un análisis de la adquisición resume así: las garantías actuales de que "nada ha cambiado" conviven con un incentivo económico de fondo para internalizar el costo de cómputo de IA.

> [!duda] Uno de los análisis de la adquisición cita como precedente de riesgo de privacidad que "Grok Build, el asistente de código de xAI, subía silenciosamente repositorios Git completos al almacenamiento de xAI — no solo los archivos que leía activamente". No se pudo verificar esta afirmación sobre Grok Build de forma independiente en esta ficha; se incluye como una preocupación planteada por la fuente, no como hecho confirmado.

**Cognition disuelve la marca Windsurf.** El 2 de julio de 2025 Cognition anunció la adquisición de la propiedad intelectual, producto y marca de Windsurf. Casi un año después, el 2 de junio de 2026, completó la consolidación: Windsurf pasó a llamarse "Devin Desktop" en una actualización automática que cambió nombre, ícono y material de marketing sin que el usuario tuviera que hacer nada. Cascade, el agente original integrado en el editor, quedó con fecha de retiro para el 1 de julio de 2026, reemplazado por "Devin Local" como agente local por defecto.

## El tropiezo de Microsoft con la atribución de IA

El 16 de abril de 2026, una product manager de Microsoft envió un pull request que cambió el valor por defecto de la opción `git.addAICoAuthor` de "off" a "all"; un miembro del equipo de VS Code lo revisó y fusionó el mismo día, sin nota de lanzamiento ni aviso visible. El efecto: VS Code empezó a agregar automáticamente a Copilot como coautor en cada commit que involucrara cualquier interacción con IA — incluyendo autocompletado simple — y, por un error técnico adicional, la etiqueta aparecía incluso cuando el usuario tenía las funciones de IA explícitamente desactivadas. Un desarrollador describió el problema de forma muy concreta: reemplazó el mensaje de commit generado por Copilot con uno propio, hizo commit, y la línea de coautoría de Copilot siguió apareciendo en su historial.

La reacción no se hizo esperar: un hilo de Hacker News sobre el tema superó los 1,220 puntos. El 3 de mayo de 2026 Microsoft revirtió el cambio; el mismo ingeniero que había fusionado el PR original se disculpó públicamente en Hacker News: "sorry for mistakenly turning on this feature by default without sufficient scrutiny."

## Zed, el que no tuvo drama

De los cuatro editores de esta ficha, Zed es el único que no protagonizó una adquisición, rebrand o controversia pública mayor en 2026: siguió con su modelo Personal gratis / Pro $10 por mes / Business $30 por asiento, y su repositorio en GitHub (licencia GPL-3.0 en el núcleo) sigue activo con más de 90,000 estrellas. Que no haya noticia no es prueba de nada por sí sola, pero contrasta con el resto de la categoría.

## Cómo empezar

- Si te preocupa la neutralidad de proveedor de Cursor tras pasar a manos de SpaceX, monitorea el cuarto trimestre de 2026: varias fuentes de la industria señalan esa fecha como cuando se sabrá si los modelos propios de SpaceXAI se vuelven opcionales o predeterminados dentro de Cursor.
- Si usabas Windsurf, no necesitas migrar nada de forma urgente: la actualización a Devin Desktop fue automática y los planes de precio no cambiaron, aunque perdiste el agente Cascade original.
- En VS Code, revisa manualmente tu configuración `git.addAICoAuthor` si te importa el historial de autoría de tus commits — el valor por defecto volvió a "off" el 3 de mayo de 2026, pero si actualizaste la extensión durante el intervalo de tres semanas en que estuvo activo por defecto, conviene confirmar que no quedó sobrescrito en tu configuración local.

## Fuentes

- [Three Days After Closing, Cursor Shipped Code Hosting](https://www.digitalapplied.com/blog/spacex-anysphere-close-first-product-move) — Digital Applied — pub: s/f — visto: 2026-09-21
- [SpaceX acquired Cursor for $60B - what changes for developers](https://fireup.pro/news/spacex-cursor-acquisition-developers-2026) — Fireup — pub: s/f — visto: 2026-09-21
- [Cursor — Past, Present, and Future (Series D)](https://cursor.com/blog/series-d) — Cursor / Anysphere — pub: 2025-11-13 — visto: 2026-09-21
- [Cognition's acquisition of Windsurf](https://cognition.com/blog/windsurf) — Cognition — pub: 2025-07-14 — visto: 2026-09-21
- [Typical Microsoft! Turns Out VS Code Was Adding Copilot as a Git Co-Author Without Telling Anyone](https://itsfoss.com/news/vs-code-credits-copilot-for-human-work/) — It's FOSS — pub: s/f — visto: 2026-09-21
- [zed-industries/zed](https://github.com/zed-industries/zed) — GitHub / Zed Industries — pub: 2026-09-21 — visto: 2026-09-21
- [Zed — Pricing](https://zed.dev/pricing) — Zed Industries — pub: s/f — visto: 2026-09-21
- [Cursor — Pricing](https://cursor.com/pricing) — Anysphere — pub: s/f — visto: 2026-09-21
