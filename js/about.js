// Single DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (keep this as is)
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `<span></span><span></span><span></span>`;
    document.body.appendChild(menuToggle);
    
    const navPart2 = document.getElementById('nav-part2');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navPart2.classList.toggle('active');
        document.body.style.overflow = navPart2.classList.contains('active') ? 'hidden' : '';
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navPart2.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Wait for everything to load before initializing scroll
    window.addEventListener('load', function() {
        // Initialize Locomotive Scroll
        const locoScroll = new LocomotiveScroll({
            el: document.querySelector(".main"),
            smooth: true,
            multiplier: 0.8,
            getDirection: true
        });

        // Set up ScrollTrigger proxy
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

        locoScroll.on("scroll", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        
        // Register plugins
        gsap.registerPlugin(ScrollTrigger, SplitText);

        // Initialize all animations AFTER scroll is ready
        initAnimations();
    });

    function initAnimations() {
        // Magnetic button effect
        const magnet = document.querySelector('.margneto');
        const text = document.querySelector('.about-text');
        
        if (magnet && text) {
            magnet.addEventListener('mousemove', (e) => {
                const boundbox = magnet.getBoundingClientRect();
                const newX = ((e.clientX - boundbox.left)/magnet.offsetWidth - 0.5) * 40;
                const newY = ((e.clientY - boundbox.top)/magnet.offsetHeight - 0.5) * 40;
                
                gsap.to(magnet, { x: newX, y: newY, duration: 1, ease: "power2.out" });
                gsap.to(text, { x: newX * 2, y: newY * 2, duration: 1, ease: "power2.out" });
            });
            
            magnet.addEventListener('mouseleave', () => {
                gsap.to([magnet, text], { x: 0, y: 0, duration: 1, ease: "elastic.out" });
            });
        }

        // Text animations
        const splitTextElements = [
            { selector: ".intro-content h2, .intro-content p", trigger: ".about-intro" },
            { selector: ".section-header h2, .section-header p", trigger: ".values-section" }
        ];
        
        splitTextElements.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            if (elements.length) {
                elements.forEach(el => {
                    const split = new SplitText(el, { type: "lines" });
                    gsap.from(split.lines, {
                        yPercent: 100,
                        opacity: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: item.trigger,
                            scroller: ".main",
                            start: "top 75%",
                            toggleActions: "play none none none"
                        }
                    });
                });
            }
        });

        // Logo animation - MODIFIED FOR ABOUT PAGE
        const navLogo = document.querySelector('#logo img');
        const footer = document.getElementById('footer');
        
        if (navLogo && footer) {
            gsap.to(navLogo, {
                scrollTrigger: {
                    trigger: footer,
                    start: "top 85%", // Adjusted for about page layout
                    end: "top 30%",
                    scrub: 0.5,
                    scroller: ".main",
                    onEnter: () => {
                        gsap.to(navLogo, {
                            opacity: 0,
                            y: -20,
                            scale: 0.8,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to(navLogo, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                }
            });
        }

        const productHeroPara = document.querySelectorAll(".hero-content h1, .hero-content p");
        if (productHeroPara) {
            const splitProductHero = new SplitText(productHeroPara, {
                type: "lines",
                linesClass: "line",
                wordsClass: "word",
                mask: "lines"
            });
            gsap.set(splitProductHero.lines, { visibility: 'visible' });
            gsap.from(splitProductHero.lines, {
                duration: 2,
                delay: 0.3,
                yPercent: 100,
                opacity: 0,
                stagger: 0.1,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: ".product-hero",
                    scroller: ".main",
                    start: "top 65%",
                    end: "bottom 20%",
                    toggleActions: "play none none none",
                    once: true
                }
            });
        }
    }
});