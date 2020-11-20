import gsap from 'gsap'
import LocomotiveScroll from 'locomotive-scroll'
import imagesLoaded from 'imagesloaded'
import startCanvas1 from './PlanesCanvas/PlanesCanvas'
import startCanvas2 from './PlanesCanvas/SpecsPlane'

const body = document.body
const main = document.querySelector('main')
const html = document.documentElement
const preloader = document.querySelector('.preloader')
const imgLoad = imagesLoaded(body)

var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)

function smooth (container) {
  scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: false,
    offset: ['20%', 0]
  })
}

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
  }
}

function homeLaunch () {
  smooth(body)
  imgLoad.on('progress', function (instance, image) {
    var result = image.isLoaded ? 'loaded' : 'broken'
    preloader.style.display = 'block'
    body.style.cursor = 'wait'
    // console.log( 'image is ' + result + ' for ' + image.img.src );
  })

  const planes = startCanvas1()
  startCanvas2()

  let menuOpen = false

  document.querySelector('#openMenu').addEventListener('click', () => {
    menuOpen = !menuOpen

    if (menuOpen) {
      planes.showAll()
    } else {
      planes.hideAll()
    }
  })

  imgLoad.on('done', function (instance) {
    preloader.style.display = 'none'
    body.style.cursor = 'default'
    console.log(imgLoad.images.length + ' images loaded')

    if (isMobile.any() === null) {
      console.log('Not Mobile')
    } else {
      console.log(isMobile.any())
    }
  })
}

homeLaunch()

function homeScroll () {
  gsap.set('.overflow span', { y: '100%' })
  gsap.set('[data-scroll-call="opacity"]', { opacity: 0, y: 50 })
  gsap.set('[data-scroll-call="image"]', { autoAlpha: 0 })

  scroll.on('call', function (event, element, i) {
    if (event === 'appear') {
      const text = i.el.querySelectorAll('span')
      console.log(text)
      gsap.to(text, { y: '0%', opacity: 1, duration: 1.3, stagger: 0.1, ease: 'power3.out' })
    }

    if (event === 'opacity') {
      gsap.to(i.el, { opacity: 1, duration: 1.3, y: 0, ease: 'power4.out' })
    }
    // if (event === 'video') {
    //   i.el.play()
    //   gsap.to(i.el, {scale:1, opacity:1, duration:1.5, ease:'power3.out'})
    // }

    // if (event === 'text') {
    //   const text = i.el.querySelectorAll('.lines')
    //   gsap.to(text, {y:'0%', opacity:1, duration:1.5, stagger:0.1, ease:'power3.out'})
    // }
  })
}

homeScroll()
