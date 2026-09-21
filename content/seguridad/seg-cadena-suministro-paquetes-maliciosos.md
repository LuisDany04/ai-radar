---
id: seg-cadena-suministro-paquetes-maliciosos
title: "Cadena de suministro: paquetes maliciosos, extensiones falsas y qué implica dejar a un agente instalar dependencias"
track: seguridad
type: guia
level: intermedio
tags: supply-chain, npm, pypi, extensiones, slopsquatting, dependencias
summary: "Slopsquatting, gusanos que se propagan solos entre extensiones de VS Code, y paquetes npm que secuestran agentes de código: qué pasó en 2025-2026 y por qué dejar que un agente instale dependencias sin supervisión es un riesgo nuevo."
updated: 2026-09-20
reading_minutes: 9
source_span: 2025-08-26..2026-09-06
confidence: alta
---

Dejar que un agente de código instale paquetes por su cuenta suma un eslabón nuevo a la cadena de suministro: no solo hay que confiar en el registro (npm, PyPI, Open VSX) y en el mantenedor del paquete, hay que confiar en que el nombre que el modelo eligió para instalar existe y es el correcto. En 2025-2026 aparecieron ataques que explotan exactamente ese eslabón, además de los clásicos (tokens de publicación robados, extensiones de IDE maliciosas) ahora combinados con agentes de IA como parte del mecanismo de ataque, no solo como víctimas.

## Por qué importa

**El modelo puede inventar el nombre del paquete que vas a instalar.** Un estudio de la Universidad de Texas en San Antonio, la Universidad de Oklahoma y Virginia Tech, presentado en USENIX Security 2025 (agosto de 2025) y premiado como Distinguished Paper, generó 576.000 muestras de código con 16 modelos populares y encontró que, en promedio, al menos el 5,2% de los paquetes referenciados en modelos comerciales no existen (21,7% en modelos open-source); identificaron 205.474 nombres de paquetes alucinados únicos. Un atacante que identifica qué nombre alucina un modelo puede registrar ese paquete en el registro real antes de que lo haga un desarrollador desprevenido: eso es "slopsquatting". El caso ya documentado más citado es el de `huggingface-cli`: el investigador Bar Lanyado (Lasso Security) subió a PyPI, a modo de prueba, un paquete vacío con ese nombre —que los modelos alucinaban en lugar del comando real (`pip install "huggingface_hub[cli]"`)— y recibió más de 30.000 descargas en tres meses, incluyendo su incorporación al README de un repositorio público de Alibaba.

**Los agentes de código ya son un objetivo directo, no solo un vector.** El 6 de septiembre de 2026, el equipo de investigación AgentGate verificó que, de 19 paquetes npm maliciosos identificados y reportados que apuntaban específicamente a agentes como Claude Code y Cursor, 18 seguían instalables semanas después de haber sido señalados. Las técnicas documentadas incluyen procesos daemon que reciben tareas remotas del atacante saltándose los permisos del agente, secuestro de archivos de configuración para enrutar credenciales de API hacia infraestructura del atacante, y el uso de la propia capacidad de ejecución del agente para extraer secretos del sistema.

**El caso Nx/s1ngularity mostró que un ataque de token robado puede escalar usando las CLIs de IA ya instaladas en la máquina de la víctima.** El 26 de agosto de 2025, atacantes explotaron un workflow de GitHub Actions para robar un token de publicación de npm y subieron versiones maliciosas del build system Nx. El malware buscaba específicamente CLIs de IA instaladas (Claude, Gemini, Amazon Q) y las invocaba con flags que saltan las confirmaciones de seguridad (`--dangerously-skip-permissions`, `--yolo`, `--trust-all-tools`) para que la propia IA hiciera el trabajo de encontrar y exfiltrar secretos del sistema de archivos. Es, según la cobertura de The Hacker News, el primer caso documentado de malware que arma CLIs de IA instaladas como parte del ataque.

**Las extensiones de IDE con "IA" en el nombre son un blanco y un vector.** El 26 de enero de 2026, Koi Security reportó dos extensiones en el VS Code Marketplace ("ChatGPT - 中文版" y "ChatGPT - ChatMoss/CodeMoss") que sumaban 1.492.620 instalaciones combinadas y enviaban el contenido de cada archivo abierto, en Base64, a un servidor en China; seguían disponibles en el Marketplace al momento de la publicación. Por separado, en octubre de 2025 la misma firma identificó "GlassWorm", el primer gusano autopropagante conocido en extensiones de VS Code/Open VSX: usa caracteres Unicode invisibles para ocultar código malicioso del editor, roba tokens de npm/GitHub/OpenVSX y blockchain de Solana como infraestructura de comando y control, y usa esos tokens robados para infectar más extensiones automáticamente. Open VSX retiró las extensiones el 21 de octubre de 2025, pero surgió una segunda ola con la misma técnica poco después.

**Un bot de triage de IA se puede convertir en el eslabón débil de tu propio pipeline de publicación.** El 17 de febrero de 2026 (cadena de vulnerabilidad divulgada el 9 de febrero por el investigador independiente Adnan Khan), un atacante explotó un bot de triage de issues basado en Claude en el repositorio de Cline: el título de un issue de GitHub con una instrucción inyectada llevó, a través de un envenenamiento de la caché de GitHub Actions, al robo de los tokens de publicación (`VSCE_PAT`, `OVSX_PAT`, `NPM_RELEASE_TOKEN`) y a la publicación no autorizada de `cline@2.3.0` con un instalador oculto de otro agente ("OpenClaw"). El paquete comprometido se descargó unas 4.000 veces en las 8 horas que estuvo activo. (Ver la ficha de cronología de incidentes de este track para más detalle de este caso.)

## Ejemplo

Antes de dejar que un agente ejecute `npm install`, `pip install` o similar de forma autónoma, verificá el paquete contra el registro real en lugar de confiar en el nombre que propuso el modelo:

```bash
# En vez de dejar que el agente instale directamente lo que sugirió,
# confirmá que el paquete existe y con qué mantenedor/fecha de publicación
npm view <paquete-sugerido> name version time.created maintainers --json

# Para Python
pip index versions <paquete-sugerido>
```

Si el paquete tiene pocas semanas de antigüedad, un solo mantenedor y un nombre casi idéntico a uno popular (por ejemplo `unused-imports` en vez de `eslint-plugin-unused-imports`), tratalo como sospechoso hasta confirmar lo contrario.

## Datos

| Hallazgo | Cifra | Fuente y fecha |
|---|---|---|
| Paquetes referenciados por modelos comerciales que no existen (promedio) | ≥5,2% (21,7% en modelos open-source) | USENIX Security 2025, agosto de 2025 |
| Nombres de paquetes alucinados únicos identificados en el estudio | 205.474 | USENIX Security 2025, agosto de 2025 |
| Descargas del paquete de prueba `huggingface-cli` subido por un investigador | 30.000+ en 3 meses | Bar Lanyado / Lasso Security, reportado 2026-02-20 |
| Credenciales expuestas en el ataque s1ngularity a Nx | 2.349 | The Hacker News, 2025-08-28 |
| Instalaciones combinadas de las dos extensiones maliciosas de VS Code con IA en el nombre | 1.492.620 | Koi Security / The Hacker News, 2026-01-26 |
| Paquetes npm maliciosos dirigidos a agentes de IA que seguían instalables semanas después de reportados | 18 de 19 | AgentGate, 2026-09-06 |

## Debate

**Postura 1 — el problema es de higiene de supply chain, no específico de la IA.** Gran parte de la cobertura (StepSecurity, Wiz sobre s1ngularity) enmarca estos incidentes como variantes de ataques ya conocidos —tokens sobre-permisionados, dependencias no auditadas, extensiones sin revisión de código— donde la IA es un amplificador del daño (un agente con `--yolo` hace en segundos lo que a un script le tomaría más pasos), no la causa raíz.

**Postura 2 — la IA introduce un eslabón de confianza nuevo que las defensas clásicas no cubren.** El equipo detrás del estudio de USENIX y la cobertura de la Cloud Security Alliance sobre slopsquatting argumentan que el problema es distinto: un desarrollador no está decidiendo instalar un paquete, está confiando en que el modelo generó un nombre real, y los escáneres de dependencias tradicionales no fueron diseñados para detectar "esto no existe pero suena plausible". Requiere verificación explícita del nombre contra el registro antes de instalar, un paso que no existía antes de que el código lo generara una IA.

## Cómo empezar

1. No le des a un agente flags que saltean confirmaciones de instalación (`--yolo`, `--dangerously-skip-permissions`, `--trust-all-tools`) en una máquina con tokens de npm/GitHub/cloud activos; el caso s1ngularity mostró que esas mismas CLIs se pueden usar en tu contra.
2. Antes de instalar un paquete que sugirió un agente, confirmá que existe, su antigüedad y su mantenedor con el registro real (ver ejemplo arriba), especialmente si el nombre se parece a uno de un paquete popular.
3. Auditá extensiones de IDE con permisos amplios (lectura de archivos, red saliente) aunque tengan muchas instalaciones: los casos de enero de 2026 tenían más de un millón de instalaciones combinadas y seguían activas al momento de ser reportadas.
4. Si tu proyecto publica paquetes automáticamente (CI/CD), no le des a un bot de triage o de soporte basado en IA acceso al mismo pipeline que tiene los tokens de publicación; separá esos workflows y rotá los tokens con regularidad, como recomienda el análisis de Snyk sobre el caso Cline.

## Fuentes

- [We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs](https://www.usenix.org/conference/usenixsecurity25/presentation/spracklen) — USENIX Security 2025 (Spracklen, Wijewickrama, Sakib, Maiti, Viswanath, Jadliwala) — pub: 2025-08 — visto: 2026-09-20
- [Slopsquatting: The AI Package Hallucination Attack Already Happening](https://www.aikido.dev/blog/slopsquatting-ai-package-hallucination-attacks) — Aikido Security — pub: 2026-02-20 — visto: 2026-09-20
- [Malicious Nx Packages in 's1ngularity' Attack Leaked 2,349 GitHub, Cloud, and AI Credentials](https://thehackernews.com/2025/08/malicious-nx-packages-in-s1ngularity.html) — The Hacker News — pub: 2025-08-28 — visto: 2026-09-20
- [Malicious VS Code AI Extensions with 1.5 Million Installs Steal Developer Source Code](https://thehackernews.com/2026/01/malicious-vs-code-ai-extensions-with-15.html) — The Hacker News — pub: 2026-01-26 — visto: 2026-09-20
- [GlassWorm Malware Discovered in Three VS Code Extensions with Thousands of Installs](https://thehackernews.com/2025/11/glassworm-malware-discovered-in-three.html) — The Hacker News — pub: 2025-11-10 — visto: 2026-09-20
- [Clinejection — Compromising Cline's Production Releases just by Prompting an Issue Triager](https://adnanthekhan.com/posts/clinejection/) — Adnan Khan (investigador independiente) — pub: 2026-02-09 — visto: 2026-09-20
- [18 malicious npm packages are still remote-controlling AI coding agents (verified today)](https://dev.to/agentgate/18-malicious-npm-packages-are-still-remote-controlling-ai-coding-agents-verified-today-3n59) — AgentGate — pub: 2026-09-06 — visto: 2026-09-20
