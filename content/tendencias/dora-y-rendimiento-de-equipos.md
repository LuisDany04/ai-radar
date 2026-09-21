---
id: dora-y-rendimiento-de-equipos
title: "DORA 2025: la IA amplifica lo que el equipo ya era, para bien o para mal"
track: tendencias
type: dato
level: intermedio
tags: dora, devops, rendimiento, equipos, google-cloud
summary: "El informe DORA 2025 (Google Cloud, ~5.000 encuestados) mide 90% de adopción de IA y efectos opuestos: mejora el throughput, empeora la estabilidad de entrega, según el arquetipo del equipo."
updated: 2026-09-21
reading_minutes: 7
source_span: 2025-09-23..2025-09-25
confidence: alta
---

El "2025 State of AI-assisted Software Development Report" de DORA (DevOps Research and Assessment, el equipo de investigación alojado en Google Cloud) es el sucesor del clásico "State of DevOps Report" y en su edición 2025 dedica el informe entero al impacto de la IA. La tesis central, citada literalmente en el material de lanzamiento: la IA actúa como amplificador, no como corrector — "magnifying an organization's existing strengths and weaknesses".

## Por qué importa

Es el estudio de mayor escala (casi 5.000 profesionales) que cruza adopción de IA con las métricas de entrega de software que la propia industria DevOps usa desde hace una década (throughput, estabilidad, etc.), en vez de medir solo percepción de productividad individual.

## Datos

### Ficha técnica

| Campo | Valor |
|---|---|
| Publicador | DORA / Google Cloud, con IT Revolution, GitHub, GitLab, SkillBench y Workhelix como socios de investigación |
| Tamaño de muestra | Casi 5.000 profesionales de tecnología a nivel mundial |
| Datos cualitativos complementarios | Más de 100 horas de entrevistas |
| Fecha de publicación | 2025-09-23 |

### Adopción y uso

| Métrica | Cifra |
|---|---|
| Adopción de IA en 2025 | 90% (+14 puntos porcentuales vs. 2024) |
| Horas diarias medianas dedicadas a IA | 2 horas |
| De quienes escriben código, usan asistencia de IA | 71% |
| Perciben mejora de productividad | Más del 80% |
| Perciben impacto positivo en calidad de código | 59% |
| Confían "mucho" o "totalmente" en el código generado por IA | 24% |
| Confían "poco" o "nada" en el código generado por IA | 30% |

### Efecto de la IA en métricas de entrega (relación medida, no necesariamente causal)

- **Throughput**: relación **positiva** con la adopción de IA.
- **Rendimiento de producto**: relación **positiva** con la adopción de IA.
- **Estabilidad de entrega**: relación **negativa** con la adopción de IA — sigue siendo el punto débil, según DORA.

### Los siete arquetipos de equipo que identifica el informe

| Arquetipo | % de equipos | Descripción |
|---|---|---|
| Harmonious high-achievers | 20% | Sobresalen en todas las dimensiones, ciclo virtuoso de trabajo estable y de baja fricción |
| Pragmatic performers | 20% | Velocidad y estabilidad impresionantes, aunque sin el pico de compromiso del grupo anterior |
| Constrained by process | 17% | Sistemas estables pero procesos ineficientes que consumen el esfuerzo del equipo |
| Stable and methodical | 15% | Trabajo de alta calidad a ritmo sostenible y deliberado |
| Legacy bottleneck | 11% | Reactivos de forma constante; sistemas inestables dictan el trabajo y dañan la moral |
| Foundational challenges | 10% | Modo supervivencia, con brechas significativas en procesos, entorno y resultados |
| High impact, low cadence | 7% | Trabajo de alto impacto pero con bajo throughput y alta inestabilidad |

> [!duda] El informe no publica (o al menos no aparece en las fuentes consultadas) el desglose de throughput/estabilidad/confianza por cada uno de los siete arquetipos — solo las cifras agregadas de la muestra completa. Tratar cualquier cifra "por arquetipo" que no sea el nombre y el porcentaje de equipos como no verificada.

## Debate

**Postura A — la IA sí mejora el desempeño de entrega:** el informe encuentra relación positiva entre adopción de IA y throughput, y más del 80% de los encuestados percibe mejoras de productividad.

**Postura B — el beneficio depende enteramente de la base previa del equipo, y puede ser negativo:** la propia DORA enmarca el hallazgo central como "AI doesn't fix a team; it amplifies what's already there" — los equipos con procesos débiles ven esos mismos problemas amplificados por la IA, no corregidos, y la relación con estabilidad de entrega es negativa en la muestra completa. Ambas posturas provienen del mismo informe; no es un debate entre dos fuentes distintas sino la propia conclusión matizada de DORA.

## Fuentes

- [Announcing the 2025 DORA Report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) — Google Cloud Blog — pub: 2025-09-23 — visto: 2026-09-21
- [How are developers using AI? Inside Google's 2025 DORA report](https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/) — Google Blog — pub: 2025-09-23 — visto: 2026-09-21
- [DORA | State of AI-assisted Software Development 2025](https://dora.dev/dora-report-2025/) — DORA / Google Cloud — pub: 2025-09-23 — visto: 2026-09-21
- [AI's Mirror Effect: How the 2025 DORA Report Reveals Your Organization's True Capabilities](https://itrevolution.com/articles/ais-mirror-effect-how-the-2025-dora-report-reveals-your-organizations-true-capabilities/) — IT Revolution — pub: 2025-09-25 — visto: 2026-09-21
