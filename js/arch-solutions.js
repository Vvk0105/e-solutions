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
        const locoScroll = new LocomotiveScroll({
            el: document.querySelector(".main"),
            smooth: window.innerWidth > 768,
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
        gsap.registerPlugin(SplitText);
        // Hero text animation
        split = SplitText.create(".solutions-hero h1", {
            type: "words,lines",
            linesClass: "line",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
            split = gsap.from(self.lines, {
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
                    // markers: true,
                    once: true
                }
            });
            return split;
            }
        });

        split = SplitText.create(".solutions-hero p", {
            type: "words,lines",
            linesClass: "line",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
            split = gsap.from(self.lines, {
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
                    // markers: true,
                    once: true
                }
            });
            return split;
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


    split = SplitText.create(".category-hero-content p", {
        type: "words,lines",
        linesClass: "line",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
        split = gsap.from(self.lines, {
            duration: 2,
            yPercent: 100,
            opacity: 0,
            stagger: 0.2,
            ease: "expo.out",
            // scrollTrigger: {
            //     trigger: ".category-hero",
            //     scroller: ".main",
            //     start: "top 65%",
            //     end: "bottom 20%",
            //     toggleActions: "play none none none",
            //     markers: true,
            //     once: true
            // }
        });
        return split;
        }
    });

    split = SplitText.create(".category-intro p", {
        type: "words,lines",
        linesClass: "line",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
        split = gsap.from(self.lines, {
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
                // markers: true,
                once: true
            }
        });
        return split;
        }
    });

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

        split = SplitText.create(".product-hero p", {
                    type: "words,lines",
                    linesClass: "line",
                    autoSplit: true,
                    mask: "lines",
                    onSplit: (self) => {
                    split = gsap.from(self.lines, {
                        duration: 2,
                        delay: 0.3,
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
                            // markers: true,
                            once: true
                        }
                    });
                    return split;
                    }
                });

              });


              
    // Refresh ScrollTrigger on resize
    window.addEventListener('resize', function() {
        ScrollTrigger.refresh();
        locoScroll.update();
    });
});