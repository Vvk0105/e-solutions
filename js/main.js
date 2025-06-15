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
    locoScroll.on("scroll", ScrollTrigger.update);

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


var tl = gsap.timeline({
    scrollTrigger:{
        trigger:'.page1 h1',
        scroller:'.main',
        // markers:true,
        start:"top 30%",
        end:"top 0",
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
    width:"90%"
},"anim")

var tl2 = gsap.timeline({
    scrollTrigger:{
        trigger:'.page1 h1',
        scroller:'.main',
        // markers:true,
        start:"top -85%",
        end:"top -85%",
        scrub:3
    }
})

tl2.to('.main',{
    backgroundColor:"#fff"
})

var tl3 = gsap.timeline({
    scrollTrigger:{
        trigger:'.page1 h1',
        scroller:'.main',
        // markers:true,
        start:"top -255%",
        end:"top -255%",
        scrub:3
    }
})

tl3.to('.main',{
    backgroundColor:"#0F0D0D"
})