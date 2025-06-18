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
            let currentSlide = 0;
            
            function showNextSlide() {
                // Hide current slide
                slides[currentSlide].classList.remove('active');
                
                // Move to next slide (loop back to 0 at end)
                currentSlide = (currentSlide + 1) % slides.length;
                
                // Show new slide
                slides[currentSlide].classList.add('active');
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

var tl3 = gsap.timeline({
    scrollTrigger:{
        trigger:'.page4',
        scroller:'.main',
        markers:true,
        start:"top 80%",
        end:"top 15%",
        scrub:3
    }
})

tl3.to('.main',{
    backgroundColor:"#0F0D0D"
})

