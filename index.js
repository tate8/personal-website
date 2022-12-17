const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view')
    } else {
      entry.target.classList.remove('in-view')
    }
  })
})

const hiddenElements = document.querySelectorAll('.animation-element');
hiddenElements.forEach((el) => observer.observe(el))

$(window).scroll(function () {
  let scroll = $(window).scrollTop();
  if (scroll > 0) {
    document.querySelector('#navbar').classList.add('navbar-scrolled')
  } else {
    document.querySelector('#navbar').classList.remove('navbar-scrolled')
  }
});