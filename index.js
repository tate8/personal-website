$(function () {
  $(".preload").fadeOut(1000, function() {
    $(".site-container").fadeIn(1000);        
});
})

$(window).scroll(function () {
  let scroll = $(window).scrollTop();
  if (scroll > 0) {
    $("#navbar").addClass("navbar-scrolled");
  } else {
    $("#navbar").removeClass("navbar-scrolled");
  }
});