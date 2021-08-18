
const math = {
	lerp: (a, b, n) => {
		return (1 - n) * a + n * b
	},
	norm: (value, min, max) => {
	  	return (value - min) / (max - min)
	}
}

const config = {
  height: window.innerHeight,
  width: window.innerWidth
}

class Smooth {
  constructor() {
    this.bindMethods()

    this.data = {
      ease: 0.1,
      current: 0,
      last: 0,
      rounded: 0
    }

    this.dom = {
      el: document.querySelector('[data-scroll]'),
      content: document.querySelector('[data-scroll-content]')
    }

    this.rAF = null

    this.init()
  }

  bindMethods() {
    ['scroll', 'run', 'resize']
    .forEach((fn) => this[fn] = this[fn].bind(this))
  }

  setStyles() {
    Object.assign(this.dom.el.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      overflow: 'hidden'        
    })   
  }

  setHeight() {
    document.body.style.height = `${this.dom.content.getBoundingClientRect().height}px`
  }

  resize() {
    this.setHeight()
    this.scroll()
  }

  preload() {
    imagesLoaded(this.dom.content, (instance) => {
      this.setHeight()
    })
  }

  scroll() {
    this.data.current = window.scrollY
  }

  run() {
    this.data.last += (this.data.current - this.data.last) * this.data.ease
    this.data.rounded = Math.round(this.data.last * 100) / 100
    
    const diff = this.data.current - this.data.rounded
    const acc = diff / config.width
    const velo =+ acc
    const skew = velo * 7.5
    
    // this.dom.content.style.transform = `translate3d(0, -${this.data.rounded}px, 0) skewY(${skew}deg)`
        this.dom.content.style.transform = `translate3d(0, -${this.data.rounded}px, 0)`

    this.requestAnimationFrame()
  }

  on() { 
    this.setStyles()
    this.setHeight()
    this.addEvents()

    this.requestAnimationFrame()
  }

  off() {
    this.cancelAnimationFrame()

    this.removeEvents()
  }

  requestAnimationFrame() {
    this.rAF = requestAnimationFrame(this.run)
  }

  cancelAnimationFrame() {
    cancelAnimationFrame(this.rAF)
  }

  destroy() {
    document.body.style.height = ''

    this.data = null

    this.removeEvents()
    this.cancelAnimationFrame()
  }

  resize() {
    this.setHeight()
    this.data.rounded = this.data.last = this.data.current
  }

  addEvents() {
    window.addEventListener('resize', this.resize, { passive: true })
    window.addEventListener('scroll', this.scroll, { passive: true })
  }

  removeEvents() {
    window.removeEventListener('resize', this.resize, { passive: true })
    window.removeEventListener('scroll', this.scroll, { passive: true })
  }

  init() {
    this.preload()
    this.on()
  }
}

  new Smooth()


$(document).ready(function () {
  $(".image-container").on("mouseenter", function() {
    $(this).animate({  width: "-=30", height: "-=30" }, 200);
});

$(".image-container").on("mouseleave", function() {
    $(this).animate({ width: "+=30", height: "+=30" }, 200);
});



  $(".container").on("click", function() {
      $(this).toggleClass('fullscreen');
      $(".image-container").toggleClass('fullscreen-img');
      $(this).find(".text").toggleClass("hide");
      $(this).children(".expanded-text").toggleClass("hide");
      $(this).children(".expanded-detail").toggleClass("hide");
      $(this).children(".expanded-detail-image").toggleClass("hide");
  });
});









let atScroll = false;
let parallaxTitle = document.querySelectorAll(".parallax-title");
let slightMovementItem = document.querySelectorAll(".slight-movement");


const scrollProgress = () => {
    atScroll = true;
};

const raf = () => {
    if (atScroll) {
      $(".parallax-title").each(function(idx) {
        let item = parallaxTitle[idx]

        let distFromTop = item.getBoundingClientRect().top;
        item.style.transform = "translateX(" + distFromTop / 8 + "%)";
    });

    $(".slight-movement").each(function(idx) {
      let item = slightMovementItem[idx]

      let distFromTop = item.getBoundingClientRect().top;
      item.style.transform = "translateY(" + distFromTop / 15 + "%)";
  });

    }
    requestAnimationFrame(raf);
};

requestAnimationFrame(raf);
window.addEventListener("scroll", scrollProgress);

// $(window).scroll(function() {
//   let viewportTop = $(window).scrollTop();
//   let viewportBottom = viewportTop + $(window).height();


//   let scrollY = window.scrollY;
//   aboutSection.style.bottom = scrollY * 0.06 + "px";



    // $(".text-box").each(function(idx) {
    //     let $this = $(this);
    //     let elementTop = $this.offset().top;
    //     let elementBottom = elementTop + $this.outerHeight();
    //     let item = document.getElementsByClassName("text-box")[idx]
    //     if (elementBottom > viewportTop && elementTop < viewportBottom)
    //     {
    //         let distFromTop = item.getBoundingClientRect().top;
    //         item.style.right = (distFromTop * 0.08) + "px";
    //     }
    // });

//     $(".project-number").each(function(idx) {
//       let $this = $(this);
//       let elementTop = $this.offset().top;
//       let elementBottom = elementTop + $this.outerHeight();
//       let item = document.getElementsByClassName("project-number")[idx]
//       if (elementBottom > viewportTop && elementTop < viewportBottom)
//       {
//           let distFromTop = item.getBoundingClientRect().top;
//           item.style.top = (distFromTop * 0.08) + "px";
//       }
//     });

//     $(".movement-small").each(function(idx) {
//       let $this = $(this);
//       let elementTop = $this.offset().top;
//       let elementBottom = elementTop + $this.outerHeight();
//       let item = document.getElementsByClassName("movement-small")[idx]
//       if (elementBottom > viewportTop && elementTop < viewportBottom)
//       {
//           let distFromTop = item.getBoundingClientRect().top;
//           item.style.top = (distFromTop * 0.04) + "px";
//       }
//     });


// });

