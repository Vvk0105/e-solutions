/* Offshoring page */
(function () {
    'use strict';
    var M = window.Motion;
    M.whenReady(function () {
        M.lines('.hero-section h1, .hero-section p', { trigger: false, delay: 0.2, stagger: 0.12, duration: 1.4 });
        M.fadeUp('.section-title, .section-subtitle, .solution-text', { y: 30 });
        M.fadeUp('.interactive-item, .reason-item, .table-box, .check-list', { y: 30 });
        M.fadeUp('.dynamic-img-wrapper, .cta-section .container', { y: 30 });
        M.fadeUp('#footer', { y: 40, start: 'top 98%' });
    });
})();
