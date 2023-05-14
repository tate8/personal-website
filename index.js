// Fade in animation
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

// Carousel
class CircularArray {
  constructor(data) {
    this.data = data;
    this.currentIndex = 0;
  }

  next() {
    const currentValue = this.data[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.data.length;
    return currentValue;
  }
}

let carouselImageSources = ['./posters/db.png', './posters/settings.png']
const circularArray = new CircularArray(carouselImageSources);
let carouselImage = document.querySelector('.carousel-image')
carouselImage.setAttribute('src', circularArray.next())
let carouselNextButton = document.querySelector('.carousel-next')
carouselNextButton.addEventListener('click', () => {
  carouselImage.setAttribute('src', circularArray.next())
})