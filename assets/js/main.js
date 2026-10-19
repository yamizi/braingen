(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- Participants (set confirmed:false to hide anyone) ---------- */
  var PEOPLE = [
    { n: 'Beatriz Garcia Santa Cruz', a: 'University of Luxembourg · LCSB', g: 'org', f: ['clin', 'ai'], b: 'Medical imaging, translational medicine and medical software. Coordinating PI.', confirmed: true },
    { n: 'Salah Ghamizi', a: 'University of Luxembourg · SnT', g: 'org', f: ['ai'], b: 'Graph neural networks and trustworthy machine learning in critical settings.', confirmed: true },
    { n: 'Thomas Raleigh', a: 'University of Luxembourg · FHSE', g: 'org', f: ['hum'], b: 'Epistemology of AI: what is required to understand and explain AI systems.', confirmed: true },
    { n: 'Magali Perquin', a: 'Luxembourg Institute of Health', g: 'lux', f: ['epi', 'clin'], b: 'Epidemiology of neurodegenerative diseases and how everyday activity mitigates cognitive decline.', confirmed: true },
    { n: 'Lukas Pavelka', a: 'Centre Hospitalier de Luxembourg', g: 'lux', f: ['clin'], b: 'Neurologist: movement disorders, Parkinson\'s biomarkers and computational pathophysiology.', confirmed: true },
    { n: 'Johan Largo', a: 'University of Luxembourg · FHSE', g: 'lux', f: ['hum'], b: 'PhD researcher on human-AI interaction and the impact of LLMs on cognitive science.', confirmed: true },
    { n: 'Marzyeh Ghassemi', a: 'MIT · IMES', g: 'int', f: ['ai', 'epi'], b: 'Clinically grounded evaluation of medical AI, language and foundation models; fairness in health.', confirmed: false },
    { n: 'Guillermo Lorenzo Gómez', a: 'University of A Coruña', g: 'int', f: ['ai', 'clin'], b: 'Ramón y Cajal Fellow; 2025 ERC Starting Grant on digital twins for cancer modelling.', confirmed: false },
    { n: 'Ann Christin Hau', a: 'University Hospital Frankfurt', g: 'int', f: ['clin'], b: 'Leads Translational Neuro-Oncology: brain tumour progression and therapy resistance.', confirmed: false },
    { n: 'Rick C.G. Helmich', a: 'Donders Centre for Cognitive Neuroimaging', g: 'int', f: ['clin'], b: 'Neurologist studying neural mechanisms of movement disorders such as Parkinson\'s.', confirmed: false },
    { n: 'María J. Ledesma-Carbayo', a: 'Universidad Politécnica de Madrid', g: 'int', f: ['ai'], b: 'Biomedical engineering and medical imaging, multimodal AI and federated learning.', confirmed: false },
    { n: 'María Villalobos-Quesada', a: 'Leiden University', g: 'int', f: ['hum'], b: 'Ethical, regulatory and societal implications of AI, big data and eHealth in medicine.', confirmed: false },
    { n: 'Lena Maier-Hein', a: 'German Cancer Research Center (DKFZ)', g: 'int', f: ['ai', 'epi'], b: 'Computer-assisted interventions; lead author of Metrics Reloaded on image-analysis validation.', confirmed: false },
    { n: 'Laure Wynants', a: 'Maastricht University · KU Leuven', g: 'int', f: ['epi'], b: 'Validation and critical appraisal of clinical prediction models; led the COVID-19 model review.', confirmed: false },
    { n: 'Lê Nguyên Hoang', a: 'Science4All · Orange AI Ethics Committee', g: 'int', f: ['ai', 'hum'], b: 'AI safety researcher and science communicator focused on algorithmic ethics.', confirmed: false }
  ];
  var LABEL = { org: 'Organiser', lux: 'Luxembourg', int: 'International' };

  function initials(name) {
    var p = name.split(' ').filter(Boolean);
    return (p[0][0] + p[p.length - 1][0]).toUpperCase();
  }
  var box = document.getElementById('people');
  PEOPLE.filter(function (p) { return p.confirmed; }).forEach(function (p) {
    var el = document.createElement('article');
    el.className = 'person reveal';
    el.dataset.f = p.f.join(' ');
    var av = document.createElement('div'); av.className = 'av'; av.textContent = initials(p.n);
    var h = document.createElement('h3'); h.textContent = p.n;
    var a = document.createElement('div'); a.className = 'aff'; a.textContent = p.a;
    var b = document.createElement('p'); b.textContent = p.b;
    var t = document.createElement('span'); t.className = 'badge' + (p.g === 'org' ? ' org' : ''); t.textContent = LABEL[p.g];
    [av, h, a, b, t].forEach(function (x) { el.appendChild(x); });
    box.appendChild(el);
  });

  document.getElementById('filters').addEventListener('click', function (e) {
    var btn = e.target.closest('button'); if (!btn) return;
    this.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', b === btn); });
    var f = btn.dataset.f;
    box.querySelectorAll('.person').forEach(function (c) {
      c.hidden = !(f === 'all' || c.dataset.f.split(' ').indexOf(f) > -1);
    });
  });

  /* ---------- Nav ---------- */
  var nav = document.getElementById('nav'), burger = document.getElementById('burger'), menu = document.getElementById('menu');
  addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 10); }, { passive: true });
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- Agenda tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role=tab]'));
  function select(t) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
    t.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') select(tabs[(i + 1) % tabs.length]);
      if (e.key === 'ArrowLeft') select(tabs[(i + tabs.length - 1) % tabs.length]);
    });
  });

  /* ---------- Countdown (Luxembourg, CET = UTC+1) ---------- */
  var target = Date.parse('2027-03-01T09:00:00+01:00');
  var ids = ['d', 'h', 'm', 's'].map(function (k) { return document.getElementById('cd-' + k); });
  function tick() {
    var s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    var v = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
    v.forEach(function (n, i) { ids[i].textContent = i ? String(n).padStart(2, '0') : n; });
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Scroll reveal ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add('in'); });

  /* ---------- Hero neural mesh ---------- */
  var cv = document.getElementById('mesh');
  if (cv && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ctx = cv.getContext('2d'), W, H, pts = [], dpr = Math.min(devicePixelRatio || 1, 2);
    function size() {
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(70, W * H / 16000));
      pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 });
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      for (var i = 0; i < pts.length; i++) {
        for (var j = i + 1; j < pts.length; j++) {
          var dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) { ctx.strokeStyle = 'rgba(124,140,255,' + (0.28 * (1 - d / 140)) + ')'; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
        }
        ctx.fillStyle = 'rgba(34,211,238,.8)'; ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, 1.8, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    size(); addEventListener('resize', size); frame();
  }
})();
