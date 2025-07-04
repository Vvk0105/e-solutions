document.addEventListener('DOMContentLoaded', function() {
    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });

    // Form animation
    gsap.from(".contact-form", {
        scrollTrigger: {
            trigger: ".contact-hero",
            start: "bottom bottom",
            toggleActions: "play none none none"
        },
        x: -50,
        opacity: 0,
        duration: 1
    });

    gsap.from(".contact-info", {
        scrollTrigger: {
            trigger: ".contact-hero",
            start: "bottom bottom",
            toggleActions: "play none none none"
        },
        x: 50,
        opacity: 0,
        duration: 1
    });

    // Hover effect for info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -5, duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3 });
        });
    });
});