/* Home page */
(function () {
    'use strict';

    var M = window.Motion;
    var loader = document.getElementById('loader');

    /* ---------- Intro loader (first visit of the session only) ---------- */
    function runLoader() {
        if (!loader) return;
        var seen = false;
        try { seen = !!sessionStorage.getItem('visited'); } catch (e) { /* storage blocked */ }

        if (seen || !M.ready || M.reduceMotion) {
            loader.style.display = 'none';
            return;
        }
        gsap.timeline({
            onComplete: function () {
                loader.style.display = 'none';
                try { sessionStorage.setItem('visited', '1'); } catch (e) { /* ignore */ }
            }
        })
            .from('#loader h3', { x: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' })
            .to('#loader h3', { x: -40, opacity: 0, duration: 0.6, stagger: -0.08, ease: 'power3.in' }, '+=0.1')
            .to(loader, { opacity: 0, duration: 0.35 });
    }

    /* ---------- Hero slideshow ---------- */
    function initSlideshow() {
        var slides = document.querySelectorAll('.slide');
        if (slides.length < 2) return;
        var current = 0;
        var timer = null;

        function next() {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }
        function start() { if (!timer) timer = setInterval(next, 2800); }
        function stop() { clearInterval(timer); timer = null; }

        start();
        // Don't burn CPU while the tab is hidden or the hero is off-screen
        document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                entries[0].isIntersecting ? start() : stop();
            }).observe(document.querySelector('.page1'));
        }
    }

    /* ---------- Scroll animations ---------- */
    function initScroll() {
        if (!M.ready) return;

        // Hero shrinks slightly as you scroll (clip-path = GPU friendly, no layout work)
        if (!M.reduceMotion) {
            gsap.to('.page1 .slideshow', {
                clipPath: 'inset(0% 15% 0% 15%)',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.page1',
                    start: '30% 10%',
                    end: 'bottom 30%',
                    scrub: 0.6
                }
            });
        }

        M.lines('.offshoring', { trigger: '.page2-container', start: 'top 70%' });
        M.lines('.arch-solut', { trigger: '.page3-container', start: 'top 70%' });
        M.lines('.about-content h3, .about-content > p', { trigger: '.about-container', start: 'top 90%' });
        M.fadeUp('.value-item', { start: 'top 92%' });
        M.reveal('.full-width-img');
        M.magnet();
    }

    runLoader();
    // The intro text/section reveals are deferred until fonts are ready
    M.whenReady(initScroll);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSlideshow);
    else initSlideshow();
})();
