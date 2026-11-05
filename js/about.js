/* About page */
(function () {
    'use strict';
    var M = window.Motion;

    M.whenReady(function () {
        M.lines('.hero-content h1, .hero-content p', { trigger: false, delay: 0.2, stagger: 0.12, duration: 1.4 });
        M.lines('.intro-content h2, .intro-content p', { trigger: '.about-intro', start: 'top 75%' });
        M.lines('.section-header h2, .section-header p', { trigger: '.values-section', start: 'top 80%' });
        M.fadeUp('.value-card');
        M.fadeUp('.intro-image', { y: 30 });
        M.fadeUp('.about-cta > *', { y: 30 });
        M.fadeUp('#footer', { y: 40, start: 'top 98%' });
        M.magnet();
    });
})();
