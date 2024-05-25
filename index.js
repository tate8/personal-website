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

function setupCarousel(carouselClassName, imageSources) {
  const carouselContainers = document.querySelectorAll('.' + carouselClassName);
  carouselContainers.forEach(carouselContainer => {
    const circularArray = new CircularArray(imageSources);
    const carouselNextButton = carouselContainer.querySelector('.carousel-next');
    const carouselImage = carouselContainer.querySelector('.carousel-image');
    const loader = carouselContainer.querySelector('.loader');

    carouselNextButton.addEventListener('click', () => {
      updateCarouselDots();
      changeImgSource();
    });

    function updateCarouselDots() {
      const carouselDots = carouselContainer.querySelector('.carousel-dots').children;
      for (let dot of carouselDots) {
        dot.classList.remove('active');
      }
      let i = circularArray.currentIndex;
      carouselDots[i].classList.add('active');
    }

    function changeImgSource() {
      carouselImage.classList.add('loading');
      const image = new Image();
      image.src = circularArray.next();

      setTimeout(() => {
        if (image.complete) {
          if (!loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
          }
          carouselImage.setAttribute('src', image.src)
          carouselImage.classList.remove('loading');
        } else {
          if (loader.classList.contains('hidden')) {
            loader.classList.remove('hidden');
          }
          image.addEventListener('load', () => {
            if (!loader.classList.contains('hidden')) {
              loader.classList.add('hidden');
            }
            carouselImage.style.backgroundImage = `url('${image.src}')`;
            carouselImage.classList.remove('loading');
          });
        }
      }, 150);
    }

    // Trigger loading of first source
    changeImgSource();
  });
}

const freshCarouselImageSources = ['./posters/siteReport.png', './posters/settings.png', './posters/extensionPopup.png']
const freshCarouselClassname = 'fresh-carousel'
setupCarousel(freshCarouselClassname, freshCarouselImageSources)

const circuitCarouselImageSources = ['./posters/circuitLevel5.png', './posters/circuitHomeScreen.png', './posters/circuitSandbox.png']
const circuitCarouselClassname = 'circuit-carousel'
setupCarousel(circuitCarouselClassname, circuitCarouselImageSources)