/* ============================================================
   ZEBRANO INTERIORS — shell (main.js)
   Preloader · nav · cursor · Lenis · grain · page transitions
   Everything is enhancement-only: readable with JS off.
   ============================================================ */
(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- preloader (homepage only, plays on every load) ---------- */
  var pre = document.getElementById('preloader');
  var isHome = /(^|\/)(index\.html)?$/.test(window.location.pathname);
  if (pre) {
    if (reduced || !isHome) {
      pre.classList.add('is-done');
    } else {
      var letters = pre.querySelectorAll('.pre-word i');
      var done = false;
      function kill() {
        if (done) return;
        done = true;
        pre.classList.add('is-done');
      }
      if (window.gsap && letters.length) {
        gsap.timeline()
          .fromTo('.pre-strip::after', { xPercent: -100 }, { xPercent: 0, duration: 0.9, ease: 'power2.inOut' }, 0.15)
          .fromTo('.pre-mark', { scale: 0.72, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.2)
          .fromTo(Array.prototype.slice.call(letters), { yPercent: 115 }, { yPercent: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out' }, 0.3)
          .to(pre, { yPercent: -100, duration: 0.7, ease: 'power4.inOut', onComplete: kill }, 1.15);
      } else {
        setTimeout(kill, 250);
      }
      setTimeout(kill, 2600); /* safety */
    }
  }

  /* ---------- header scrolled state ---------- */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var body = document.body;
  if (toggle) {
    toggle.addEventListener('click', function () {
      body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', body.classList.contains('nav-open') ? 'true' : 'false');
    });
    body.querySelectorAll('.menu a').forEach(function (a) {
      a.addEventListener('click', function () { body.classList.remove('nav-open'); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') body.classList.remove('nav-open');
    });
  }

  /* ---------- smooth scroll (Lenis) ---------- */
  if (!reduced && window.Lenis) {
    var lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    if (window.gsap) {
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      var el = id ? document.getElementById(id) : null;
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      }
    });
  }

  /* ---------- trailing cursor (fine pointers only) ---------- */
  if (finePointer && !reduced) {
    doc.classList.add('has-cursor');
    var dot = document.getElementById('cursor-dot');
    var ring = document.getElementById('cursor-ring');
    if (dot && ring) {
      var mx = -100, my = -100, rx = -100, ry = -100;
      var shown = false;
      document.addEventListener('pointermove', function (e) {
        mx = e.clientX; my = e.clientY;
        if (!shown) {
          shown = true;
          rx = mx; ry = my;
          dot.style.left = mx + 'px'; dot.style.top = my + 'px';
          ring.style.left = mx + 'px'; ring.style.top = my + 'px';
        }
      }, { passive: true });
      (function loop() {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.transform = 'translate(-50%,-50%) translate(' + rx + 'px,' + ry + 'px)';
        dot.style.transform = 'translate(-50%,-50%) translate(' + mx + 'px,' + my + 'px)';
        requestAnimationFrame(loop);
      })();
      document.addEventListener('pointerover', function (e) {
        var hot = e.target.closest('a, button, .plate, .spot-card, .chip, input, textarea, .roll-btn');
        ring.classList.toggle('is-hot', !!hot);
      });
    }
  }

  /* ---------- footer year ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* ---------- page transition curtain ---------- */
  var curtain = document.getElementById('curtain');
  if (curtain && !reduced && window.gsap) {
    var navigating = false;
    document.addEventListener('click', function (e) {
      if (navigating) return;
      var a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target && a.target !== '_self') return;
      if (a.hasAttribute('download') || a.hasAttribute('rel')) return;
      var href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || href.startsWith('//')) return;
      if (a.pathname === window.location.pathname) return;
      e.preventDefault();
      navigating = true;
      gsap.to(curtain, {
        yPercent: 0, duration: 0.5, ease: 'power4.inOut',
        onComplete: function () { window.location.href = a.href; }
      });
    });
    window.addEventListener('pageshow', function () {
      gsap.fromTo(curtain, { yPercent: 0 }, { yPercent: 100, duration: 0.55, ease: 'power4.inOut', delay: 0.05 });
    });
  }
})();