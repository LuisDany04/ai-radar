---
id: precios-y-economia-herramientas
title: "Cómo cobran las herramientas agénticas y dónde está la trampa"
track: herramientas
type: dato
level: intermedio
tags: precios, facturacion, costos, copilot, cursor, devin, claude-code
summary: "De precio fijo a facturación por token: en 2026 varias herramientas migraron a billing basado en consumo y produjeron facturas 10 a 25 veces más altas de lo esperado. Casos, cifras y cómo evitarlo."
updated: 2026-09-21
reading_minutes: 8
source_span: 2025-06-01..2026-09-21
confidence: media
---

El patrón de 2026 es consistente: una herramienta que cobraba precio fijo cambia a facturación por consumo real (tokens, ACUs, créditos), la promociona como "más justa" y una fracción de sus usuarios recibe una factura entre 10 y 25 veces mayor a lo que pagaban antes. Pasó con Cursor en 2025 y con GitHub Copilot en junio de 2026. Esta ficha reúne los casos documentados y cifras concretas de facturación real, no las tablas de precios de marketing.

## Por qué importa

El precio de lista casi nunca es el precio real en un flujo de trabajo agéntico: una tarea de "reescribir este módulo" puede disparar cientos de miles de tokens sin que el usuario sepa cuántas vueltas de razonamiento, llamadas a herramientas o reintentos ocurrieron por dentro. Entender el modelo de facturación de cada herramienta importa tanto como entender sus capacidades.

## Datos

Cómo cobra cada herramienta a septiembre de 2026:

| Herramienta | Modelo de cobro | Qué consume el medidor |
|---|---|---|
| GitHub Copilot | Créditos de IA desde el 1-jun-2026 (antes: Premium Request Units) | Tokens de entrada, salida y caché según la tarifa publicada de cada modelo; completions normales no consumen créditos |
| Cursor | Créditos por uso desde jun-2025 (reemplazó "fast requests" fijos) | Costo real de la llamada al modelo subyacente |
| Devin | ACUs (Agent Compute Units) a $2.25 cada uno, sobre el plan base | Cada minuto de trabajo autónomo activo (~15 min por ACU) |
| Zed | $5 de crédito incluido en el plan Pro, luego tarifa de API del proveedor +10% | Tokens de los modelos que Zed aloja |
| Amp | Pago por uso en el plan Hobby ("orbs"); $20/mes fijo en Individual | Uso agregado por sesión ("minutos de orbin'") |
| Claude Code | Incluido en la cuota del plan (Pro/Max/Team), o pago por token vía API de consola | Comparte el mismo pool de uso que el resto de la cuenta Claude |

## Casos de factura sorpresa documentados

**GitHub Copilot, junio de 2026.** El 1 de junio de 2026 GitHub reemplazó las "Premium Request Units" por "GitHub AI Credits", cobrando por token según la tarifa publicada de cada modelo. TechCrunch recogió el caso de un desarrollador cuyo costo mensual proyectado saltó de $29 a cerca de $750, y otro que pasó de $50 a unos $3,000; el hilo oficial de GitHub Community acumuló más de 400 comentarios. Un usuario de Reddit citado por TechCrunch resumió el enojo: "What a joke. This new usage model is just stupidly expensive." Microsoft no respondió a la solicitud de comentario de TechCrunch antes de la publicación, el 30 de mayo de 2026.

**Cursor, junio–julio de 2025.** Cursor sustituyó sus "fast requests" fijos por créditos basados en el costo real de la llamada al modelo. Según un post ampliamente compartido, un equipo vio agotarse una suscripción anual de $7,000 en un solo día, con cargos diarios de entre $10 y $20 apareciendo sin aviso. El fundador Michael Truell reconoció públicamente que el lanzamiento se manejó mal; la empresa añadió límites de gasto configurables y emitió reembolsos para los casos más graves, pero no revirtió el modelo de precios.

**Devin, ACUs.** Según usuarios citados por múltiples guías de precios, la mayoría de las "facturas sorpresa" de Devin ocurren en las primeras dos semanas de uso: una tarea de complejidad media puede consumir entre 30 y 60 ACUs, que a $2.25 cada uno cuestan entre $67 y $135 por una sola tarea, encima de la cuota mensual del plan. Cognition añadió topes de presupuesto configurables en febrero de 2026 después de estas quejas.

**Facturas reportadas en foros comunitarios (sin atribución individual verificable):** una guía de gestión de costos documenta casos de un desarrollador independiente con una factura de Claude Code de $847 en un mes, y $312 por seis horas de trabajo con agentes en paralelo — cifras presentadas como representativas de quejas en Reddit y Hacker News, no como hechos verificados por la fuente.

> [!duda] Dos páginas de GitHub que deberían decir lo mismo no coinciden: la landing de precios (`github.com/features/copilot/plans`) indica que el plan Pro de $10/mes incluye $15 en créditos mensuales, mientras que el post oficial del blog de GitHub sobre el cambio de facturación indica que Pro incluye $10 en créditos (equivalente al precio del plan). No se pudo confirmar cuál es la cifra vigente al 2026-09-21 sin una tercera fuente que las reconcilie.

## Debate

**La justificación de las empresas:** GitHub argumenta que "Copilot is not the same product it was a year ago" y que el uso agéntico habilita "sesiones de codificación largas y de múltiples pasos" con demandas computacionales mucho mayores que las completions simples que justificaban el precio fijo original — de ahí la necesidad de alinear precio con consumo real.

**La respuesta de los usuarios:** un comentarista citado por TechCrunch responsabiliza directamente al diseño del producto, no al usuario: "The only one at fault here is Microsoft. Microsoft provided this billing method and they kept making it easier and easier to burn through massive numbers of tokens." Otros usuarios, sin embargo, atribuyen las facturas más extremas a patrones de uso descuidados ("vibe coding" con iteraciones infladas) más que al modelo de precios en sí.

## Cómo empezar

- Antes de activar modo agente en cualquier herramienta nueva, configura un tope de gasto (spending cap) si la herramienta lo permite — Copilot, Cursor y Devin lo ofrecen desde 2026.
- Activa el caching de prompts cuando esté disponible: reduce hasta un 90% el costo de los tokens repetidos de contexto, según las guías de optimización de costos revisadas.
- Antes de comprometerte a un plan anual, corre una semana típica de trabajo real bajo el modelo de facturación por uso y extrapola — no confíes en el precio de entrada anunciado.

## Fuentes

- [GitHub Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) — The GitHub Blog — pub: s/f — visto: 2026-09-21
- ['What a joke': GitHub Copilot's new token-based billing spurs consternation among devs](https://techcrunch.com/2026/05/30/what-a-joke-github-copilots-new-token-based-billing-spurs-consternation-among-devs/) — TechCrunch — pub: 2026-05-30 — visto: 2026-09-21
- [GitHub Copilot · Plans & pricing](https://github.com/features/copilot/plans) — GitHub — pub: s/f — visto: 2026-09-21
- [Cursor's Pricing Disaster: The Full Timeline](https://www.wearefounders.uk/cursors-pricing-disaster-the-full-timeline-of-how-an-ai-coding-darling-burned-its-most-loyal-users/) — We Are Founders — pub: s/f — visto: 2026-09-21
- [Cursor — Pricing](https://cursor.com/pricing) — Anysphere — pub: s/f — visto: 2026-09-21
- [Devin — Plans and Pricing](https://devin.ai/pricing) — Cognition — pub: s/f — visto: 2026-09-21
- [AI Coding Agent Bills Out of Control? A Developer's Survival Guide (2026)](https://www.coderouter.io/blog/ai-coding-agent-bills-survival-guide-2026) — CodeRouter — pub: s/f — visto: 2026-09-21
- [Zed — Pricing](https://zed.dev/pricing) — Zed Industries — pub: s/f — visto: 2026-09-21
- [Amp — Pricing](https://ampcode.com/pricing) — Sourcegraph / Amp — pub: s/f — visto: 2026-09-21
