---
id: estado-desarrollo-web-2026
title: "Desarrollo web 2026: lo que se consolidó y lo que se abandonó"
track: tendencias
type: dato
level: intermedio
tags: web, frameworks, runtimes, vite, react, meta-frameworks
summary: "React y Vite dominan sin rival cercano, Next.js gana cuota pero pierde satisfacción frente a Astro, Node.js sigue siendo la base pese al avance de Bun, y React dio de baja oficialmente Create React App."
updated: 2026-09-21
reading_minutes: 8
source_span: 2025-02-14..2026-09-21
confidence: media
---

El resumen editorial de la propia encuesta State of JavaScript 2025 lo dice sin rodeos: "la historia ya no es sobre revolución, es sobre consolidación". Después de una década de lanzamientos constantes de frameworks, el ecosistema muestra pocos movimientos bruscos en 2025-2026 — con la excepción notable de la baja oficial de una herramienta histórica.

## Por qué importa

Elegir stack tiene coste de cambio. Saber qué está genuinamente consolidado (con datos de uso, no solo de hype) frente a qué sigue en disputa evita apostar por herramientas que están perdiendo terreno.

## Datos

### Frameworks de frontend y meta-frameworks (State of JS 2025, recolectado sept-nov 2025 sobre 13.002 desarrolladores, resultados desde 2026-01)

| Herramienta | Uso | Satisfacción |
|---|---|---|
| React | 83,6% | 72% |
| Next.js | 58,6% | 55% |
| Express (backend) | 79,9% | 81% |

- El respondente promedio ha usado solo **2,6 frameworks de frontend** en toda su carrera — la propia encuesta lo lee como señal de que "la guerra de frameworks terminó".
- **Astro lidera la satisfacción entre meta-frameworks con un margen de 39 puntos porcentuales sobre Next.js.** La propia State of JS señala la paradoja: "Next.js sigue ganando terreno y dominando la categoría de meta-frameworks, pero al mismo tiempo está perdiendo satisfacción."

### Build tools (State of JS 2025)

| Herramienta | Uso | Satisfacción |
|---|---|---|
| Vite | 84,4% | 78,11% |

> [!duda] State of JS no publicó en las páginas consultadas las cifras numéricas exactas de uso para webpack, esbuild ni Turbopack — solo comentario cualitativo: "realmente pensé que este sería el año en que Vite finalmente supera a webpack" y que "Turbopack también muestra mucho progreso en términos de uso". No se puede citar un porcentaje que la fuente no publica.

### Runtimes de JavaScript (State of JS 2025, sección con 11.141 respondentes, 86% de participación)

| Runtime | Respondentes | % (calculado sobre 11.141) |
|---|---|---|
| Node.js | 10.062 | 90,3% |
| Navegador | 9.682 | 86,9% |
| Bun | 2.321 | 20,8% |
| Deno | 1.244 | 11,2% |

(Los encuestados podían marcar más de un runtime, de ahí que la suma supere el 100%.) La propia State of JS interpreta el tercer puesto de Bun como "una señal positiva del crecimiento del proyecto", pero Node.js sigue siendo dominante por un margen amplio.

### Lo que se dio de baja oficialmente: Create React App

El equipo de React anunció formalmente el fin del mantenimiento activo de Create React App el **2025-02-14**, citando la falta de mantenedores activos y limitaciones para construir aplicaciones de producción de alto rendimiento. Recomienda migrar a un framework (Next.js, React Router o Expo) como opción preferida, o a una herramienta de build como Vite, Parcel o Rsbuild si hay restricciones que impiden adoptar un framework completo.

### Cómo ve la industria a los agentes de codificación: Thoughtworks Technology Radar

En su volumen 34 (edición de abril de 2026), Thoughtworks ubica "software engineering agents" en el anillo **Trial** (probar en proyectos de bajo riesgo, no aún adopción generalizada), mencionando explícitamente Cursor, Cline, Windsurf, GitHub Copilot, la serie Sonnet de Claude, GitHub Copilot Workspace, Qodo, los agentes de Tabnine para Jira, y Amazon Q Developer. Thoughtworks advierte que "la industria todavía carece de una definición compartida del término 'agente'" y llama la atención sobre el riesgo de "deuda cognitiva" — qué dejan de aprender los desarrolladores cuando delegan todo a un asistente.

## Debate

**Postura A — el ecosistema se estabilizó, y eso es saludable:** State of JS interpreta el promedio de 2,6 frameworks usados por carrera y el dominio sostenido de React/Vite como señal de madurez, no de estancamiento.

**Postura B — la estabilidad en frameworks convive con inestabilidad de fondo por la IA:** Thoughtworks señala que, aunque los frameworks se calmaron, la forma de escribir código dentro de ellos está cambiando rápido por los agentes de codificación, y que la industria "todavía carece de una definición compartida" de qué es un agente — es decir, la superficie de disputa se movió de "qué framework" a "qué papel tiene el agente en el flujo de trabajo".

## Fuentes

- [State of JavaScript 2025: Front-end Frameworks](https://2025.stateofjs.com/en-US/libraries/front-end-frameworks/) — Devographics / State of JS — pub: s/f — visto: 2026-09-21
- [State of JavaScript 2025: Meta-Frameworks](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/) — Devographics / State of JS — pub: s/f — visto: 2026-09-21
- [State of JavaScript 2025: Key Takeaways for Dev Teams](https://strapi.io/blog/state-of-javascript-2025-key-takeaways) — Strapi — pub: 2026-03-18 (act. 2026-07-16) — visto: 2026-09-21
- [Sunsetting Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) — React (Meta) — pub: 2025-02-14 — visto: 2026-09-21
- [Software engineering agents — Technology Radar](https://www.thoughtworks.com/radar/tools/software-engineering-agents) — Thoughtworks — pub: vol. 34, 2026-04 — visto: 2026-09-21
