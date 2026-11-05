/* Offshoring page */
(function () {
    'use strict';
    var M = window.Motion;
    M.afterLoad(function () {
        M.lines('.hero-section h1, .hero-section p', { trigger: false, delay: 0.1, stagger: 0.12, duration: 1.4 });
    });
    M.whenReady(function () {
        M.fadeUp('.section-title, .interactive-item, .reason-item, .table-box', { y: 30 });
    });
})();
