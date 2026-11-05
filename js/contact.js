/* Contact page (form submission is handled by the inline script in contact.html) */
(function () {
    'use strict';
    var M = window.Motion;

    M.afterLoad(function () {
        M.lines('.hero-content h1, .hero-content p', { trigger: false, delay: 0.1, stagger: 0.12, duration: 1.4 });
    });
    M.whenReady(function () {
        M.fadeUp('.office-card');
        M.fadeUp('.contact-info h2', { y: 24 });
        M.fadeUp('.contact-card');
        M.fromSide('.cta-content', -50, '.cta-section');
        M.fromSide('.cta-image', 50, '.cta-section');
        M.fadeUp('.cta-buttons > *', { y: 20 });
        M.fadeUp('.enquiry-form-section', { y: 40 });
    });
})();
