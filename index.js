
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
    $(this).toggleClass('fullscreen');
    $(".image-container").toggleClass('fullscreen-img');
    $(this).children(".image-container").toggleClass('top-30'); // move project img down on fullscreen
    $(this).find(".text").toggleClass("hide");
    $(this).children(".expanded-text").toggleClass("hide");
    $(this).children(".expanded-detail").toggleClass("hide");
    $(this).children(".expanded-detail-image").toggleClass("hide");
    $(this).children(".project-github-button").toggleClass("hide");
  });


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