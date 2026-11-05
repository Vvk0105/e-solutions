/* About page */
(function () {
    'use strict';
    var M = window.Motion;

    M.afterLoad(function () {
        M.lines('.hero-content h1, .hero-content p', { trigger: false, delay: 0.1, stagger: 0.12, duration: 1.4 });
    });
    M.whenReady(function () {
        M.lines('.intro-content h2, .intro-content p', { trigger: '.about-intro', start: 'top 75%' });
        M.lines('.section-header h2, .section-header p', { trigger: '.values-section', start: 'top 80%' });
        M.fadeUp('.value-card');
        M.reveal('.intro-image');
        M.fadeUp('.about-cta > *', { y: 30 });
        M.magnet();
    });
})();
