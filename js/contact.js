document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('load', function() {
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
                // markers:true
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
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

        // Animation for enquiry form
        gsap.from(".enquiry-form-section", {
            scrollTrigger: {
                trigger: ".enquiry-form-section",
                scroller: ".main",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        document.getElementById('enquiryForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                country: document.getElementById('country').value,
                service: document.getElementById('service').value,
                description: document.getElementById('description').value
            };
            
    
            console.log('Form submitted:', formData);
            
            alert('Thank you for your enquiry! We will contact you soon.');
            
            this.reset();
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