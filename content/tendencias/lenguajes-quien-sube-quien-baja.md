---
id: lenguajes-quien-sube-quien-baja
title: "Lenguajes de programación: quién sube y quién baja según tres rankings distintos"
track: tendencias
type: dato
level: intro
tags: lenguajes, redmonk, tiobe, octoverse, ranking
summary: "RedMonk, TIOBE y GitHub Octoverse miden cosas distintas y no siempre coinciden: comparación de los tres rankings de lenguajes más citados, con metodología y fecha de cada uno."
updated: 2026-09-21
reading_minutes: 7
source_span: 2025-10-28..2026-09-21
confidence: alta
---

"El lenguaje más popular" depende enteramente de qué se mide: búsquedas en Stack Overflow y pull requests en GitHub (RedMonk), menciones en buscadores y cursos (TIOBE), o contribuyentes reales en repositorios de GitHub (Octoverse). Los tres rankings no siempre están de acuerdo, y eso es parte del dato.

## Por qué importa

Elegir un lenguaje para un proyecto o evaluar dónde invertir en aprenderlo basándose en un solo ranking, sin saber qué mide, lleva a conclusiones equivocadas. Aquí se comparan los tres con su metodología explícita.

## Datos

### RedMonk (enero de 2026, publicado 2026-04-14)

Metodología: combina consultas de pull requests en GitHub Archive (excluyendo forks) con actividad en el explorador de datos de Stack Overflow, para capturar "código" y "discusión" por separado.

| Posición | Lenguaje |
|---|---|
| 1 | JavaScript |
| 2 | Python |
| 3 | Java |
| 4 (empate) | PHP, C# |
| 6 | TypeScript |
| 7 (empate) | CSS, C++ |
| 9 | Ruby |
| 10 | C |
| 11 | Swift |
| 12 | Go |
| 13 | R |
| 14 (empate) | Shell, Kotlin, Scala |
| 17 | PowerShell |
| 18 (empate) | Dart, Objective-C |
| 20 | Rust |

Movimientos notables respecto a la edición anterior: C# subió de la posición 5 a la 4 (empatando con PHP); Dart subió hasta la posición 18, superando sorpresivamente a Rust; Rust cayó a la posición 20; Objective-C continuó su declive.

> [!duda] El propio RedMonk advierte que su metodología está perdiendo fiabilidad: "con herramientas de codificación cada vez más sofisticadas, la relevancia de Stack Overflow ha disminuido", y detectaron "una anomalía anormalmente baja" en pull requests de GitHub durante la segunda mitad del período analizado, sin poder determinar si se debe a datos deficientes o a un cambio real de comportamiento de los desarrolladores (posiblemente commits generados o agrupados por agentes de IA). Fuente: [The RedMonk Programming Language Rankings: January 2026](https://redmonk.com/sogrady/2026/04/14/language-rankings-1-26/) — RedMonk — pub: 2026-04-14 — visto: 2026-09-21.

### TIOBE Index (septiembre de 2026)

Metodología: cuenta resultados de motores de búsqueda para consultas del tipo "<lenguaje> programming"; mide "menciones", no líneas de código ni desarrolladores activos.

| Posición | Lenguaje | Cuota |
|---|---|---|
| 1 | Python | 17,76% |
| 2 | C | 10,28% |
| 3 | C++ | 8,67% |
| 4 | Java | 7,54% |
| 5 | C# | 4,22% |
| 6 | JavaScript | 2,76% |
| 7 | Visual Basic | 2,55% |
| 8 | SQL | 2,16% |
| 9 | R | 1,69% |
| 10 | Rust | 1,34% |

Movimiento notable: Rust entró por primera vez al top 10 de TIOBE en julio de 2026 y se mantuvo en agosto, con su cuota subiendo de 1,34% a 1,45% ese mes.

> [!duda] Una cobertura de TechRepublic sobre el índice TIOBE de septiembre de 2026 citaba "Python remained No. 1 at 18,53%", mientras que la página oficial de TIOBE consultada el 2026-09-21 muestra 17,76% para Python. El índice TIOBE se recalcula mes a mes y la página siempre muestra el valor "actual", así que ambas cifras pueden corresponder a instantáneas de fechas ligeramente distintas dentro de septiembre; no se pudo confirmar cuál es la cifra oficial de cierre de septiembre de 2026 al momento de escribir esta ficha.

### GitHub Octoverse 2025 (publicado 2025-10-28, actualizado 2026-02-28): ranking por contribuyentes reales

Metodología: cuenta contribuyentes (personas con al menos una contribución) a repositorios públicos de GitHub por lenguaje principal, con su crecimiento interanual — es la única de las tres basada en actividad real de desarrollo, no en búsquedas ni discusión.

| Posición | Lenguaje | Contribuyentes | Crecimiento interanual |
|---|---|---|---|
| 1 | TypeScript | 2.636.006 | +66,6% |
| 2 | Python | ~2,6 millones | +48% |
| 3 | JavaScript | ~2,15 millones | +24,79% |
| 4 | Java | — | +20,73% |
| 5 | C# | — | +22,22% |
| 8 | C++ | — | +11,82% |

TypeScript desplazó a Python del primer puesto en esta edición, algo que GitHub atribuye en parte al uso de TypeScript como lenguaje preferido en proyectos generados o asistidos por agentes de codificación con IA.

> [!duda] Los tres rankings **no coinciden en absoluto en el orden**: RedMonk y TIOBE dan primer lugar distinto (JavaScript y Python respectivamente) y ninguno de los dos pone a TypeScript en el top 1, mientras que Octoverse sí lo hace. No es un error: cada uno mide una cosa distinta (discusión+código vs. búsquedas web vs. contribuyentes reales), y esta ficha no elige un "ganador" entre los tres.

## Debate

RedMonk plantea abiertamente la duda de si sus propios datos siguen siendo representativos en la era de la codificación asistida por IA, dado el declive de Stack Overflow como fuente de discusión. GitHub, por su parte, interpreta el ascenso de TypeScript en Octoverse como una consecuencia directa de qué lenguaje "prefieren" los agentes de codificación con IA al generar proyectos nuevos — una afirmación editorial de GitHub sobre sus propios datos, no un hallazgo con metodología causal publicada.

## Fuentes

- [The RedMonk Programming Language Rankings: January 2026](https://redmonk.com/sogrady/2026/04/14/language-rankings-1-26/) — RedMonk — pub: 2026-04-14 — visto: 2026-09-21
- [TIOBE Index](https://www.tiobe.com/tiobe-index/) — TIOBE — pub: 2026-09 (actualización mensual) — visto: 2026-09-21
- [TIOBE Index September 2026: Julia Nears Top 20](https://www.techrepublic.com/article/news-tiobe-september-2026-julia-nears-top-20/) — TechRepublic — pub: 2026-09 — visto: 2026-09-21
- [Octoverse: A new developer joins GitHub every second as AI leads TypeScript to #1](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/) — GitHub — pub: 2025-10-28 (act. 2026-02-28) — visto: 2026-09-21
