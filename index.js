
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
      ease: .15,
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

  // new Smooth()





$(document).ready(function() {
    
  /* Every time the window is scrolled ... */
  $(window).scroll( function(){
  
      /* Check the location of each desired element */
      $('.fade').each( function(i){
          
          var bottom_of_object = $(this).position().top + $(this).outerHeight();
          var bottom_of_window = $(window).scrollTop() + $(window).height();
          
          /* If the object is completely visible in the window, fade it it */
          if( bottom_of_window > bottom_of_object - 800 ){
              
              $(this).animate({'opacity':'1'}, 100);
                  
          }
          
      }); 

  });

  // on project image click
  $(".container").on("click", function() {
    // $('.fullscreen').toggleClass('fullscreen') // only one expanded project at once


    $(this).toggleClass('fullscreen');
    $(".image-container").toggleClass('fullscreen-img');
    $(this).find(".text").toggleClass("hide");
    $(this).children(".expanded-text").toggleClass("hide");
    $(this).children(".expanded-detail").toggleClass("hide");
    $(this).children(".expanded-detail-image").toggleClass("hide");
    $(this).children(".project-github-button").toggleClass("hide");
  });

  $(".submit-contact-form").on("click", () => {
    console.log("here")
    $("#submit-form").reset();
  })



let atScroll = false;
let parallaxTitle = document.querySelectorAll(".parallax-title");


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
  }
  requestAnimationFrame(raf);
};

requestAnimationFrame(raf);
window.addEventListener("scroll", scrollProgress);


  
});