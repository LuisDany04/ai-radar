---
id: pesos-abiertos-competitivos-2026
title: "Pesos abiertos en 2026: quién compite de verdad y bajo qué licencia"
track: modelos
type: dato
level: intermedio
tags: pesos-abiertos, licencias, deepseek, qwen, mistral, kimi, glm, open-source
summary: "DeepSeek, Qwen, Mistral, GLM y Kimi K3 en septiembre de 2026: parámetros, licencia, contexto y precio de API, con la situación (poco clara) de Meta."
updated: 2026-09-20
reading_minutes: 9
source_span: 2025-04-05..2026-09-20
confidence: media
---

Cinco laboratorios publican pesos que cualquiera puede descargar y ejecutar, con licencias que van de permisivas de verdad (MIT, Apache 2.0) a licencias propias con condiciones comerciales. Todos son modelos de mezcla de expertos (MoE) grandes: entre 675 mil millones y 2.8 billones de parámetros totales, con solo una fracción activa por token. Esta ficha reúne lo verificable en las tarjetas de modelo y anuncios oficiales; donde las fuentes se contradicen, se marca explícitamente.

## Datos

| Modelo | Organización | Parámetros (total/activos) | Contexto | Licencia | Precio API entrada/salida |
|---|---|---|---|---|---|
| DeepSeek V4 Pro | DeepSeek | 1.6T / 49B | 1M tokens | MIT | no verificado en esta sesión |
| Qwen3.8-Max | Alibaba | 2.4T / no revelado por Alibaba | 1M tokens (991K máx. entrada) | pendiente de pesos abiertos al momento del anuncio | $2 / $6 (caché: $0.25) |
| Mistral Large 3 | Mistral AI | 675B / 41B | no verificado en esta sesión | Apache 2.0 | $0.50 / $1.50 |
| GLM-5.3 | Z.ai (Zhipu) | 753B / no verificado | 1M tokens, salida máx. 128K | licencia propia "GLM-5.3" (no MIT) | no verificado en esta sesión |
| Kimi K3 | Moonshot AI | 2.8T / 104B | 1M tokens | "Kimi K3 License" (MIT modificada) | $3 fresco / $0.30 caché / $15 salida |

Notas sobre licencias, verificadas en las tarjetas de modelo:

- **Mistral Large 3** es Apache 2.0 sin condiciones adicionales, la licencia más permisiva de esta lista.
- **DeepSeek V4 Pro** es MIT según su tarjeta en Hugging Face.
- **Kimi K3** usa una licencia MIT modificada: permite uso comercial, modificación y distribución libres, con una condición — si una empresa opera un servicio de "Model as a Service" con más de $20 millones de ingresos en cualquier periodo de 12 meses, debe firmar un acuerdo separado con Moonshot antes de comercializar.
- **GLM-5.3** se publica bajo una licencia propia distinta de MIT o Apache, según su tarjeta de modelo; GLM-5.3-Flash (la variante más chica de la misma familia) sí usa MIT.
- **Qwen3.8-Max**: al momento del anuncio (3 de agosto de 2026), Alibaba lo lanzó primero como servicio de pago vía API, sin tabla de benchmarks, licencia ni conteo de parámetros activos publicados; los pesos abiertos se anunciaron para "la semana siguiente" en el mismo anuncio.

## Por qué importa

Estos modelos ya no son "la opción barata": Kimi K3, con 2.8 billones de parámetros totales, es —según su propio fabricante— el modelo de pesos abiertos más grande publicado hasta la fecha, y su precio de API estándar ($3/$15) iguala el precio estándar de Claude Sonnet 5 ($2/$10 en promoción, $3/$15 sin ella). La ventaja de un modelo de pesos abiertos ya no es solo el precio por token en la API del propio fabricante: es la posibilidad de auto-hospedarlo (costo = cómputo propio, sin cobro por token de un tercero) o de comprarlo más barato a través de proveedores alternativos. OpenRouter, por ejemplo, ofrece Kimi K3 desde siete proveedores distintos, la mayoría al mismo precio que Moonshot AI directamente.

## Debate

**Postura 1 — el open weight chino cerró la brecha con el open weight occidental.** Según el ranking de uso real de OpenRouter (datos al 19 de septiembre de 2026), Qwen3.8-Max empata en segundo lugar con Claude Fable 5.1 en el índice de inteligencia de Artificial Analysis (53.4 ambos), por delante de GPT-6 Astra (52.7) en ese mismo ranking de tokens procesados. Los pesos abiertos de Alibaba, Moonshot AI (Kimi) y Z.ai (GLM) dominan el uso de pesos abiertos de alto volumen que antes ocupaban modelos occidentales.

**Postura 2 — Meta, el pionero de los pesos abiertos, dejó de ser el referente.** El blog oficial de Meta (ai.meta.com/blog) no muestra en 2026 ningún anuncio de una nueva generación Llama; sus publicaciones recientes son sobre la línea "Muse" (Muse Spark, Muse Image, Muse Video). Múltiples coberturas de prensa independientes describen a Muse Spark, lanzado el 8 de abril de 2026 por la nueva Superintelligence Labs de Meta, como el primer modelo de frontera **cerrado** de la compañía, en lo que varias fuentes describen como un giro respecto a la estrategia histórica de pesos abiertos de Llama.

> [!duda] Encontré información fuertemente contradictoria sobre "Llama 5" y una supuesta reapertura de pesos en agosto de 2026: varios sitios de contenido afirman fechas, tamaños de parámetros y ventanas de contexto específicas (hasta "5M tokens" o "10M tokens") para lanzamientos de Llama en 2026, pero el blog oficial de Meta no lista ninguno de esos anuncios entre sus publicaciones, y la única entrada oficial de Meta sobre "Llama 4" que pude verificar está fechada el 5 de abril de **2025**, no 2026. No hay forma de confirmar con una fuente primaria si Meta lanzó una nueva generación Llama en 2026 o si esas afirmaciones mezclan el lanzamiento de 2025 con fechas de otro año. Dado el mandato de no inventar lanzamientos, esta ficha no afirma ni una cosa ni la otra sobre "Llama 5" o "Llama 4 con pesos abiertos en agosto de 2026".

## Cómo empezar

1. Si necesitas la licencia más simple para uso comercial sin condiciones de ingresos, Mistral Large 3 (Apache 2.0) o DeepSeek V4 Pro (MIT) son las opciones verificadas más limpias de esta lista.
2. Si tu volumen de negocio como servicio podría superar los $20M anuales, revisa la cláusula específica de la licencia de Kimi K3 antes de construir un producto comercial sobre él.
3. Antes de citar "el mejor modelo de pesos abiertos", verifica la fecha del ranking: este es un terreno que cambia de líder cada pocas semanas (Qwen3.8-Max, GLM-5.3 y Kimi K3 se lanzaron con menos de un mes de diferencia entre julio y agosto de 2026).

## Fuentes

- [Introducing Mistral 3](https://mistral.ai/news/mistral-3/) — Mistral AI — pub: 2025-12-02 — visto: 2026-09-20
- [DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) — Hugging Face / DeepSeek — pub: s/f — visto: 2026-09-20
- [Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) — Hugging Face / Moonshot AI — pub: 2026-07-29 — visto: 2026-09-20
- [GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) — Hugging Face / Z.ai — pub: s/f — visto: 2026-09-20
- [GLM-5.3 - Overview](https://docs.z.ai/guides/llm/glm-5.3) — Z.ai — pub: s/f — visto: 2026-09-20
- [Alibaba Qwen Releases Qwen3.8-Max](https://www.marktechpost.com/2026/08/03/alibaba-qwen-releases-qwen3-8-max/) — MarkTechPost — pub: 2026-08-03 — visto: 2026-09-20
- [Meta AI blog](https://ai.meta.com/blog/) — Meta — pub: s/f (listado consultado el 2026-09-20) — visto: 2026-09-20
- [The Llama 4 herd: The beginning of a new era of natively multimodal AI innovation](https://ai.meta.com/blog/llama-4-multimodal-intelligence/) — Meta — pub: 2025-04-05 — visto: 2026-09-20
- [Top AI Models on OpenRouter (rankings)](https://openrouter.ai/rankings) — OpenRouter — pub: s/f (datos al 2026-09-19) — visto: 2026-09-20
