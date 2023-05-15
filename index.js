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

const carouselImageSources = ['./posters/siteReport.png', './posters/settings.png', './posters/extensionPopup.png']
const circularArray = new CircularArray(carouselImageSources);
const carouselNextButton = document.querySelector('.carousel-next')
const carouselImage = document.querySelector('.carousel-image')
changeImgSource()

carouselNextButton.addEventListener('click', () => {
  updateCarouselDots()
  changeImgSource()
})

function updateCarouselDots() {
  const carouselDots = document.querySelector('.carousel-dots').children
  for (let dot of carouselDots) {
    dot.classList.remove('active')
  }
  let i = circularArray.currentIndex
  carouselDots[i].classList.add('active')
}

function changeImgSource() {
  carouselImage.classList.add('loading')
  const image = new Image()
  image.src = circularArray.next()

  // setTimeout(() => {
  //   carouselImage.classList.remove('loading');
  //   carouselImage.style.backgroundImage = `url('${image.src}')`;
  // }, 1000)
  image.addEventListener('load', () => {
    carouselImage.classList.remove('loading');
    carouselImage.style.backgroundImage = `url('${image.src}')`;
  });


  // carouselImage.style.backgroundImage = `url(${circularArray.next()})`
}