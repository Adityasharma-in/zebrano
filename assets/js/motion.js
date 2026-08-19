/* ============================================================
   ZEBRANO INTERIORS — motion (motion.js)
   Split text · reveals · counters · magnet · tilt · spotlight
   rolling gallery · contact form
   Enhancement-only; never required for readability.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var gsapOK = !reduced && !!window.gsap;

  /* ---------- line splitter (own SplitText) ---------- */
  function splitLines(el) {
    if (el.getAttribute('data-split') === 'done') return null;
    el.setAttribute('data-split', 'done');
    var text = el.textContent.replace(/\s+/g, ' ').trim();
    el.setAttribute('aria-label', text);
    el.textContent = '';
    var words = text.split(' ');
    words.forEach(function (w, i) {
      var s = document.createElement('span');
      s.className = 'w';
      s.textContent = w;
      el.appendChild(s);
      el.appendChild(document.createTextNode(i < words.length - 1 ? ' ' : ''));
    });
    /* cluster by visual row */
    var rows = [], cur = [], lastTop = null;
    Array.prototype.forEach.call(el.querySelectorAll('.w'), function (s) {
      var top = s.offsetTop;
      if (lastTop !== null && top !== lastTop) { rows.push(cur); cur = []; }
      cur.push(s); lastTop = top;
    });
    if (cur.length) rows.push(cur);
    el.textContent = '';
    var lines = rows.map(function (row) {
      var line = document.createElement('span');
      line.className = 'line';
      line.setAttribute('aria-hidden', 'true');
      var inner = document.createElement('span');
      inner.className = 'line-inner';
      row.forEach(function (s, i) {
        inner.appendChild(s);
        if (i < row.length - 1) inner.appendChild(document.createTextNode(' '));
      });
      line.appendChild(inner);
      return line;
    });
    lines.forEach(function (l) { el.appendChild(l); });
    return lines;
  }

  function initSplit(targets) {
    if (!gsapOK) return;
    var els = document.querySelectorAll(targets);
    if (!els.length) return;
    /* build first, animate after fonts settle */
    Array.prototype.forEach.call(els, function (el) {
      var lines = splitLines(el);
      if (!lines) return;
      gsap.set(Array.prototype.slice.call(lines).map(function (l) { return l.querySelector('.line-inner'); }),
        { yPercent: 115 });
      gsap.to(Array.prototype.slice.call(lines).map(function (l) { return l.querySelector('.line-inner'); }), {
        yPercent: 0,
        duration: 1.15,
        stagger: 0.09,
        ease: 'power4.out',
        delay: 0.15
      });
    });
  }

  /* ---------- scroll reveals ---------- */
  function initReveals() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(els, function (el) { el.classList.add('revealed'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('revealed');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
    /* failsafe: content must never stay hidden if the observer misses */
    setTimeout(function () {
      Array.prototype.forEach.call(els, function (el) {
        if (!el.classList.contains('revealed')) el.classList.add('revealed');
      });
    }, 2200);
  }

  /* ---------- counters ---------- */
  function initCounters() {
    if (!gsapOK) return;
    var nums = document.querySelectorAll('[data-count]');
    Array.prototype.forEach.call(nums, function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var dec = (el.getAttribute('data-count').split('.')[1] || '').length;
      function render(v) {
        el.textContent = (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-IN')) + suffix;
      }
      render(0);
      gsap.to({ v: 0 }, {
        v: target, duration: 1.6, ease: 'power2.out',
        onUpdate: function () { render(this.targets()[0].v); }
      });
    });
  }

  /* ---------- spotlight cards ---------- */
  function initSpotlight() {
    var els = document.querySelectorAll('[data-spotlight]');
    Array.prototype.forEach.call(els, function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--sx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--sy', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- rolling gallery ---------- */
  function initRoll() {
    var track = document.querySelector('.roll-track');
    if (!track) return;
    var bar = document.querySelector('.roll-progress i');
    var left = document.querySelector('[data-roll-prev]');
    var next = document.querySelector('[data-roll-next]');
    function update() {
      var max = track.scrollWidth - track.clientWidth;
      var p = max > 0 ? track.scrollLeft / max : 0;
      if (bar) bar.style.transform = 'scaleX(' + (0.12 + p * 0.88) + ')';
    }
    track.addEventListener('scroll', update, { passive: true });
    update();
    if (left) left.addEventListener('click', function () {
      track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' });
    });
    if (next) next.addEventListener('click', function () {
      track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
    });
  }

  /* ---------- contact form → WhatsApp / mail intents ---------- */
  function initForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var wa = document.getElementById('wa-submit');
    var mail = document.getElementById('mail-submit');
    function val(field) {
      var ok = true;
      if (!field.value.trim()) { field.closest('.field').classList.add('invalid'); ok = false; }
      else field.closest('.field').classList.remove('invalid');
      return ok;
    }
    function collect() {
      var name = form.name, phone = form.phone, email = form.email, msg = form.message;
      var ok = true;
      ok = val(name) && ok;
      ok = val(phone) && ok;
      if (phone.value.trim() && !/^[+\d][\d\s-]{8,14}$/.test(phone.value.trim())) {
        phone.closest('.field').classList.add('invalid'); ok = false;
      }
      if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.closest('.field').classList.add('invalid'); ok = false;
      }
      ok = val(msg) && ok;
      return ok ? { name: name.value.trim(), phone: phone.value.trim(), email: email.value.trim(), msg: msg.value.trim() } : null;
    }
    if (wa) wa.addEventListener('click', function (e) {
      e.preventDefault();
      var d = collect();
      if (!d) return;
      var text = 'Hello Zebrano Interiors! I\u2019m ' + d.name +
        '.%0APhone: ' + encodeURIComponent(d.phone) +
        (d.email ? '%0AEmail: ' + encodeURIComponent(d.email) : '') +
        '%0A%0A' + encodeURIComponent(d.msg);
      window.open('https://wa.me/919899995656?text=' + text, '_blank', 'noopener');
    });
    if (mail) mail.addEventListener('click', function (e) {
      e.preventDefault();
      var d = collect();
      if (!d) return;
      var subject = encodeURIComponent('Project enquiry — ' + d.name);
      var body = encodeURIComponent('Name: ' + d.name + '\nPhone: ' + d.phone +
        (d.email ? '\nEmail: ' + d.email : '') + '\n\n' + d.msg);
      window.location.href = 'mailto:zebranointeriors@gmail.com?subject=' + subject + '&body=' + body;
    });
    form.querySelectorAll('input, textarea').forEach(function (f) {
      f.addEventListener('input', function () { f.closest('.field').classList.remove('invalid'); });
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    initSplit('[data-split]');
    initReveals();
    initCounters();
    initSpotlight();
    initRoll();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 0); });
  } else {
    setTimeout(boot, 0);
  }

  /* re-split after fonts load so rows are final */
  if (document.fonts && document.fonts.ready && gsapOK) {
    document.fonts.ready.then(function () {
      setTimeout(function () { initSplit('[data-split]'); }, 120);
    });
  }
})();