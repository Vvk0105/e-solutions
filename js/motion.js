/*
 * Shared behaviour for every page:
 *  - mobile navigation
 *  - nav-logo fade near the footer
 *  - small GSAP helpers (text reveal, fade-up) used by the page scripts
 *
 * Scrolling is native (no scroll-hijacking library), so it stays smooth and
 * identical on desktop and mobile. All animation only touches transform/opacity.
 */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasGsap = typeof window.gsap !== 'undefined';

    /* ---------- Navigation ---------- */
    function initNav() {
        var nav = document.getElementById('nav-part2');
        if (!nav) return;

        var toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'menu-toggle';
        toggle.setAttribute('aria-label', 'Toggle menu');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', 'nav-part2');
        toggle.innerHTML = '<span></span><span></span><span></span>';
        document.body.appendChild(toggle);

        function setOpen(open) {
            toggle.classList.toggle('active', open);
            nav.classList.toggle('active', open);
            toggle.setAttribute('aria-expanded', String(open));
            document.documentElement.classList.toggle('menu-open', open);
        }

        toggle.addEventListener('click', function () {
            setOpen(!nav.classList.contains('active'));
        });
        nav.addEventListener('click', function (e) {
            if (e.target.closest('.nav-link')) setOpen(false);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setOpen(false);
        });
        window.matchMedia('(min-width: 769px)').addEventListener('change', function (e) {
            if (e.matches) setOpen(false);
        });
    }

    /* ---------- Logo fades out when the footer comes into view ---------- */
    function initLogoFade() {
        var footer = document.getElementById('footer');
        if (!footer || !('IntersectionObserver' in window)) return;
        new IntersectionObserver(function (entries) {
            document.body.classList.toggle('footer-in-view', entries[0].isIntersecting);
        }, { rootMargin: '0px 0px -20% 0px' }).observe(footer);
    }

    /* ---------- GSAP helpers ---------- */
    var Motion = window.Motion = { reduceMotion: reduceMotion, ready: hasGsap };

    if (hasGsap) {
        gsap.registerPlugin(ScrollTrigger);
        if (window.SplitText) gsap.registerPlugin(SplitText);
        // Stops mobile address-bar show/hide from re-calculating every trigger (a major source of jank)
        ScrollTrigger.config({ ignoreMobileResize: true });
    }

    /* ---------- Smooth (inertia) scrolling for mouse / trackpad users ---------- */
    Motion.lenis = null;
    if (hasGsap && window.Lenis && !reduceMotion &&
        window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        var lenis = Motion.lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
        gsap.ticker.lagSmoothing(0);
        // Pause while the mobile menu / overlays lock scrolling
        new MutationObserver(function () {
            document.documentElement.classList.contains('menu-open') ? lenis.stop() : lenis.start();
        }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    /** Make elements visible again (they are hidden in CSS until JS runs). */
    Motion.show = function (targets) {
        document.querySelectorAll(targets).forEach(function (el) { el.style.visibility = 'visible'; });
    };

    /**
     * Masked line-by-line text reveal.
     * @param {string} selector  elements to split
     * @param {object} o         { trigger, start, delay, stagger, duration, once }
     */
    Motion.lines = function (selector, o) {
        o = o || {};
        var els = gsap.utils.toArray(selector);
        if (!els.length) return;
        Motion.show(selector);
        if (reduceMotion || !window.SplitText) return;

        els.forEach(function (el) {
            SplitText.create(el, {
                type: 'lines',
                linesClass: 'line',
                autoSplit: true,
                mask: 'lines',
                onSplit: function (self) {
                    var st = o.trigger === false ? null : {
                        trigger: o.trigger || el,
                        start: o.start || 'top 85%',
                        once: true
                    };
                    return gsap.from(self.lines, {
                        yPercent: 110,
                        duration: o.duration || 1.2,
                        delay: o.delay || 0,
                        stagger: o.stagger || 0.08,
                        ease: 'power4.out',
                        scrollTrigger: st
                    });
                }
            });
        });
    };

    /** Fade-up elements as they scroll into view (batched = one observer, many elements). */
    Motion.fadeUp = function (selector, o) {
        o = o || {};
        var els = gsap.utils.toArray(selector);
        if (!els.length || reduceMotion) return;
        var dist = o.y || 40;
        // CSS hover transitions on the same elements would fight GSAP frame-by-frame -> disable while animating
        gsap.set(els, { opacity: 0, y: dist, transition: 'none' });
        ScrollTrigger.batch(els, {
            start: o.start || 'top 88%',
            once: true,
            onEnter: function (batch) {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: o.duration || 0.9,
                    stagger: o.stagger || 0.12,
                    ease: 'power3.out',
                    overwrite: true,
                    clearProps: 'transform,transition'
                });
            }
        });
    };

    /** Slide in from a side (used for two-column blocks). */
    Motion.fromSide = function (selector, x, trigger) {
        var els = gsap.utils.toArray(selector);
        if (!els.length || reduceMotion) return;
        // Sideways offsets would cause horizontal scroll on phones, so fall back to a vertical rise
        var narrow = window.matchMedia('(max-width: 768px)').matches;
        gsap.from(els, {
            x: narrow ? 0 : x, y: narrow ? 30 : 0, opacity: 0, duration: 1, ease: 'power3.out', clearProps: 'transform,transition',
            scrollTrigger: { trigger: trigger || els[0], start: 'top 80%', once: true }
        });
    };

    /** Magnetic hover button – desktop pointers only. */
    Motion.magnet = function () {
        var magnet = document.querySelector('.margneto');
        if (!magnet || !hasGsap || reduceMotion) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        var label = magnet.querySelector('.about-text, .text');
        var mx = gsap.quickTo(magnet, 'x', { duration: 0.8, ease: 'power3.out' });
        var my = gsap.quickTo(magnet, 'y', { duration: 0.8, ease: 'power3.out' });
        var lx = label && gsap.quickTo(label, 'x', { duration: 0.8, ease: 'power3.out' });
        var ly = label && gsap.quickTo(label, 'y', { duration: 0.8, ease: 'power3.out' });

        magnet.addEventListener('mousemove', function (e) {
            var r = magnet.getBoundingClientRect();
            var nx = (e.clientX - r.left) / r.width - 0.5;
            var ny = (e.clientY - r.top) / r.height - 0.5;
            mx(nx * 40); my(ny * 40);
            if (label) { lx(nx * 80); ly(ny * 80); }
        });
        magnet.addEventListener('mouseleave', function () {
            mx(0); my(0);
            if (label) { lx(0); ly(0); }
        });
    };

    /** Run fn once fonts are ready (so SplitText measures real line breaks). */
    Motion.whenReady = function (fn) {
        var run = function () { if (hasGsap) fn(); };
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
        else window.addEventListener('load', run);
    };

    /* ---------- Showcase marquee: duplicate the images once so the CSS loop is seamless ---------- */
    function initShowcase() {
        document.querySelectorAll('.showcase-track').forEach(function (track) {
            var items = Array.prototype.slice.call(track.children);
            if (!items.length) return;
            items.forEach(function (img) {
                var c = img.cloneNode(true);
                c.setAttribute('aria-hidden', 'true');
                c.alt = '';
                track.appendChild(c);
            });
            track.style.setProperty('--dur', items.length * 9 + 's'); // constant speed whatever the count
        });
    }

    function boot() {
        initNav();
        initLogoFade();
        initShowcase();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
