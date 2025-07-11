document.addEventListener('DOMContentLoaded', function() {
    // Wait for all assets to load
    window.addEventListener('load', function() {
        // Initialize Locomotive Scroll
        const locoScroll = new LocomotiveScroll({
            el: document.querySelector(".main"),
            smooth: true,
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
    });


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


    split = SplitText.create(".intro-content h2, .intro-content p", {
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
            trigger: ".about-intro",
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

  split = SplitText.create(".section-header h2, .section-header p", {
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
            trigger: ".values-section",
            scroller: ".main",
            start: "top 75%",
            // end: "bottom 20%",
            toggleActions: "play none none none",
            // markers: true,
            once: true
        }
      });
      return split;
    }
  });

  

});