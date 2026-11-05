/*
 * Project showcase
 *  - endless auto-scrolling strip at a default speed
 *  - drag / swipe / sideways-wheel moves it at YOUR speed, then it eases back to the default speed
 *  - click (or tap) an image to open it full size in a viewer (arrows, swipe, Esc, click outside)
 */
(function () {
    'use strict';

    var showcase = document.querySelector('.showcase');
    var track = showcase && showcase.querySelector('.showcase-track');
    if (!track) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var originals = Array.prototype.slice.call(track.children);
    var count = originals.length;
    if (!count) return;

    originals.forEach(function (img, i) {
        img.dataset.index = i;
        img.draggable = false;
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'View image ' + (i + 1) + ' of ' + count);
    });

    /* ---------- Lightbox ---------- */
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Image viewer');
    box.hidden = true;
    box.innerHTML =
        '<button type="button" class="lb-btn lb-close" aria-label="Close">&times;</button>' +
        '<button type="button" class="lb-btn lb-prev" aria-label="Previous image">&#8249;</button>' +
        '<img class="lb-img" alt="">' +
        '<button type="button" class="lb-btn lb-next" aria-label="Next image">&#8250;</button>' +
        '<div class="lb-count" aria-live="polite"></div>';
    document.body.appendChild(box);

    var lbImg = box.querySelector('.lb-img');
    var lbCount = box.querySelector('.lb-count');
    var current = 0;
    var lastFocus = null;

    function show(i) {
        current = (i + count) % count;
        var src = originals[current];
        lbImg.classList.remove('is-in');
        lbImg.src = src.currentSrc || src.src;
        lbImg.alt = src.alt || 'Project image ' + (current + 1);
        lbCount.textContent = (current + 1) + ' / ' + count;
        // next frame so the fade-in transition runs
        requestAnimationFrame(function () { lbImg.classList.add('is-in'); });
    }

    function open(i) {
        lastFocus = document.activeElement;
        box.hidden = false;
        document.documentElement.classList.add('lightbox-open');
        if (window.Motion && Motion.lenis) Motion.lenis.stop();
        show(i);
        requestAnimationFrame(function () { box.classList.add('is-open'); });
        box.querySelector('.lb-close').focus();
    }

    function close() {
        box.classList.remove('is-open');
        document.documentElement.classList.remove('lightbox-open');
        if (window.Motion && Motion.lenis && !document.documentElement.classList.contains('menu-open')) Motion.lenis.start();
        setTimeout(function () { box.hidden = true; lbImg.removeAttribute('src'); }, 250);
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    box.addEventListener('click', function (e) {
        if (e.target.closest('.lb-close') || e.target === box) close();
        else if (e.target.closest('.lb-prev')) show(current - 1);
        else if (e.target.closest('.lb-next')) show(current + 1);
    });
    document.addEventListener('keydown', function (e) {
        if (box.hidden) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') show(current - 1);
        else if (e.key === 'ArrowRight') show(current + 1);
    });
    var tx = null;
    box.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
        if (tx === null) return;
        var dx = e.changedTouches[0].clientX - tx;
        tx = null;
        if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    }, { passive: true });

    // keyboard: Enter / Space on a focused image opens it
    track.addEventListener('keydown', function (e) {
        var img = e.target.closest('img');
        if (img && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(+img.dataset.index); }
    });

    /* ---------- Auto-scroll that you can take over ---------- */
    // duplicate once so shifting by half the track loops seamlessly
    originals.forEach(function (img) {
        var c = img.cloneNode(true);
        c.removeAttribute('role');
        c.removeAttribute('aria-label');
        c.tabIndex = -1;
        c.setAttribute('aria-hidden', 'true');
        c.alt = '';
        track.appendChild(c);
    });

    if (reduceMotion) {
        // No motion: plain horizontally scrollable row (CSS), clicks still open the viewer
        track.addEventListener('click', function (e) {
            var img = e.target.closest('img');
            if (img) open(+img.dataset.index);
        });
        return;
    }

    var BASE_SPEED = 45;      // px per second when nobody is touching it
    var pos = 0;              // how far the strip has moved (px)
    var half = 0;             // width of one set of images
    var boost = 0;            // extra velocity from the user (px/s), decays back to 0
    var hoverFactor = 1;      // 1 = full auto speed, eases to 0 while hovering (desktop)
    var hovering = false;
    var dragging = false;
    var moved = 0;
    var lastX = 0;
    var lastT = 0;
    var visible = true;
    var last = 0;

    function measure() { half = track.scrollWidth / 2; }
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    track.querySelectorAll('img').forEach(function (img) { img.addEventListener('load', measure); });

    function wrap(v) { return half ? ((v % half) + half) % half : v; }

    function frame(t) {
        requestAnimationFrame(frame);
        var dt = Math.min((t - last) / 1000, 0.05);
        last = t;
        if (!visible || !half) return;
        if (!dragging) {
            hoverFactor += ((hovering ? 0 : 1) - hoverFactor) * Math.min(dt * 6, 1);
            boost *= Math.exp(-dt * 2.2); // glide back to the default speed
            if (Math.abs(boost) < 1) boost = 0;
            pos += (BASE_SPEED * hoverFactor + boost) * dt;
        }
        pos = wrap(pos);
        track.style.transform = 'translate3d(' + (-pos).toFixed(2) + 'px,0,0)';
    }

    // stop the CSS animation: JS owns the position now
    track.style.animation = 'none';
    requestAnimationFrame(function (t) { last = t; requestAnimationFrame(frame); });

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }).observe(showcase);
    }

    // Pointer (mouse / touch / pen) drag
    showcase.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        dragging = true;
        moved = 0;
        boost = 0;
        lastX = e.clientX;
        lastT = performance.now();
        showcase.classList.add('is-dragging');
    });
    window.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var now = performance.now();
        var dx = e.clientX - lastX;
        moved += Math.abs(dx);
        if (moved > 6 && !showcase.hasPointerCapture(e.pointerId)) {
            try { showcase.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
        }
        pos -= dx;
        var dtm = Math.max(now - lastT, 1) / 1000;
        boost = Math.max(-2500, Math.min(2500, -dx / dtm)); // release velocity
        lastX = e.clientX;
        lastT = now;
    });
    function endDrag() {
        if (!dragging) return;
        dragging = false;
        showcase.classList.remove('is-dragging');
        if (performance.now() - lastT > 80) boost = 0; // paused before letting go -> no fling
    }
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    // Click / tap opens the viewer – but not at the end of a drag
    track.addEventListener('click', function (e) {
        var img = e.target.closest('img');
        if (!img || moved > 6) return;
        open(+img.dataset.index);
    });

    // Sideways trackpad / shift+wheel moves it at your speed (vertical wheel still scrolls the page)
    showcase.addEventListener('wheel', function (e) {
        var horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
        if (!horizontal) return;
        e.preventDefault();
        var d = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;
        pos += d;
        boost = Math.max(-2500, Math.min(2500, boost + d * 4));
    }, { passive: false });

    // Hover pauses the auto-scroll on desktop so images are easy to click
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        showcase.addEventListener('mouseenter', function () { hovering = true; });
        showcase.addEventListener('mouseleave', function () { hovering = false; });
    }
})();
