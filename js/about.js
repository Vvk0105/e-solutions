// about.js - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    // Wait for all assets to load
    window.addEventListener('load', function() {
        // Initialize Locomotive Scroll
        const locoScroll = new LocomotiveScroll({
            el: document.querySelector(".main"),
            smooth: true,
            multiplier: 0.8,
            getDirection: true
        });

        // Setup GSAP and ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        

        // Hero animation
        gsap.from(".about-hero h1", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power2.out"
        });

        // Milestones animation
        gsap.from(".milestone-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                scroller: ".main",
                trigger: ".milestones",
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none none",
                markers: false // Set to true to debug positions
            }
        });

        // Values animation
        gsap.from(".value-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                scroller: ".main",
                trigger: ".values-section",
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none none"
            }
        });

        // Team animation
        gsap.from(".team-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                scroller: ".main",
                trigger: ".team-section",
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none none"
            }
        });

        // CTA animation
        gsap.from(".about-cta", {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                scroller: ".main",
                trigger: ".about-cta",
                start: "top 80%",
                end: "top 60%",
                toggleActions: "play none none none"
            }
        });

        // Refresh on resize
        window.addEventListener('resize', function() {
            ScrollTrigger.refresh();
            locoScroll.update();
        });

        // Initial refresh
        ScrollTrigger.refresh();
    });
});