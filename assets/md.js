/* Renderizador de Markdown mínimo pero suficiente para AI Radar.
   Sin dependencias. Escapa HTML siempre: el contenido se trata como datos, no como marcado. */
(function (global) {
  'use strict';

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function safeUrl(u) {
    var t = String(u).trim();
    return /^(https?:\/\/|mailto:|#)/i.test(t) ? t : '#';
  }

  // --- Nivel de línea (inline) ---------------------------------------------

  function inline(src) {
    var codes = [];
    var s = String(src);

    // 1. Aislar los spans de código ANTES de escapar, para que su contenido
    //    no se mezcle con las demás reglas.
    s = s.replace(/`([^`]+)`/g, function (_, c) {
      codes.push(c);
      return '' + (codes.length - 1) + '';
    });

    s = escHtml(s);

    // 2. Enlaces.
    s = s.replace(/\[([^\]]*)\]\(([^)\s]+)\)/g, function (_, text, url) {
      var href = safeUrl(url);
      var ext = /^https?:/i.test(href);
      return '<a href="' + href + '"' +
        (ext ? ' target="_blank" rel="noopener noreferrer"' : '') +
        '>' + text + '</a>';
    });

    // 3. Énfasis.
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[\s(\[])_([^_]+)_(?=$|[\s.,;:)\]!?])/g, '$1<em>$2</em>');
    s = s.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
    s = s.replace(/~~([^~]+)~~/g, '<del>$1</del>');

    // 4. Devolver los spans de código, ya escapados.
    s = s.replace(/(\d+)/g, function (_, i) {
      return '<code>' + escHtml(codes[+i]) + '</code>';
    });

    return s;
  }

  // --- Nivel de bloque ------------------------------------------------------

  var RE_FENCE = /^\s*```+\s*([\w+-]*)\s*$/;
  var RE_HEAD = /^(#{1,6})\s+(.*)$/;
  var RE_HR = /^\s*(-{3,}|\*{3,}|_{3,})\s*$/;
  var RE_UL = /^(\s*)[-*+]\s+(.*)$/;
  var RE_OL = /^(\s*)(\d+)[.)]\s+(.*)$/;
  var RE_QUOTE = /^\s*>\s?(.*)$/;
  var RE_CALLOUT = /^\[!(\w+)\]\s*(.*)$/;
  var RE_TSEP = /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/;

  function isTableAt(lines, i) {
    return i + 1 < lines.length &&
      lines[i].indexOf('|') !== -1 &&
      lines[i + 1].indexOf('|') !== -1 &&
      RE_TSEP.test(lines[i + 1]);
  }

  function splitRow(line) {
    var t = line.trim();
    if (t.charAt(0) === '|') t = t.slice(1);
    if (t.charAt(t.length - 1) === '|') t = t.slice(0, -1);
    return t.split('|').map(function (c) { return c.trim(); });
  }

  function slug(s) {
    return String(s).toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim().replace(/\s+/g, '-').slice(0, 60);
  }

  /* Convierte los ítems de la sección "## Fuentes" en tarjetas estructuradas.
     Formato esperado:
     - [Título](url) — Publicador — pub: 2026-08-14 — visto: 2026-09-20 */
  function renderSourceItem(raw) {
    var parts = raw.split(/\s+—\s+|\s+--\s+/);
    var head = parts.shift() || '';
    var meta = [];
    parts.forEach(function (p) {
      var m = /^(pub|visto|publicado|consultado)\s*:\s*(.+)$/i.exec(p.trim());
      if (m) {
        var k = m[1].toLowerCase();
        var label = (k === 'pub' || k === 'publicado') ? 'publicado' : 'consultado';
        meta.push('<span class="' + (label === 'publicado' ? 'pub' : 'seen') + '">' +
          label + ' ' + escHtml(m[2].trim()) + '</span>');
      } else if (p.trim()) {
        meta.push('<span class="publisher">' + inline(p.trim()) + '</span>');
      }
    });
    return '<li>' + inline(head) +
      (meta.length ? '<div class="src-meta">' + meta.join('') + '</div>' : '') +
      '</li>';
  }

  function renderList(lines, start, ordered) {
    // Devuelve [html, siguienteIndice]. Soporta un nivel de anidamiento.
    var out = [];
    var i = start;
    var baseIndent = null;
    var buffer = null;

    function flush() {
      if (buffer !== null) { out.push('<li>' + buffer + '</li>'); buffer = null; }
    }

    while (i < lines.length) {
      var line = lines[i];
      if (line.trim() === '') {
        // Una línea en blanco sólo corta si la siguiente no continúa la lista.
        var nxt = lines[i + 1];
        if (nxt === undefined || (!RE_UL.test(nxt) && !RE_OL.test(nxt))) break;
        i++;
        continue;
      }
      var mu = RE_UL.exec(line);
      var mo = RE_OL.exec(line);
      if (!mu && !mo) break;
      if ((ordered && !mo) || (!ordered && !mu)) break;

      var indent = (mu ? mu[1] : mo[1]).length;
      var text = mu ? mu[2] : mo[3];
      if (baseIndent === null) baseIndent = indent;

      if (indent > baseIndent + 1) {
        // Sublista: recogerla entera y colgarla del ítem anterior.
        var subOrdered = !!RE_OL.exec(line);
        var sub = renderList(lines, i, subOrdered);
        if (buffer !== null) buffer += sub[0];
        else out.push('<li>' + sub[0] + '</li>');
        i = sub[1];
        continue;
      }

      flush();
      buffer = inline(text);
      i++;
    }
    flush();
    var tag = ordered ? 'ol' : 'ul';
    return ['<' + tag + '>' + out.join('') + '</' + tag + '>', i];
  }

  function render(src, opts) {
    opts = opts || {};
    var headings = [];
    var lines = String(src).replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    var out = [];
    var i = 0;
    var inSources = false;

    while (i < lines.length) {
      var line = lines[i];

      // Bloque de código cercado
      var mf = RE_FENCE.exec(line);
      if (mf) {
        var lang = mf[1] || '';
        var buf = [];
        i++;
        while (i < lines.length && !RE_FENCE.test(lines[i])) { buf.push(lines[i]); i++; }
        i++; // saltar el cierre
        out.push('<pre data-lang="' + escHtml(lang) + '"><button class="copy-btn" type="button">copiar</button>' +
          '<code>' + escHtml(buf.join('\n')) + '</code></pre>');
        continue;
      }

      // Encabezado
      var mh = RE_HEAD.exec(line);
      if (mh) {
        var lvl = Math.min(mh[1].length, 6);
        var txt = mh[2].trim();
        var id = slug(txt);
        inSources = /^fuentes$/i.test(txt);
        if (lvl <= 3) headings.push({ level: lvl, text: txt, id: id });
        out.push('<h' + lvl + ' id="' + id + '">' + inline(txt) + '</h' + lvl + '>');
        i++;
        continue;
      }

      // Separador
      if (RE_HR.test(line)) { out.push('<hr>'); i++; continue; }

      // Cita / aviso
      if (RE_QUOTE.test(line)) {
        var qbuf = [];
        while (i < lines.length && RE_QUOTE.test(lines[i])) {
          qbuf.push(RE_QUOTE.exec(lines[i])[1]);
          i++;
        }
        var first = qbuf[0] || '';
        var mc = RE_CALLOUT.exec(first.trim());
        if (mc) {
          qbuf[0] = mc[2];
          var body = qbuf.filter(function (l) { return l.trim() !== ''; })
            .map(function (l) { return '<p>' + inline(l) + '</p>'; }).join('');
          out.push('<div class="callout"><span class="ctag">' + escHtml(mc[1]) + '</span>' + body + '</div>');
        } else {
          out.push('<blockquote>' + qbuf.filter(function (l) { return l.trim() !== ''; })
            .map(function (l) { return '<p>' + inline(l) + '</p>'; }).join('') + '</blockquote>');
        }
        continue;
      }

      // Tabla
      if (isTableAt(lines, i)) {
        var header = splitRow(lines[i]);
        i += 2;
        var rows = [];
        while (i < lines.length && lines[i].indexOf('|') !== -1 && lines[i].trim() !== '') {
          rows.push(splitRow(lines[i]));
          i++;
        }
        var html = '<table><thead><tr>' +
          header.map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') +
          '</tr></thead><tbody>' +
          rows.map(function (r) {
            return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
          }).join('') +
          '</tbody></table>';
        out.push(html);
        continue;
      }

      // Listas
      if (RE_UL.test(line) || RE_OL.test(line)) {
        var ordered = RE_OL.test(line) && !RE_UL.test(line);
        if (inSources && !ordered) {
          // La sección de fuentes se renderiza como tarjetas.
          var items = [];
          while (i < lines.length) {
            if (lines[i].trim() === '') {
              if (i + 1 < lines.length && RE_UL.test(lines[i + 1])) { i++; continue; }
              break;
            }
            var mm = RE_UL.exec(lines[i]);
            if (!mm) break;
            items.push(renderSourceItem(mm[2]));
            i++;
          }
          out.push('<ul class="src-list">' + items.join('') + '</ul>');
          continue;
        }
        var res = renderList(lines, i, ordered);
        out.push(res[0]);
        i = res[1];
        continue;
      }

      // Línea en blanco
      if (line.trim() === '') { i++; continue; }

      // Párrafo
      var pbuf = [];
      while (i < lines.length && lines[i].trim() !== '' &&
        !RE_FENCE.test(lines[i]) && !RE_HEAD.test(lines[i]) &&
        !RE_HR.test(lines[i]) && !RE_QUOTE.test(lines[i]) &&
        !RE_UL.test(lines[i]) && !RE_OL.test(lines[i]) &&
        !isTableAt(lines, i)) {
        pbuf.push(lines[i]);
        i++;
      }
      if (pbuf.length) out.push('<p>' + inline(pbuf.join('\n')).replace(/\n/g, '<br>') + '</p>');
      else i++;
    }

    if (opts.withHeadings) return { html: out.join('\n'), headings: headings };
    return out.join('\n');
  }

  global.MD = { render: render, inline: inline, escape: escHtml, slug: slug };
})(window);
