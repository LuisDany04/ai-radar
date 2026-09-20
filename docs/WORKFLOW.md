# El flujo de trabajo

Cómo se construyó AI Radar, y cómo repetirlo para mantenerlo vivo. Está escrito para que
lo pueda ejecutar otra persona — o el propio Claude Code — sin más contexto que este
archivo.

## La idea

El problema de pedirle a un modelo "dime qué hay de nuevo en IA" es que responde de
memoria, y la memoria tiene fecha de caducidad. Este repo invierte la relación: el modelo
**no es la fuente**, es el investigador. Su trabajo es salir a buscar, leer, comparar,
fechar y citar. Lo que no puede enlazar, no se publica.

Cuatro decisiones sostienen eso:

1. **El contrato va antes que el contenido.** `docs/CONTENT-SCHEMA.md` define el formato
   exacto de una ficha antes de que nadie escriba una. Los agentes lo leen como primer
   paso.
2. **Markdown, no JSON.** Los agentes escriben archivos `.md` con frontmatter plano. El
   JSON se rompe en cuanto una ficha lleva comillas, acentos o bloques de código; el
   Markdown no. La conversión a datos ocurre después, en el build.
3. **Investigación en paralelo, por temas disjuntos.** Cada agente recibe un tema, una
   carpeta y un prefijo de `id`. No comparten estado ni se pisan archivos.
4. **La verificación es un paso aparte, y es mecánica.** Un `curl` a cada URL citada.
   Un modelo no puede convencer a `curl` de que un enlace inventado existe.

## Las cuatro fases

### 1. Esqueleto y contrato

```bash
mkdir -p content/{claude-code,skills,mcp,modelos,herramientas,practicas,tendencias,seguridad}
# escribir docs/CONTENT-SCHEMA.md ANTES de investigar nada
```

El esquema define: claves obligatorias del frontmatter, tracks y tipos válidos, el formato
exacto de la línea de fuente, y el mínimo de 4 fuentes con al menos una primaria.

### 2. Investigación en paralelo

Un agente por tema, lanzados a la vez. El prompt de cada uno lleva siempre estas seis
piezas, y las seis importan:

| Pieza | Por qué |
|---|---|
| "Tu conocimiento llega hasta `<fecha>`, lo posterior NO lo sabes" | Sin esto el agente escribe de memoria y suena plausible |
| "Lee `docs/CONTENT-SCHEMA.md` como primer paso" | Sin esto el build falla en la validación |
| "Abre con WebFetch cada página que cites" | Convierte una cita en una lectura real |
| "Escribe cada ficha a disco EN CUANTO la termines" | Un corte por límite de uso no borra el trabajo |
| Prefijo de `id` propio por agente | Evita colisiones entre agentes del mismo tema |
| "Contradicciones → bloque `[!duda]`" | El desacuerdo entre fuentes se muestra, no se esconde |

> [!aviso] Lanzar una docena de agentes pesados a la vez puede agotar el límite de uso de
> la sesión y matarlos a todos. Conviene ir en tandas de 3 o 4, y usar un modelo más
> ligero para la investigación: el trabajo es buscar y resumir con reglas estrictas, no
> razonar sobre código.

### 3. Validación y construcción

```bash
bash scripts/build.sh
```

Comprueba, ficha por ficha: frontmatter completo, `id` igual al nombre del archivo, track
igual a la carpeta, track y tipo dentro de los valores permitidos, sección `## Fuentes`
presente, al menos 4 fuentes enlazadas, y fechas de consulta. Aborta si hay errores; avisa
sin abortar si hay carencias menores.

Luego genera `assets/data.js`, con cada ficha codificada en **base64**. Esa es la parte
menos obvia del diseño: incrustar Markdown dentro de JavaScript desde bash es un infierno
de escapado — comillas, backslashes, backticks de los bloques de código, acentos. En
base64 no hay nada que escapar, y el navegador lo decodifica a UTF-8 correcto en tres
líneas.

### 4. Verificación de enlaces

```bash
bash scripts/check-links.sh
```

Extrae todas las URLs citadas, las deduplica y lanza `curl` contra cada una, 8 en
paralelo. Clasifica: responde, redirige, no existe, bloquea al verificador, sin respuesta.
Las 404 se listan en `docs/broken-links.txt` y hacen fallar el script.

Distinguir "roto" de "bloquea bots" importa: bastantes sitios devuelven 403 a un
verificador automático aunque el enlace esté perfecto. Esos se marcan como **no
concluyentes**, no como rotos.

## Repetirlo

Para refrescar un tema concreto, dentro de Claude Code:

```
/refresh-radar modelos
```

Manualmente, el ciclo es siempre el mismo:

```bash
# 1. investigar (agentes escribiendo en content/<tema>/)
# 2. validar y construir
bash scripts/build.sh
# 3. verificar los enlaces
bash scripts/check-links.sh
# 4. empaquetar la versión offline
bash scripts/build-standalone.sh
# 5. publicar
git add -A && git commit -m "Actualiza <tema>" && git push
```

## Qué se aprendió construyéndolo

- **El formato de salida es la mitad del prompt.** Un esquema estricto y escrito con
  antelación evita casi todo el trabajo de limpieza posterior.
- **La escritura incremental no es un detalle.** La primera tanda de agentes murió por un
  límite de uso y se perdió todo, porque acumulaban las fichas para el final.
- **Un agente resume mal lo que no ha abierto.** Obligar a abrir cada página convierte una
  cita plausible en una cita real. Aun así conviene un `curl` final que no dependa de
  ningún modelo.
- **La fecha es contenido, no metadato.** En un tema que se mueve cada semana, un dato sin
  fecha no se puede juzgar; con fecha, el lector decide si sigue vigente.
