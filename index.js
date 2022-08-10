$(window).scroll(function () {
  let scroll = $(window).scrollTop();
  if (scroll > 0) {
    $("#navbar").addClass("navbar-scrolled");
  } else {
    $("#navbar").removeClass("navbar-scrolled");
  }
});
