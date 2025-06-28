document.addEventListener('DOMContentLoaded', function() {
    // Wait for all assets to load
    window.addEventListener('load', function() {
        // Initialize Locomotive Scroll
        const locoScroll = new LocomotiveScroll({
            el: document.querySelector(".main"),
            smooth: true,
            multiplier: 0.8, // Reduce scroll speed for better compatibility
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
        
        // GSAP Animations
        gsap.registerPlugin(ScrollTrigger);

        // Hero text animation
        gsap.from(".solutions-hero h1", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            scrollTrigger: {
                scroller: ".main",
                trigger: ".solutions-hero h1",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        gsap.from(".solutions-hero p", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.6,
            scrollTrigger: {
                scroller: ".main",
                trigger: ".solutions-hero p",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        // Category card animations
        gsap.utils.toArray(".category-card").forEach((card, i) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                scrollTrigger: {
                    scroller: ".main",
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Subcategory section animation
        gsap.from(".subcategory-section", {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                scroller: ".main",
                trigger: ".subcategory-section",
                start: "top 70%",
                toggleActions: "play none none none",
                markers: false // Disable debug markers for production
            }
        });

        // Refresh ScrollTrigger on resize
        window.addEventListener('resize', function() {
            ScrollTrigger.refresh();
            locoScroll.update();
        });
    });
});