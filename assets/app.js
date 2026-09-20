/* AI Radar — aplicación del panel. Sin dependencias externas. */
(function () {
  'use strict';

  // ---------- Metadatos de los tracks ---------------------------------------

  var TRACKS = [
    { id: 'claude-code', label: 'Claude Code', color: '#6ea8fe',
      desc: 'Qué hace la herramienta, cómo se configura y cómo se usa bien en el día a día.' },
    { id: 'skills', label: 'Agent Skills', color: '#b287f5',
      desc: 'El formato SKILL.md, cómo escribirlas y cuáles usa realmente la gente.' },
    { id: 'mcp', label: 'MCP', color: '#58c4c0',
      desc: 'Model Context Protocol: estado de la spec, servidores, adopción y seguridad.' },
    { id: 'modelos', label: 'Modelos', color: '#e8b464',
      desc: 'Qué modelos existen hoy, qué cuestan, qué miden los benchmarks y cuál elegir.' },
    { id: 'herramientas', label: 'Herramientas', color: '#f0899a',
      desc: 'El mercado de agentes de programación comparado sin marketing.' },
    { id: 'practicas', label: 'Prácticas', color: '#6fce9f',
      desc: 'Cómo trabajar con agentes: contexto, evals, revisión, y el debate abierto.' },
    { id: 'tendencias', label: 'Tendencias', color: '#9aa7f0',
      desc: 'Hacia dónde va el desarrollo de software, con las cifras que lo respaldan.' },
    { id: 'seguridad', label: 'Seguridad', color: '#f0776c',
      desc: 'Inyección de prompts, cadena de suministro, permisos y cómo no pegártela.' }
  ];

  var TYPES = ['guia', 'feature', 'release', 'comparativa', 'dato', 'opinion', 'ejemplo', 'herramienta'];
  var TYPE_LABEL = {
    guia: 'guía', feature: 'feature', release: 'lanzamientos', comparativa: 'comparativa',
    dato: 'datos', opinion: 'opinión', ejemplo: 'ejemplos', herramienta: 'herramienta'
  };
  var LEVELS = ['intro', 'intermedio', 'avanzado'];

  function trackOf(id) {
    for (var i = 0; i < TRACKS.length; i++) if (TRACKS[i].id === id) return TRACKS[i];
    return { id: id, label: id, color: '#8b97ab', desc: '' };
  }

  // ---------- Almacenamiento local (tolerante a fallos) ----------------------

  var store = {
    get: function (k, d) {
      try { var v = localStorage.getItem('airadar:' + k); return v === null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem('airadar:' + k, JSON.stringify(v)); } catch (e) { /* modo privado */ }
    }
  };

  // ---------- Carga y parseo del contenido -----------------------------------

  function b64ToText(b64) {
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder('utf-8').decode(bytes);
  }

  var SRC_RE = /^-\s*\[([^\]]*)\]\(([^)\s]+)\)\s*(.*)$/;

  function extractSources(body) {
    var lines = body.split('\n');
    var out = [];
    var inside = false;
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i];
      if (/^##\s+/.test(l)) { inside = /^##\s+Fuentes\s*$/i.test(l.trim()); continue; }
      if (!inside) continue;
      var m = SRC_RE.exec(l.trim());
      if (!m) continue;
      var rest = m[3] || '';
      var parts = rest.split(/\s+—\s+|\s+--\s+/).filter(Boolean);
      var src = { title: m[1], url: m[2], publisher: '', pub: '', seen: '' };
      parts.forEach(function (p) {
        var mm = /^(pub|publicado)\s*:\s*(.+)$/i.exec(p.trim());
        var ms = /^(visto|consultado)\s*:\s*(.+)$/i.exec(p.trim());
        if (mm) src.pub = mm[2].trim();
        else if (ms) src.seen = ms[2].trim();
        else if (!src.publisher) src.publisher = p.trim();
      });
      try { src.domain = new URL(src.url).hostname.replace(/^www\./, ''); }
      catch (e) { src.domain = ''; }
      out.push(src);
    }
    return out;
  }

  function parseDoc(text, path) {
    var lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    var meta = {};
    var start = 0;
    if (lines[0] !== undefined && lines[0].trim() === '---') {
      var i = 1;
      for (; i < lines.length && lines[i].trim() !== '---'; i++) {
        var p = lines[i].indexOf(':');
        if (p < 0) continue;
        var k = lines[i].slice(0, p).trim();
        var v = lines[i].slice(p + 1).trim();
        if (v.length > 1 && v.charAt(0) === '"' && v.charAt(v.length - 1) === '"') v = v.slice(1, -1);
        meta[k] = v.replace(/\\"/g, '"');
      }
      start = i + 1;
    }
    var body = lines.slice(start).join('\n').trim();
    var sources = extractSources(body);
    var dates = sources.map(function (s) { return s.pub; })
      .filter(function (d) { return /^\d{4}-\d{2}-\d{2}$/.test(d); }).sort();

    return {
      id: meta.id || path.replace(/^.*\//, '').replace(/\.md$/, ''),
      title: meta.title || '(sin título)',
      track: meta.track || 'practicas',
      type: meta.type || 'guia',
      level: meta.level || 'intro',
      tags: (meta.tags || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean),
      summary: meta.summary || '',
      updated: meta.updated || '',
      minutes: parseInt(meta.reading_minutes, 10) || Math.max(1, Math.round(body.split(/\s+/).length / 220)),
      span: meta.source_span || '',
      confidence: meta.confidence || 'media',
      body: body,
      sources: sources,
      newestSource: dates.length ? dates[dates.length - 1] : '',
      oldestSource: dates.length ? dates[0] : '',
      path: path,
      haystack: (meta.title + ' ' + meta.summary + ' ' + (meta.tags || '') + ' ' + body).toLowerCase()
    };
  }

  var RAW = (window.__RADAR__ || { docs: [], generated: '' });
  var DOCS = [];
  RAW.docs.forEach(function (d) {
    try { DOCS.push(parseDoc(b64ToText(d.b64), d.path)); }
    catch (e) { console.error('No se pudo leer la ficha', d.path, e); }
  });

  // ---------- Estado --------------------------------------------------------

  var state = {
    view: 'home',
    docId: null,
    q: '',
    track: null,
    types: [],
    levels: [],
    sort: store.get('sort', 'recientes'),
    read: store.get('read', {}),
    mobilePane: 'list'
  };

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  };
  var esc = function (s) { return window.MD.escape(s); };

  // ---------- Filtrado ------------------------------------------------------

  function filtered() {
    var q = state.q.trim().toLowerCase();
    var terms = q ? q.split(/\s+/) : [];
    var out = DOCS.filter(function (d) {
      if (state.track && d.track !== state.track) return false;
      if (state.types.length && state.types.indexOf(d.type) < 0) return false;
      if (state.levels.length && state.levels.indexOf(d.level) < 0) return false;
      for (var i = 0; i < terms.length; i++) if (d.haystack.indexOf(terms[i]) < 0) return false;
      return true;
    });
    var by = state.sort;
    out.sort(function (a, b) {
      if (by === 'az') return a.title.localeCompare(b.title, 'es');
      if (by === 'corto') return a.minutes - b.minutes;
      if (by === 'fuente') return (b.newestSource || '').localeCompare(a.newestSource || '');
      return (b.updated || '').localeCompare(a.updated || '') || a.title.localeCompare(b.title, 'es');
    });
    return out;
  }

  // ---------- Enrutado ------------------------------------------------------

  function readHash() {
    var h = (location.hash || '').replace(/^#\/?/, '');
    var parts = h.split('/').filter(Boolean);
    if (!parts.length) { state.view = 'home'; state.docId = null; return; }
    if (parts[0] === 'd' && parts[1]) { state.view = 'doc'; state.docId = decodeURIComponent(parts[1]); return; }
    if (parts[0] === 't' && parts[1]) {
      state.view = 'list'; state.track = decodeURIComponent(parts[1]); state.docId = null; return;
    }
    if (parts[0] === 'fuentes') { state.view = 'sources'; return; }
    if (parts[0] === 'acerca') { state.view = 'about'; return; }
    state.view = 'home';
  }

  function go(hash) {
    if (location.hash === hash) render();
    else location.hash = hash;
  }

  // ---------- Barra lateral -------------------------------------------------

  function renderSide() {
    var side = $('nav.side');
    side.innerHTML = '';

    var g1 = el('div', 'side-group');
    g1.appendChild(el('div', 'side-label', 'Temas'));
    var allBtn = el('button', 'track-btn' + (state.track === null ? ' active' : ''));
    allBtn.innerHTML = '<span class="sw" style="background:var(--text-faint)"></span>Todo' +
      '<span class="n">' + DOCS.length + '</span>';
    allBtn.onclick = function () { state.track = null; state.view = 'list'; go('#/'); render(); };
    g1.appendChild(allBtn);

    TRACKS.forEach(function (t) {
      var n = DOCS.filter(function (d) { return d.track === t.id; }).length;
      if (!n) return;
      var b = el('button', 'track-btn' + (state.track === t.id ? ' active' : ''));
      b.innerHTML = '<span class="sw" style="background:' + t.color + '"></span>' + esc(t.label) +
        '<span class="n">' + n + '</span>';
      b.onclick = function () { state.track = t.id; go('#/t/' + t.id); };
      g1.appendChild(b);
    });
    side.appendChild(g1);

    var g2 = el('div', 'side-group');
    g2.appendChild(el('div', 'side-label', 'Formato'));
    var chips2 = el('div', 'chips');
    TYPES.forEach(function (ty) {
      var n = DOCS.filter(function (d) { return d.type === ty; }).length;
      if (!n) return;
      var c = el('button', 'chip' + (state.types.indexOf(ty) >= 0 ? ' active' : ''), esc(TYPE_LABEL[ty] || ty));
      c.onclick = function () {
        var i = state.types.indexOf(ty);
        if (i >= 0) state.types.splice(i, 1); else state.types.push(ty);
        state.view = 'list'; render();
      };
      chips2.appendChild(c);
    });
    g2.appendChild(chips2);
    side.appendChild(g2);

    var g3 = el('div', 'side-group');
    g3.appendChild(el('div', 'side-label', 'Nivel'));
    var chips3 = el('div', 'chips');
    LEVELS.forEach(function (lv) {
      var n = DOCS.filter(function (d) { return d.level === lv; }).length;
      if (!n) return;
      var c = el('button', 'chip' + (state.levels.indexOf(lv) >= 0 ? ' active' : ''), esc(lv));
      c.onclick = function () {
        var i = state.levels.indexOf(lv);
        if (i >= 0) state.levels.splice(i, 1); else state.levels.push(lv);
        state.view = 'list'; render();
      };
      chips3.appendChild(c);
    });
    g3.appendChild(chips3);
    side.appendChild(g3);

    if (state.track || state.types.length || state.levels.length || state.q) {
      var r = el('button', 'side-reset', 'Quitar filtros');
      r.onclick = function () {
        state.track = null; state.types = []; state.levels = []; state.q = '';
        $('#q').value = '';
        go('#/');
      };
      side.appendChild(r);
    }

    var g4 = el('div', 'side-group');
    g4.appendChild(el('div', 'side-label', 'Progreso'));
    var readCount = DOCS.filter(function (d) { return state.read[d.id]; }).length;
    var pct = DOCS.length ? Math.round(readCount / DOCS.length * 100) : 0;
    g4.appendChild(el('div', 'side-reset',
      '<span style="text-decoration:none;color:var(--text-dim)">' + readCount + ' de ' + DOCS.length +
      ' leídas (' + pct + '%)</span>'));
    side.appendChild(g4);
  }

  // ---------- Lista ---------------------------------------------------------

  function renderList() {
    var sec = $('section.list');
    sec.innerHTML = '';
    var docs = filtered();

    var head = el('div', 'list-head');
    head.appendChild(el('span', '', docs.length + (docs.length === 1 ? ' ficha' : ' fichas')));
    var sel = el('select');
    [['recientes', 'actualizadas'], ['fuente', 'fuente más nueva'], ['az', 'A–Z'], ['corto', 'más cortas']]
      .forEach(function (o) {
        var op = el('option', '', o[1]);
        op.value = o[0];
        if (state.sort === o[0]) op.selected = true;
        sel.appendChild(op);
      });
    sel.onchange = function () { state.sort = sel.value; store.set('sort', sel.value); render(); };
    head.appendChild(sel);
    sec.appendChild(head);

    if (!docs.length) {
      sec.appendChild(el('div', 'empty', 'Nada coincide con este filtro.'));
      return;
    }

    docs.forEach(function (d) {
      var t = trackOf(d.track);
      var card = el('button', 'card' + (d.id === state.docId ? ' active' : '') + (state.read[d.id] ? ' read' : ''));
      card.setAttribute('data-id', d.id);
      card.innerHTML =
        '<div class="card-meta">' +
          '<span class="tk" style="color:' + t.color + '"><span class="sw" style="background:' + t.color + '"></span>' +
            esc(t.label) + '</span>' +
          '<span class="sep">·</span><span>' + esc(TYPE_LABEL[d.type] || d.type) + '</span>' +
          '<span class="sep">·</span><span>' + d.minutes + ' min</span>' +
          (state.read[d.id] ? '<span class="readmark">leída</span>' : '') +
        '</div>' +
        '<div class="card-title">' + esc(d.title) + '</div>' +
        '<div class="card-sum">' + esc(d.summary) + '</div>' +
        '<div class="card-foot">' +
          '<span class="badge ' + esc(d.type) + '">' + esc(d.level) + '</span>' +
          '<span>' + d.sources.length + ' fuentes</span>' +
          (d.newestSource ? '<span class="sep">·</span><span>más reciente ' + esc(d.newestSource) + '</span>' : '') +
        '</div>';
      card.onclick = function () { state.mobilePane = 'reader'; go('#/d/' + d.id); };
      sec.appendChild(card);
    });
  }

  // ---------- Lector --------------------------------------------------------

  function renderDoc(d) {
    var t = trackOf(d.track);
    var wrap = el('div', 'reader-inner');

    var head = el('div', 'doc-head');
    head.innerHTML =
      '<div class="doc-kicker">' +
        '<span class="tk" style="color:' + t.color + '">' + esc(t.label) + '</span>' +
        '<span>·</span><span>' + esc(TYPE_LABEL[d.type] || d.type) + '</span>' +
        '<span>·</span><span>' + esc(d.level) + '</span>' +
        '<span>·</span><span>' + d.minutes + ' min de lectura</span>' +
      '</div>' +
      '<h1 class="doc-title">' + esc(d.title) + '</h1>' +
      (d.summary ? '<p class="doc-sum">' + esc(d.summary) + '</p>' : '') +
      '<div class="doc-facts">' +
        (d.updated ? '<span class="fact">ficha escrita <b>' + esc(d.updated) + '</b></span>' : '') +
        (d.span ? '<span class="fact">fuentes de <b>' + esc(d.span.replace('..', '</b> a <b>')) + '</b></span>' : '') +
        '<span class="fact">' + d.sources.length + ' fuentes citadas</span>' +
        '<span class="fact conf-' + esc(d.confidence) + '">confianza <b>' + esc(d.confidence) + '</b></span>' +
      '</div>';

    var actions = el('div', 'doc-actions');
    var readBtn = el('button', state.read[d.id] ? 'on' : '', state.read[d.id] ? '✓ leída' : 'marcar como leída');
    readBtn.onclick = function () {
      if (state.read[d.id]) delete state.read[d.id]; else state.read[d.id] = 1;
      store.set('read', state.read);
      render();
    };
    actions.appendChild(readBtn);

    var topBtn = el('button', '', 'ir a las fuentes');
    topBtn.onclick = function () {
      var f = wrap.querySelector('#fuentes');
      if (f) f.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    actions.appendChild(topBtn);
    head.appendChild(actions);
    wrap.appendChild(head);

    var md = el('article', 'md');
    md.innerHTML = window.MD.render(d.body);
    wrap.appendChild(md);

    // Botones de copiar en los bloques de código.
    Array.prototype.forEach.call(md.querySelectorAll('pre'), function (pre) {
      var btn = pre.querySelector('.copy-btn');
      if (!btn) return;
      btn.onclick = function () {
        var code = pre.querySelector('code');
        var text = code ? code.textContent : '';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            btn.textContent = 'copiado';
            setTimeout(function () { btn.textContent = 'copiar'; }, 1400);
          }, function () { btn.textContent = 'error'; });
        }
      };
    });

    return wrap;
  }

  // ---------- Panorama (portada) --------------------------------------------

  function renderHome() {
    var wrap = el('div', 'pane');
    var allSources = [];
    DOCS.forEach(function (d) { allSources = allSources.concat(d.sources); });
    var uniqUrls = {};
    allSources.forEach(function (s) { uniqUrls[s.url] = 1; });
    var uniqDomains = {};
    allSources.forEach(function (s) { if (s.domain) uniqDomains[s.domain] = 1; });
    var pubDates = allSources.map(function (s) { return s.pub; })
      .filter(function (x) { return /^\d{4}-\d{2}-\d{2}$/.test(x); }).sort();
    var minutes = DOCS.reduce(function (a, d) { return a + d.minutes; }, 0);

    wrap.appendChild(el('h1', '', 'Panorama'));
    wrap.appendChild(el('p', 'lede',
      'Un panel de lectura sobre IA aplicada al desarrollo: qué hay, qué funciona, qué está en disputa ' +
      'y de dónde sale cada afirmación. Cada ficha cita sus fuentes con la fecha en que se publicaron ' +
      'y la fecha en que se consultaron.'));

    var stats = el('div', 'stats');
    [
      [DOCS.length, 'fichas'],
      [Object.keys(uniqUrls).length, 'fuentes únicas'],
      [Object.keys(uniqDomains).length, 'sitios distintos'],
      [minutes + ' min', 'de lectura'],
      [pubDates.length ? pubDates[pubDates.length - 1] : '—', 'fuente más reciente']
    ].forEach(function (s) {
      var n = el('div', 'stat');
      n.innerHTML = '<div class="v">' + esc(String(s[0])) + '</div><div class="k">' + esc(s[1]) + '</div>';
      stats.appendChild(n);
    });
    wrap.appendChild(stats);

    wrap.appendChild(el('h2', '', 'Por dónde empezar'));
    var picks = el('div', 'pick-list');
    var wanted = ['guia', 'comparativa', 'dato'];
    var seen = {};
    var chosen = [];
    TRACKS.forEach(function (t) {
      for (var w = 0; w < wanted.length && chosen.length < 6; w++) {
        var hit = DOCS.filter(function (d) {
          return d.track === t.id && d.type === wanted[w] && !seen[d.id];
        })[0];
        if (hit) { seen[hit.id] = 1; chosen.push(hit); break; }
      }
    });
    chosen.slice(0, 6).forEach(function (d) {
      var t = trackOf(d.track);
      var b = el('button', 'pick');
      b.innerHTML = '<b>' + esc(d.title) + '</b><span style="color:' + t.color + '">' + esc(t.label) +
        '</span> <span>· ' + d.minutes + ' min · ' + d.sources.length + ' fuentes</span>';
      b.onclick = function () { state.mobilePane = 'reader'; go('#/d/' + d.id); };
      picks.appendChild(b);
    });
    wrap.appendChild(picks);

    wrap.appendChild(el('h2', '', 'Los ocho temas'));
    var cards = el('div', 'track-cards');
    TRACKS.forEach(function (t) {
      var n = DOCS.filter(function (d) { return d.track === t.id; }).length;
      if (!n) return;
      var c = el('button', 'track-card');
      c.innerHTML = '<div class="tc-h"><span class="sw" style="background:' + t.color + '"></span>' +
        '<b>' + esc(t.label) + '</b><span class="n">' + n + '</span></div>' +
        '<p>' + esc(t.desc) + '</p>';
      c.onclick = function () { state.mobilePane = 'list'; go('#/t/' + t.id); };
      cards.appendChild(c);
    });
    wrap.appendChild(cards);

    wrap.appendChild(el('h2', '', 'Cómo leer esto'));
    var note = el('div', 'md');
    note.innerHTML = window.MD.render(
      'Cada ficha lleva una etiqueta de **confianza**:\n\n' +
      '- `alta` — se apoya en una fuente primaria oficial (documentación, changelog, anuncio del fabricante).\n' +
      '- `media` — varias fuentes secundarias coinciden, pero no hay confirmación oficial.\n' +
      '- `baja` — fuente única, o el dato está en disputa. Trátalo como pista, no como hecho.\n\n' +
      'Cuando dos fuentes se contradicen, la ficha lo dice en un recuadro en lugar de elegir una y callar la otra.\n\n' +
      'Los datos envejecen. La fecha de cada fuente está siempre a la vista para que puedas juzgar ' +
      'por ti mismo si sigue vigente. En [Fuentes](#/fuentes) puedes ver todas ordenadas por fecha.'
    );
    wrap.appendChild(note);

    return wrap;
  }

  // ---------- Vista de fuentes ----------------------------------------------

  var srcState = { q: '', sort: 'pub-desc', track: '' };

  function renderSources() {
    var wrap = el('div', 'pane');
    wrap.appendChild(el('h1', '', 'Todas las fuentes'));
    wrap.appendChild(el('p', 'lede',
      'Cada referencia citada en el panel, con quién la publicó, cuándo, y en qué ficha se usa. ' +
      'Ordénalas por fecha para ver de un vistazo qué tan fresco es el material.'));

    var rows = [];
    DOCS.forEach(function (d) {
      d.sources.forEach(function (s) {
        rows.push({ s: s, d: d });
      });
    });

    var bar = el('div', 'src-filters');
    var inp = el('input');
    inp.type = 'search';
    inp.placeholder = 'Filtrar por título, sitio o publicador…';
    inp.value = srcState.q;
    inp.oninput = function () { srcState.q = inp.value; paint(); };
    bar.appendChild(inp);

    var tsel = el('select');
    var optAll = el('option', '', 'Todos los temas'); optAll.value = ''; tsel.appendChild(optAll);
    TRACKS.forEach(function (t) {
      if (!DOCS.some(function (d) { return d.track === t.id; })) return;
      var o = el('option', '', t.label); o.value = t.id;
      if (srcState.track === t.id) o.selected = true;
      tsel.appendChild(o);
    });
    tsel.onchange = function () { srcState.track = tsel.value; paint(); };
    bar.appendChild(tsel);

    var ssel = el('select');
    [['pub-desc', 'Publicación: más nuevas'], ['pub-asc', 'Publicación: más antiguas'],
     ['dom', 'Sitio A–Z'], ['doc', 'Por ficha']].forEach(function (o) {
      var op = el('option', '', o[1]); op.value = o[0];
      if (srcState.sort === o[0]) op.selected = true;
      ssel.appendChild(op);
    });
    ssel.onchange = function () { srcState.sort = ssel.value; paint(); };
    bar.appendChild(ssel);

    var count = el('span', '', '');
    count.style.cssText = 'color:var(--text-faint);font-size:12px';
    bar.appendChild(count);
    wrap.appendChild(bar);

    var host = el('div');
    wrap.appendChild(host);

    function paint() {
      var q = srcState.q.trim().toLowerCase();
      var list = rows.filter(function (r) {
        if (srcState.track && r.d.track !== srcState.track) return false;
        if (!q) return true;
        return (r.s.title + ' ' + r.s.publisher + ' ' + r.s.domain + ' ' + r.d.title).toLowerCase().indexOf(q) >= 0;
      });
      list.sort(function (a, b) {
        if (srcState.sort === 'pub-asc') return (a.s.pub || 'zzzz').localeCompare(b.s.pub || 'zzzz');
        if (srcState.sort === 'dom') return (a.s.domain || '').localeCompare(b.s.domain || '');
        if (srcState.sort === 'doc') return a.d.title.localeCompare(b.d.title, 'es');
        return (b.s.pub || '').localeCompare(a.s.pub || '');
      });
      count.textContent = list.length + ' referencias';

      var html = '<table class="src-table"><thead><tr>' +
        '<th>Publicado</th><th>Fuente</th><th>Sitio</th><th>Ficha</th></tr></thead><tbody>';
      list.forEach(function (r) {
        html += '<tr>' +
          '<td class="date">' + esc(r.s.pub || 's/f') + '</td>' +
          '<td><a href="' + esc(r.s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(r.s.title) + '</a>' +
            (r.s.publisher ? '<div style="font-size:11px;color:var(--text-faint)">' + esc(r.s.publisher) + '</div>' : '') +
          '</td>' +
          '<td class="pubr">' + esc(r.s.domain || '') + '</td>' +
          '<td><a href="#/d/' + esc(r.d.id) + '">' + esc(r.d.title) + '</a></td>' +
          '</tr>';
      });
      html += '</tbody></table>';
      if (!list.length) html = '<div class="empty">Ninguna fuente coincide.</div>';
      host.innerHTML = html;
    }
    paint();

    return wrap;
  }

  // ---------- Acerca de -----------------------------------------------------

  function renderAbout() {
    var wrap = el('div', 'pane');
    wrap.appendChild(el('h1', '', 'Cómo se hizo esto'));
    var md = el('div', 'md');
    md.innerHTML = window.MD.render(
      'Este panel se construyó con un flujo de trabajo de agentes en paralelo: varios agentes de ' +
      'investigación independientes peinaron la web por temas separados, escribieron cada ficha en ' +
      'Markdown con sus fuentes, y un paso final verificó que **cada URL citada responda de verdad** ' +
      'antes de publicar.\n\n' +
      '## Reglas que sigue el contenido\n\n' +
      '- Ninguna afirmación con cifra, fecha, precio o versión entra sin fuente.\n' +
      '- Toda fuente lleva fecha de publicación y fecha de consulta.\n' +
      '- Cuando dos fuentes se contradicen, se muestran las dos en lugar de elegir en silencio.\n' +
      '- Las opiniones van atribuidas a una persona concreta con enlace, nunca a "algunos dicen".\n' +
      '- El material posterior a mayo de 2026 se investigó en la web, no se escribió de memoria.\n\n' +
      '## Limitaciones honestas\n\n' +
      'Esto es una foto fija. El ecosistema se mueve cada semana y algunas fichas envejecerán ' +
      'mal y rápido, sobre todo las de modelos, precios y herramientas. La fecha de cada fuente está ' +
      'siempre visible precisamente para eso.\n\n' +
      'Los resúmenes son interpretaciones. Cuando algo te importe de verdad, abre la fuente original: ' +
      'para eso está enlazada.\n\n' +
      '## Actualizarlo\n\n' +
      'El repositorio incluye el flujo completo para regenerar el contenido. Desde la raíz del repo:\n\n' +
      '```bash\nbash scripts/build.sh        # valida las fichas y regenera el bundle\nbash scripts/check-links.sh # comprueba que todas las URLs responden\n```\n\n' +
      'Y dentro de Claude Code, el comando `/refresh-radar` relanza la investigación por temas.'
    );
    wrap.appendChild(md);
    return wrap;
  }

  // ---------- Render principal ----------------------------------------------

  function render() {
    renderSide();
    renderList();

    var reader = $('section.reader');
    reader.innerHTML = '';
    reader.scrollTop = 0;

    if (state.view === 'doc' && state.docId) {
      var d = DOCS.filter(function (x) { return x.id === state.docId; })[0];
      if (d) reader.appendChild(renderDoc(d));
      else reader.appendChild(el('div', 'empty', 'No existe ninguna ficha con ese identificador.'));
    } else if (state.view === 'sources') {
      reader.appendChild(renderSources());
    } else if (state.view === 'about') {
      reader.appendChild(renderAbout());
    } else if (state.view === 'list') {
      var t = state.track ? trackOf(state.track) : null;
      var w = el('div', 'pane');
      if (t) {
        w.appendChild(el('h1', '', t.label));
        w.appendChild(el('p', 'lede', t.desc));
      } else {
        w.appendChild(el('h1', '', 'Todas las fichas'));
        w.appendChild(el('p', 'lede', 'Elige una de la lista para leerla.'));
      }
      w.appendChild(el('p', 'lede', 'Selecciona una ficha en la columna de la izquierda.'));
      reader.appendChild(w);
    } else {
      reader.appendChild(renderHome());
    }

    Array.prototype.forEach.call(document.querySelectorAll('.top-actions button'), function (b) {
      b.classList.toggle('active', b.getAttribute('data-view') === state.view);
    });
    $('main.cols').setAttribute('data-mobile', state.mobilePane);
    Array.prototype.forEach.call(document.querySelectorAll('.mobile-tabs button'), function (b) {
      b.classList.toggle('active', b.getAttribute('data-pane') === state.mobilePane);
    });
  }

  // ---------- Arranque ------------------------------------------------------

  function boot() {
    var theme = store.get('theme', 'dark');
    document.documentElement.setAttribute('data-theme', theme);

    $('#q').addEventListener('input', function (e) {
      state.q = e.target.value;
      if (state.view === 'home' || state.view === 'sources' || state.view === 'about') state.view = 'list';
      state.mobilePane = 'list';
      render();
    });

    $('#btn-theme').onclick = function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', cur);
      store.set('theme', cur);
    };
    $('#btn-home').onclick = function () { state.q = ''; $('#q').value = ''; state.track = null; go('#/'); };
    $('#btn-sources').onclick = function () { state.mobilePane = 'reader'; go('#/fuentes'); };
    $('#btn-about').onclick = function () { state.mobilePane = 'reader'; go('#/acerca'); };
    $('.brand').onclick = function () { go('#/'); };

    Array.prototype.forEach.call(document.querySelectorAll('.mobile-tabs button'), function (b) {
      b.onclick = function () { state.mobilePane = b.getAttribute('data-pane'); render(); };
    });

    document.addEventListener('keydown', function (e) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
      if (e.key === '/' && !typing) { e.preventDefault(); $('#q').focus(); return; }
      if (e.key === 'Escape') {
        if (typing) { document.activeElement.blur(); }
        else if (state.q) { state.q = ''; $('#q').value = ''; render(); }
        return;
      }
      if (typing) return;
      if (e.key === 'j' || e.key === 'k') {
        var docs = filtered();
        if (!docs.length) return;
        var idx = -1;
        for (var i = 0; i < docs.length; i++) if (docs[i].id === state.docId) { idx = i; break; }
        idx = e.key === 'j' ? Math.min(idx + 1, docs.length - 1) : Math.max(idx - 1, 0);
        if (idx < 0) idx = 0;
        state.mobilePane = 'reader';
        go('#/d/' + docs[idx].id);
        var card = document.querySelector('.card[data-id="' + docs[idx].id + '"]');
        if (card && card.scrollIntoView) card.scrollIntoView({ block: 'nearest' });
      }
    });

    window.addEventListener('hashchange', function () { readHash(); render(); });

    if (!DOCS.length) {
      document.body.innerHTML =
        '<div style="padding:60px;text-align:center;font-family:system-ui;color:#8b97ab">' +
        '<h1 style="color:#dbe3ef">AI Radar</h1>' +
        '<p>No hay contenido cargado. Ejecuta <code>bash scripts/build.sh</code> para generar el bundle.</p>' +
        '</div>';
      return;
    }

    var stamp = $('#stamp');
    if (stamp && RAW.generated) stamp.textContent = 'actualizado ' + RAW.generated.slice(0, 10);

    readHash();
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
