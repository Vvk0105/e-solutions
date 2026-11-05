/* Architectural / product pages */
(function () {
    'use strict';
    var M = window.Motion;

    /* Continuous product marquee */
    function initSwiper() {
        if (!window.Swiper || !document.querySelector('.swiper')) return;
        new Swiper('.swiper', {
            spaceBetween: 10,
            loop: true,
            speed: 8500,
            slidesPerView: 'auto',
            freeMode: true,
            autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false },
            allowTouchMove: true,
            touchReleaseOnEdges: true
        });
    }

    M.whenReady(function () {
        // Hero text (visible straight away, so no scroll trigger)
        M.lines('.solutions-hero h1', { trigger: false, duration: 1.4 });
        M.lines('.solutions-hero p', { trigger: false, delay: 0.3, duration: 1.4 });
        M.lines('.category-hero-content p', { trigger: false, stagger: 0.15, duration: 1.4 });
        M.lines('.product-hero h1', { trigger: false, delay: 0.1, duration: 1.4 });
        M.lines('.product-hero p', { trigger: false, delay: 0.3, duration: 1.4 });

        // Content
        M.lines('.category-intro p', { trigger: '.category-intro', start: 'top 80%' });
        M.fadeUp('.category-card');
        M.fadeUp('.subcategory-section', { y: 30 });
        M.fadeUp('#footer', { y: 40, start: 'top 98%' });
    });

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSwiper);
    else initSwiper();
})();
