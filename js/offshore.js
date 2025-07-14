document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (consistent with other pages)
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    document.body.appendChild(menuToggle);
    
    const navPart2 = document.getElementById('nav-part2');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navPart2.classList.toggle('active');
        
        if (navPart2.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
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

    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true,
        multiplier: 0.8,
        getDirection: true
    });
    
    locoScroll.on("scroll", ScrollTrigger.update);
    
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

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Hero section animations
    const heroContent = document.querySelector('.offshore-hero .hero-content');
    if (heroContent) {
        const heroElements = heroContent.children;
        gsap.from(heroElements, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".offshore-hero",
                scroller: ".main",
                start: "top bottom",
                toggleActions: "play none none none",
                // markers: true
            }
        });
    }

    // Split text animations for headings
    document.querySelectorAll('.section-title').forEach(title => {
        SplitText.create(title, {
            type: "words,lines",
            linesClass: "line",
            onSplit: (self) => {
                gsap.from(self.lines, {
                    duration: 1.5,
                    yPercent: 100,
                    opacity: 0,
                    stagger: 0.1,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: title,
                        scroller: ".main",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            }
        });
    });

    // Point cards animation
    gsap.utils.toArray(".point-card").forEach((card, i) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                scroller: ".main",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Service cards animation
    gsap.utils.toArray(".service-card").forEach((card, i) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                scroller: ".main",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Benefit cards animation
    gsap.utils.toArray(".benefit-card").forEach((card, i) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                scroller: ".main",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Location content animation
    gsap.from(".location-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".location-section",
            scroller: ".main",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });

    // Final CTA animation
    gsap.from(".final-cta .container > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".final-cta",
            scroller: ".main",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Magnetic button effect (consistent with about page)
    const magnet = document.querySelector('.margneto');
    if (magnet) {
        const text = magnet.querySelector('.text');
        
        const activateMagnet = (event) => {
            let boundbox = magnet.getBoundingClientRect();
            const magnetoStrength = 40;
            const textStrength = 80;
            const newX = ((event.clientX - boundbox.left)/magnet.offsetWidth - 0.5);
            const newY = ((event.clientY - boundbox.top)/magnet.offsetHeight - 0.5);
            
            gsap.to(magnet, {
                duration: 1,
                x: newX * magnetoStrength,
                y: newY * magnetoStrength,
                ease: "power4.out"
            });

            gsap.to(text, {
                duration: 1,
                x: newX * textStrength,
                y: newY * textStrength,
                ease: "power4.out"
            });
        };

        const resetMagnet = () => {
            gsap.to(magnet, {
                duration: 1,
                x: 0,
                y: 0,
                ease: "elastic.out"
            });

            gsap.to(text, {
                duration: 1,
                x: 0,
                y: 0,
                ease: "elastic.out"
            });
        };

        magnet.addEventListener('mousemove', activateMagnet);
        magnet.addEventListener('mouseleave', resetMagnet);
    }

    // Refresh on resize
    window.addEventListener('resize', function() {
        ScrollTrigger.refresh();
        locoScroll.update();
    });
});