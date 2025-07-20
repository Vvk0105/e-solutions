document.body.classList.add('loading');
function lazyloading() {
    // Load images when in viewport
    const lazyImages = document.querySelectorAll(".lazyload");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => observer.observe(img));
}

lazyloading();

function page1slider(){
    document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.slide');
            // const background = document.querySelector('.page1-background');
            let currentSlide = 0;
            
            // background.style.backgroundImage = `url(${slides[0].querySelector('img').src})`;

            function showNextSlide() {
                // Hide current slide
                slides[currentSlide].classList.remove('active');
                
                // Move to next slide (loop back to 0 at end)
                currentSlide = (currentSlide + 1) % slides.length;
                
                // Show new slide
                slides[currentSlide].classList.add('active');
                const currentImg = slides[currentSlide].querySelector('img').src;
                background.style.backgroundImage = `url(${currentImg})`;
            }
            
            // Change slide every second
            setInterval(showNextSlide, 2000);
        });
}

page1slider();

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

function init(){
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    locoScroll.on("scroll", (args) => {
        // Detect when we've scrolled to bottom
        const scrollPosition = args.scroll.y;
        const maxScroll = locoScroll.el.scrollHeight - locoScroll.el.clientHeight;
        const footer = document.getElementById('footer');
        
        // Show footer when near bottom (last 20% of scroll)
        if (scrollPosition > maxScroll * 0.8) {
            footer.classList.add('footer-visible');
        } else {
            footer.classList.remove('footer-visible');
        }
        
        ScrollTrigger.update();
    });

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

init();

if (!sessionStorage.getItem('visited')) {
    var tl4 = gsap.timeline();

    tl4.from("#loader h3", {
        x: 40,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.1,
    });
    tl4.to("#loader h3", {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: -0.1,
    });
    tl4.to("#loader", {
        opacity: 0,
    });
    tl4.to("#loader", {
        display: "none",
        onComplete: () => {
            sessionStorage.setItem('visited', true);
        }
    });
} else {

    document.getElementById("loader").style.display = "none";
}


var tl = gsap.timeline({
    scrollTrigger:{
        trigger:'.page1',
        scroller:'.main',
        // markers:true,
        start: "30% 10%",
        end: "bottom 30%",
        scrub:3
    }
})
tl.to('.page1 .slideshow', {
    width:"70%"
},"anim")

var tl2 = gsap.timeline({
    scrollTrigger:{
        trigger:'.page2',
        scroller:'.main',
        // markers:true,
        start:"top 140%",
        end:"top 55%",
        scrub:3
    }
})

// Footer animation
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
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
document.querySelectorAll('.elem').forEach(elem => {
  if (isTouchDevice) {
    elem.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  }
});



document.addEventListener("DOMContentLoaded", () => {
    const aboutUs = document.querySelector(".about-us");
    const clickMe = document.querySelector(".click-me");

    // Split text into spans
    const splitText = (element) => {
        const chars = element.textContent.split("");
        element.innerHTML = "";
        chars.forEach(char => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char;
            element.appendChild(span);
        });
    };

    splitText(aboutUs);
    splitText(clickMe);

    // GSAP scroll animation (for About Us)
    // gsap.from(".about-us span", {
    //     yPercent: 130,
    //     opacity: 0,
    //     stagger: 0.05,
    //     duration: 0.5,
    //     ease: "back.out",
    //     scrollTrigger: {
    //         trigger: ".text-div",
    //         scroller: ".main",
    //         start: "top 80%",
    //         toggleActions: "play none none none",
    //         // markers: true
    //     }
    // });

    // Hover animation (with stagger in and out)
    const textDiv = document.querySelector(".text-div");

    textDiv.addEventListener("mouseenter", () => {
        gsap.to(".about-us span", {
            yPercent: -200,
            opacity: 0,
            stagger: 0.04,
            duration: 0.9,
            ease: "back.in"
        });

        gsap.to(".click-me span", {
            yPercent: -100,
            opacity: 1,
            stagger: 0.04,
            duration: 0.9,
            ease: "back.out"
        });

        gsap.to(".about-us", { top: "-100%", duration: 0.6, ease: "power2.out" });
        gsap.to(".click-me", { top: "20%", duration: 0.6, ease: "power2.out" });
    });

    textDiv.addEventListener("mouseleave", () => {
        gsap.to(".about-us span", {
            yPercent: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.6,
            ease: "ease.out"
        });

        gsap.to(".click-me span", {
            yPercent: 0,
            opacity: 0,
            stagger: 0.04,
            duration: 0.6,
            ease: "back.in"
        });

        gsap.to(".about-us", { top: "0%", duration: 0.6, ease: "ease.in" });
        gsap.to(".click-me", { top: "100%", duration: 0.6, ease: "ease.out" });
    });

    ScrollTrigger.create({
    trigger: ".text-div",
    scroller: ".main",
    start: "top 80%",
    onEnter: () => {
        document.querySelector(".text-div").classList.add("animate-line");
    }
    });

    ScrollTrigger.refresh();
});

gsap.registerPlugin(SplitText);
split = SplitText.create(".offshoring", {
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
            trigger: ".page2-container",
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

//   document.querySelector("button").addEventListener("click", (e) => {
//     split.timeScale(0.2).play(0);
//   });


// gsap.from(split.words, {
//     yPercent: 130,
//     opacity: 0,
//     stagger: {
//         amount: 0.2,
//     },
//     duration: 0.5,
//     ease: "ease.in",
//     scrollTrigger: {
//         trigger: ".page2-container",
//         scroller: ".main",
//         start: "top 65%",
//         end: "bottom 20%",
//         toggleActions: "play none none none",
//         // markers: true,
//         once: true
//     }
// })

split = SplitText.create(".arch-solut", {
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
            trigger: ".page3-container",
            scroller: ".main",
            start: "top 65%",
            // end: "bottom 20%",
            toggleActions: "play none none none",
            // markers: true,
            once: true
        }
      });
      return split;
    }
  });

  split = SplitText.create(".about-content h3", {
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
            trigger: ".about-container",
            scroller: ".main",
            start: "top 95%",
            // end: "bottom 20%",
            toggleActions: "play none none none",
            // markers: true,
            once: true
        }
      });
      return split;
    }
  })

  split = SplitText.create(".about-content p", {
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
            trigger: ".about-container",
            scroller: ".main",
            start: "top 95%",
            // end: "bottom 20%",
            toggleActions: "play none none none",
            // markers: true,
            once: true
        }
      });
      return split;
    }
  })

    const magnet = document.querySelector('.margneto')
    const text = document.querySelector('.about-text')

    const activateManet = (event)=>{
        // get the postion of the magnet on the screen
        let boundbox = magnet.getBoundingClientRect()

        const magnetoStrength = 40
        const textStrength = 80
        const newX = ((event.clientX - boundbox.left)/magnet.offsetWidth - 0.5)
        const newY = ((event.clientY - boundbox.top)/magnet.offsetHeight - 0.5)
        
        gsap.to(magnet, {
            duration: 1,
            x : newX * magnetoStrength,
            y : newY * magnetoStrength,
            ease: Power4.easeOut,
        })

        gsap.to(text, {
            duration: 1,
            x : newX * textStrength,
            y : newY * textStrength,
            ease: Power4.easeOut,
        })
    }

    // move the btn to the new positon 

    const resetManet = (event)=>{
        gsap.to(magnet, {
            duration: 1,
            x : 0,
            y : 0,
            ease: Elastic.easeOut,
        })

        gsap.to(text, {
            duration: 1,
            x : 0,
            y : 0,
            ease: Elastic.easeOut,
        })
    }

    magnet.addEventListener('mousemove',activateManet)
    magnet.addEventListener('mouseleave',resetManet)


    