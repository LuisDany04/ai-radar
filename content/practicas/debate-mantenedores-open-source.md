---
id: debate-mantenedores-open-source
title: "La 'Eternal September' del código abierto: mantenedores frente a la marea de PRs e issues con IA"
track: practicas
type: opinion
level: intermedio
tags: mantenedores, open source, pull requests, seguridad, carga de trabajo
summary: "curl cerró su programa de recompensas por seguridad ante una avalancha de reportes generados con IA, Codeberg prohibió repositorios sin supervisión humana y GitHub añadió controles nuevos. Los casos concretos y cómo respondió cada proyecto."
updated: 2026-09-21
reading_minutes: 8
source_span: 2026-01-21..2026-07-27
confidence: media
---

GitHub le puso nombre oficial al problema: "Eternal September" del código abierto, tomando prestado el término de Usenet para describir una entrada masiva y continua de gente nueva que nunca vuelve a bajar. Ashley Wolf, directora de Programas de Código Abierto de GitHub, lo resumió así en el blog oficial de la empresa (12-02-2026): el costo de crear una contribución bajó de golpe con la IA, pero el costo de revisarla no bajó nada. Ese desequilibrio es el centro de este debate.

## Qué cambió

El caso más documentado es el de curl. Daniel Stenberg, su mantenedor principal, anunció el 21 de enero de 2026 el cierre del programa de recompensas por vulnerabilidades en HackerOne a partir de fin de mes, después de que el volumen de reportes se disparara y la mayoría resultara ser lo que él llama "AI slop": reportes que suenan técnicos pero no describen ninguna vulnerabilidad real. Según recoge Simon Sharwood en The Register, Stenberg explicó que buscaba "remove the incentive for people to submit crap and non-well researched reports to us" y admitió que "the current torrent of submissions put a high load on the curl security team". En la semana previa al anuncio, curl recibió siete reportes; ninguno describía una vulnerabilidad real, aunque algunos señalaban errores menores.

## Por qué importa

Un proyecto de código abierto vive de la confianza y el tiempo voluntario de quien lo mantiene. Cuando generar una contribución (un PR, un reporte de seguridad, un issue) pasa a costar segundos gracias a un agente, pero evaluarla sigue tomando el mismo tiempo humano que antes, la relación entre quien contribuye y quien revisa se rompe: el volumen crece mucho más rápido que la capacidad de respuesta.

## Datos

| Caso | Cifra | Fecha |
|---|---|---|
| curl, reportes de seguridad en la semana previa al cierre del programa | 7 reportes, 0 vulnerabilidades reales confirmadas | 21-01-2026 |
| curl, tras reabrir en HackerOne en marzo de 2026 | tasa de vulnerabilidades confirmadas de vuelta a 15-16% (nivel de 2024), frecuencia de reportes duplicada respecto a 2025 | 22-04-2026 |
| Codeberg, votación para prohibir repositorios generados por IA sin supervisión humana | 358 votos a favor, 144 en contra, 14 abstenciones (71% de aprobación) | 23-07-2026 |
| GitHub, controles nuevos de configuración de pull requests | desactivar PRs del todo, o restringirlos a colaboradores existentes | 13-02-2026 |

## Debate

**El problema es real y requiere restringir el acceso**: Codeberg, la alternativa europea a GitHub gestionada como asociación sin fines de lucro, votó el 23 de julio de 2026 prohibir en sus términos de servicio los repositorios "generados principalmente por IA sin supervisión humana", según reportó Jiya Jay Singh en Open Source For You. La justificación oficial de Codeberg fue que "la creación masiva de proyectos automatizados agota infraestructura compartida y presenta riesgos legales debido a la ambigüedad de derechos de autor en código generado". GitHub, sin llegar a prohibir nada, le dio la razón al diagnóstico: Ashley Wolf escribió que las señales tradicionales de compromiso con un proyecto "ya no son tan reveladoras" cuando cualquiera puede generar código limpio en segundos, y respondió con controles a nivel de repositorio para que cada mantenedor decida cuánto abrir la puerta.

**El problema se corrige solo a medida que mejoran los modelos, y cerrar la puerta tiene costos**: el propio caso de curl es la evidencia más citada a favor de esta lectura. Stenberg reabrió el programa en HackerOne en marzo de 2026, un mes después de cerrarlo, y en su blog personal (22-04-2026) documentó que "the slop situation is not a problem anymore": la proporción de reportes que confirman una vulnerabilidad real volvió al nivel previo a la IA (15-16%) y la frecuencia de reportes se duplicó respecto al año anterior, proyectando cerca de 50 vulnerabilidades confirmadas para curl en 2026, una cifra récord. Es decir: cerrar la puerta no fue la solución final, fue un puente hasta que el propio ecosistema de herramientas mejoró.

> [!duda] Stenberg también señala, en el mismo post de abril, un problema nuevo que no existía antes: reportes duplicados, porque distintos investigadores le piden lo mismo a la misma IA y obtienen la misma respuesta. Y advierte que la IA "es buena detectando bugs pero mala juzgando su severidad o escribiendo arreglos correctos", lo que deja la parte más difícil del trabajo igual de humana que antes. No hay cifra pública de cuánto tiempo neto le ahorra a curl este cambio frente al que le sigue costando el triage.

## Dónde queda el debate

Lo que parece asentado: el desequilibrio que describe GitHub —crear contribuciones se abarató, revisarlas no— es real y lo confirman tanto la empresa que opera la plataforma más grande como el mantenedor de uno de los proyectos de infraestructura más críticos de internet. Lo que no está resuelto es si la respuesta correcta es restringir el acceso (Codeberg), dar herramientas de control sin restringir por defecto (GitHub), o simplemente esperar a que los modelos mejoren lo suficiente como para que el problema se vuelva manejable, que es lo que terminó pasándole a curl en cuestión de dos meses. El caso de curl es alentador pero es uno solo: no hay todavía evidencia de que la mejora de calidad que vivió ese proyecto en particular se repita igual en proyectos más pequeños, con menos visibilidad pública y sin un mantenedor dispuesto a "exponer, discutir y ridiculizar" —palabras del propio Stenberg— a quien le hace perder el tiempo.

## Fuentes

- [Welcome to the Eternal September of open source. Here's what we plan to do for maintainers.](https://github.blog/open-source/maintainers/welcome-to-the-eternal-september-of-open-source-heres-what-we-plan-to-do-for-maintainers/) — Ashley Wolf, GitHub — pub: 2026-02-12 — visto: 2026-09-21
- [Curl shutters bug bounty program to stop AI slop](https://www.theregister.com/security/2026/01/21/curl-shutters-bug-bounty-program-to-stop-ai-slop/5063039) — Simon Sharwood, The Register — pub: 2026-01-21 — visto: 2026-09-21
- [daniel.haxx.se, entrada del 22 de abril de 2026](https://daniel.haxx.se/blog/2026/04/22/) — Daniel Stenberg — pub: 2026-04-22 — visto: 2026-09-21
- [New repository settings for configuring pull request access](https://github.blog/changelog/2026-02-13-new-repository-settings-for-configuring-pull-request-access/) — GitHub Changelog — pub: 2026-02-13 — visto: 2026-09-21
- [Codeberg Bans AI-Generated Repositories To Protect Open Source Commons](https://www.opensourceforu.com/2026/07/codeberg-bans-ai-generated-repositories-to-protect-open-source-commons/) — Jiya Jay Singh, Open Source For You — pub: 2026-07-27 — visto: 2026-09-21
