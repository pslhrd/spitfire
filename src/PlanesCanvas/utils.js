import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import raf from './raf'

export function range (val, inMin, inMax, outMin, outMax) { return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin }
export function lerp (start, end, amt) { return (1 - amt) * start + amt * end }

export function init (canvas, activateControls) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100)
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas, devicePixelRatio: 2 })
  const controls = activateControls && new OrbitControls(camera, renderer.domElement)

  renderer.setSize(window.innerWidth, window.innerHeight)

  if (activateControls) {
    controls.enableDamping = true
    controls.enableZoom = false
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  if (activateControls) {
    raf.subscribe(() => {
      controls.update()
    })
  }

  return {
    scene,
    camera,
    renderer
  }
}
