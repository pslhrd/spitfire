import { init } from './utils'
import raf from './raf'
import Plane from './Plane'
import fx from './effects'
import spitfireModel from '../assets/models/spitfire-mesh.glb'
import { Color } from 'three'

export default function startCanvas () {
  const { camera, renderer, scene } = init(document.querySelector('#specscanvas'), true)
  renderer.pixelRatio = 2
  scene.background = new Color(0x000000)

  const { composer } = fx({ renderer, scene, camera })

  camera.position.z = 3.5
  camera.position.x = 3.5
  camera.position.y = 3.5

  const plane = new Plane({
    model: spitfireModel,
    propeller: ['Cube006', 'Cube007', 'Cube008', 'BOUT'],
    color: 0xFFFFFF
  })

  plane.object.rotation.x = -0.1

  function start () {
    scene.add(plane.object)
    plane.object.children.forEach(part => { part.children.forEach(part => { part.position.set(0, 2.9, -0.1) }) })

    raf.subscribe((time) => {
      camera.lookAt(0, 0, 0)

      const rpm = 10
      plane.object.getObjectByName('propeller').rotation.z = time * rpm * Math.PI / 30000

      composer.render()
    })
  }

  plane.onReady(() => {
    start()
  })
}
