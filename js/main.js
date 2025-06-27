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
            
            background.style.backgroundImage = `url(${slides[0].querySelector('img').src})`;

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

var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")
main.addEventListener("mousemove", function(dets){
    crsr.style.left = dets.x + "px"
    crsr.style.top = dets.y + "px"
})

var tl4 = gsap.timeline()

tl4.from("#loader h3", {
    x: 40,
    opacity: 0,
    duration: 1.4,
    // ease: "power4.out",
    stagger: 0.1,
})
tl4.to("#loader h3", {
    x: -40,
    opacity: 0,
    duration: 1,
    // ease: "power4.out",
    stagger: -0.1,
})
tl4.to("#loader", {
    opacity:0,
})
tl4.to("#loader", {
    display:"none"
})

// gsap.from(".page1 h1,.page1 h2", {
//     x: 10,
//     rotate: 10,
//     opacity: 0,
//     delay: 2.5,
//     duration: 0.7
// })

var tl = gsap.timeline({
    scrollTrigger:{
        trigger:'.page1 slideshow',
        scroller:'.main',
        // markers:true,
        start:"30% 20%",
        end:"bottom 0%",
        scrub:3
    }
})
tl.to('.page1 h1', {
    x:-100, 
},"anim")
tl.to('.page1 h2', {
    x:100, 
},"anim")
tl.to('.page1 .slideshow', {
    width:"60%"
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

tl2.to('.main',{
    // backgroundColor:"#FAF9F6"
    // backgroundColor:"#D7D6D4"
    backgroundColor:"#fff"

})

// var tl3 = gsap.timeline({
//     scrollTrigger:{
//         trigger:'.page4',
//         scroller:'.main',
//         // markers:true,
//         start:"top 70%",
//         end:"top 70%",
//         scrub:3
//     }
// })

// tl3.to('.main',{
//     backgroundColor:"#0F0D0D"
// })


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
    gsap.from(".about-us span", {
        yPercent: 130,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "back.out",
        scrollTrigger: {
            trigger: ".text-div",
            scroller: ".main",
            start: "top 80%",
            toggleActions: "play none none none",
            // markers: true
        }
    });

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
        markers: true,
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
