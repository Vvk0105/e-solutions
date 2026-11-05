/* Architectural / product pages */
(function () {
    'use strict';
    var M = window.Motion;

    M.afterLoad(function () {
        // Hero text waits for the page to finish loading so it isn't played behind a half-loaded screen
        M.lines('.solutions-hero h1', { trigger: false, duration: 1.4 });
        M.lines('.solutions-hero p', { trigger: false, delay: 0.3, duration: 1.4 });
        M.lines('.category-hero-content p', { trigger: false, stagger: 0.15, duration: 1.4 });
        M.lines('.product-hero h1', { trigger: false, delay: 0.1, duration: 1.4 });
        M.lines('.product-hero p', { trigger: false, delay: 0.3, duration: 1.4 });
    });

    M.whenReady(function () {
        // Content
        M.lines('.category-intro p', { trigger: '.category-intro', start: 'top 80%' });
        M.fadeUp('.category-card');
        M.fadeUp('.subcategory-section', { y: 30 });
    });

})();
