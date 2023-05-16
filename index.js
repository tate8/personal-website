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
const loader = document.querySelector('.loader')
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

  setTimeout(() => {
    if (image.complete) {
      if (!loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
      }
      carouselImage.style.backgroundImage = `url('${image.src}')`;
      carouselImage.classList.remove('loading');
    } else {
      if (loader.classList.contains('hidden')) {
        loader.classList.remove('hidden')
      }
      image.addEventListener('load', () => {
        if (!loader.classList.contains('hidden')) {
          loader.classList.add('hidden');
        }
        carouselImage.style.backgroundImage = `url('${image.src}')`;
        carouselImage.classList.remove('loading');
      });
    }
  }, 150)
}

// Image enlarging
const enlargableImage = document.querySelector('.enlargable-image')
enlargableImage.addEventListener('click', () => {
  let src = enlargableImage.style.backgroundImage
  const fullScreenImage = document.createElement('div')
  fullScreenImage.style.background = 'rgba(0,0,0,.5) '+src+' no-repeat center'
  fullScreenImage.style.backgroundSize = 'contain'
  fullScreenImage.style.width = '100%'
  fullScreenImage.style.height = '100%'
  fullScreenImage.style.position = 'fixed'
  fullScreenImage.style.zIndex = '9'
  fullScreenImage.style.top = '0'
  fullScreenImage.style.left = '0'
  fullScreenImage.style.cursor = 'zoom-out'
  fullScreenImage.addEventListener('click', (e) => {
    e.target.remove()
  })
  document.body.appendChild(fullScreenImage)
})