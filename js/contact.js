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
        
        // Update ScrollTrigger when Locomotive Scroll updates
        locoScroll.on("scroll", ScrollTrigger.update);
        
        // Tell ScrollTrigger to use these proxy methods for the ".main" element
        ScrollTrigger.scrollerProxy(".main", {
            scrollTop(value) {
                return arguments.length ? 
                    locoScroll.scrollTo(value, 0, 0) : 
                    locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
            pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
        });

        // Refresh ScrollTrigger when everything is set up
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        ScrollTrigger.refresh();

        // Animation for hero section
        gsap.from(".hero h1", {
            scrollTrigger: {
                trigger: ".hero",
                scroller: ".main",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".hero p", {
            scrollTrigger: {
                trigger: ".hero",
                scroller: ".main",
                start: "top 70%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out"
        });

        // Animation for office cards
        gsap.from(".office-card", {
            scrollTrigger: {
                trigger: ".offices-grid",
                scroller: ".main",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1)"
        });

        // Animation for contact info section
        gsap.from(".contact-info h2", {
            scrollTrigger: {
                trigger: ".contact-info",
                scroller: ".main",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        gsap.from(".contact-card", {
            scrollTrigger: {
                trigger: ".contact-methods",
                scroller: ".main",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });

        // Animation for CTA section
        gsap.from(".cta-content", {
            scrollTrigger: {
                trigger: ".cta-section",
                scroller: ".main",
                start: "top 70%",
                toggleActions: "play none none none"
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".cta-image", {
            scrollTrigger: {
                trigger: ".cta-section",
                scroller: ".main",
                start: "top 70%",
                toggleActions: "play none none none"
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Animation for buttons
        gsap.from(".btn-primary, .btn-secondary", {
            scrollTrigger: {
                trigger: ".cta-buttons",
                scroller: ".main",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1)"
        });

        // Footer animation
        gsap.from("#footer", {
            scrollTrigger: {
                trigger: "#footer",
                scroller: ".main",
                start: "top 90%",
                toggleActions: "play none none none",
                markers:true
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Add hover animations for interactive elements
        const interactiveElements = document.querySelectorAll('.office-card, .contact-card, .btn-primary, .btn-secondary');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(element, {
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    });
});