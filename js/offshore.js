document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (consistent across all pages)
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
    ScrollTrigger.refresh();
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Initialize all animations
    initAnimations();

    function initAnimations() {
        // Navbar logo animation (works on both index and about pages)
        const navLogo = document.querySelector('#logo img');
        const footer = document.getElementById('footer');
        
        if (navLogo && footer) {
            gsap.to(navLogo, {
                scrollTrigger: {
                    trigger: footer,
                    start: () => {
                        // Adjust trigger point based on page
                        return document.body.classList.contains('about-page') 
                            ? "top 85%" 
                            : "top 70%";
                    },
                    end: "top 20%",
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

        // Hero section animations
        const heroContent = document.querySelector('.hero-content, .offshore-hero .hero-content');
        if (heroContent) {
            const heroElements = heroContent.children;
            gsap.from(heroElements, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: heroContent.parentElement,
                    scroller: ".main",
                    start: "top bottom",
                    toggleActions: "play none none none"
                }
            });
        }

        // Split text animations for headings
        document.querySelectorAll('.section-title, .section-header h2, .section-header p').forEach(title => {
            const split = new SplitText(title, {
                type: "lines",
                linesClass: "line"
            });
            
            gsap.from(split.lines, {
                yPercent: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: title,
                    scroller: ".main",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Card animations (point, service, benefit)
        ['point-card', 'service-card', 'benefit-card', 'value-card'].forEach(cardClass => {
            gsap.utils.toArray(`.${cardClass}`).forEach((card, i) => {
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
        });

        // Location content animation
        const locationContent = document.querySelector('.location-content');
        if (locationContent) {
            gsap.from(locationContent, {
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
        }

        // Final CTA animation
        const finalCta = document.querySelector('.final-cta, .about-cta');
        if (finalCta) {
            gsap.from(finalCta.children, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: finalCta,
                    scroller: ".main",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Magnetic button effect (works for both about page and others)
        const magnet = document.querySelector('.margneto');
        if (magnet) {
            const text = magnet.querySelector('.about-text, .text');
            
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

                if (text) {
                    gsap.to(text, {
                        duration: 1,
                        x: newX * textStrength,
                        y: newY * textStrength,
                        ease: "power4.out"
                    });
                }
            };

            const resetMagnet = () => {
                gsap.to(magnet, {
                    duration: 1,
                    x: 0,
                    y: 0,
                    ease: "elastic.out"
                });

                if (text) {
                    gsap.to(text, {
                        duration: 1,
                        x: 0,
                        y: 0,
                        ease: "elastic.out"
                    });
                }
            };

            magnet.addEventListener('mousemove', activateMagnet);
            magnet.addEventListener('mouseleave', resetMagnet);
        }

        // About page specific animations
        if (document.body.classList.contains('about-page')) {
            // Intro content animation
            const introContent = document.querySelector('.intro-content');
            if (introContent) {
                const split = new SplitText(introContent.querySelectorAll('h2, p'), {
                    type: "lines",
                    linesClass: "line"
                });
                
                gsap.from(split.lines, {
                    yPercent: 100,
                    opacity: 0,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: ".about-intro",
                        scroller: ".main",
                        start: "top 65%",
                        toggleActions: "play none none none"
                    }
                });
            }
        }
    }

    // Refresh on resize
    window.addEventListener('resize', function() {
        ScrollTrigger.refresh();
        locoScroll.update();
    });
});