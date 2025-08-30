  document.addEventListener('DOMContentLoaded', function() {
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
        
        // Toggle body overflow when menu is open
        if (navPart2.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navPart2.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Wait for all assets to load
    window.addEventListener('load', function() {
        // Initialize Locomotive Scroll
        const isMobile = window.innerWidth <= 1024;
        let locoScroll = null;
        if (!isMobile) {
        locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true,
        smartphone: {
            smooth: false
        },
        tablet: {
            smooth: false
        }
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

        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        } else {
        ScrollTrigger.scrollerProxy(".main", {
            scrollTop(value) {
                if (arguments.length) {
                    document.querySelector(".main").scrollTop = value;
                }
                return document.querySelector(".main").scrollTop;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            }
        });
        
        document.querySelector(".main").style.overflow = "auto";
        document.querySelector(".main").style.height = "100vh";
    }
        
        gsap.registerPlugin(ScrollTrigger);
        gsap.registerPlugin(SplitText);
        const heroHeading = document.querySelector(".solutions-hero h1");
        if (heroHeading) {
            const splitHeading = new SplitText(heroHeading, {
                type: "lines",
                linesClass: "line",
                wordsClass: "word",
                mask: "lines"
            });
            gsap.set(splitHeading.lines, { visibility: 'visible' });
            gsap.from(splitHeading.lines, {
                duration: 2,
                yPercent: 100,
                opacity: 0,
                stagger: 0.1,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: ".solutions-hero",
                    scroller: ".main",
                    start: "top 65%",
                    end: "bottom 20%",
                    toggleActions: "play none none none",
                    once: true
                }
            });
        }

        const heroParagraph = document.querySelector(".solutions-hero p");
        if (heroParagraph) {
            const splitParagraph = new SplitText(heroParagraph, {
                type: "lines",
                linesClass: "line"
            });
            gsap.set(splitParagraph.lines, { visibility: 'visible' });
            gsap.from(splitParagraph.lines, {
                duration: 2,
                delay: 0.5,
                yPercent: 100,
                opacity: 0,
                stagger: 0.1,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: ".solutions-hero",
                    scroller: ".main",
                    start: "top 65%",
                    end: "bottom 20%",
                    toggleActions: "play none none none",
                    once: true
                }
            });
        }

        const navLogo = document.querySelector('#logo img');
        const footer = document.getElementById('footer');

        if (navLogo && footer) {
            gsap.to(navLogo, {
                scrollTrigger: {
                    trigger: footer,
                    start: "top 85%",
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
                    toggleActions: "play none none none",
                    // markers:true
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
                // markers: true
            }
        });

        // Refresh ScrollTrigger on resize
        window.addEventListener('resize', function() {
            ScrollTrigger.refresh();
            locoScroll.update();
        });
        gsap.from("#footer", {
            scrollTrigger: {
                trigger: "#footer",
                scroller: ".main",
                start: "top 80%",
                toggleActions: "play none none none",
                // markers:true
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
});


    // Category hero content animation - FIXED
    const categoryHeroContent = document.querySelector(".category-hero-content p");
    if (categoryHeroContent) {
        const splitCategoryHero = new SplitText(categoryHeroContent, {
            type: "lines",
            linesClass: "line",
            wordsClass: "word",
            mask: "lines"
        });
        gsap.set(splitCategoryHero.lines, { visibility: 'visible' });
        gsap.from(splitCategoryHero.lines, {
            duration: 2,
            yPercent: 100,
            opacity: 0,
            stagger: 0.2,
            ease: "expo.out"
        });
    }

    // Category intro animation - FIXED
    const categoryIntro = document.querySelector(".category-intro p");
    if (categoryIntro) {
        const splitCategoryIntro = new SplitText(categoryIntro, {
            type: "lines",
            linesClass: "line"
        });
        gsap.set(splitCategoryIntro.lines, { visibility: 'visible' });
        gsap.from(splitCategoryIntro.lines, {
            duration: 2,
            yPercent: 100,
            opacity: 0,
            stagger: 0.2,
            ease: "expo.out",
            scrollTrigger: {
                trigger: ".category-intro",
                scroller: ".main",
                start: "top 75%",
                end: "bottom 20%",
                toggleActions: "play none none none",
                once: true
            }
        });
    }

var swiper = new Swiper('.swiper', {
    spaceBetween: 10,
    loop: true,
    speed: 8500,
    slidesPerView: 'auto',
    freeMode: true,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
    },
    allowTouchMove: true,
    touchReleaseOnEdges: true,
});

document.addEventListener('DOMContentLoaded', function() {

    window.addEventListener('load', function() {
        gsap.from(".product-hero h1", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power2.out"
        });

        const productHeroHeading = document.querySelector(".product-hero h1");
        if (productHeroHeading) {
            const splitProductHeroHeading = new SplitText(productHeroHeading, {
                type: "lines",
                linesClass: "line",
                wordsClass: "word",
                mask: "lines"
            });
            gsap.set(splitProductHeroHeading.lines, { visibility: 'visible' });
            gsap.from(splitProductHeroHeading.lines, {
                duration: 2,
                delay: 0.1,
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

        const productHeroPara = document.querySelector(".product-hero p");
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

        });
              
    // Refresh ScrollTrigger on resize
    window.addEventListener('resize', function() {
        ScrollTrigger.refresh();
        locoScroll.update();
    });
});