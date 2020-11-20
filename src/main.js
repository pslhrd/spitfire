import { startCanvas } from './PlanesCanvas/PlanesCanvas'
// import gsap from 'gsap'
// import LocomotiveScroll from 'locomotive-scroll'

// const scroll = new LocomotiveScroll({
//     el: document.querySelector('[data-scroll-container]'),
//     smooth: true
// })

const planes = startCanvas()

let menuOpen = false

document.querySelector('#openMenu').addEventListener('click', () => {
  menuOpen = !menuOpen

  if (menuOpen) {
    planes.showAll()
  } else {
    planes.hideAll()
  }
})
