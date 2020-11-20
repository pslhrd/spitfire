// eslint-disable-next-line no-unused-vars
import { Group, MeshBasicMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const draco = new DRACOLoader()
draco.setDecoderConfig({ type: 'js' })
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

const loader = new GLTFLoader()
loader.setDRACOLoader(draco)

export default class Plane {
  constructor ({ model, propeller, color }) {
    this.propellerParts = propeller
    loader.load(model, gltf => {
      this.object.add(this.createMesh(gltf, propeller, true, color))
      this.object.add(this.createMesh(gltf, propeller, false, color))
      this.ready = true
      this.callbacks.forEach(c => c())
    })

    this.ready = false
    this.callbacks = []
    this.object = new Group()
  }

  createMesh (gltf, propellerParts, isPropeller, color) {
    const object = new Group()
    object.name = isPropeller ? 'propeller' : 'plane'
    const material = new MeshBasicMaterial({ wireframe: true, color })

    gltf.scene.traverse((node) => {
      if (!node.isMesh) return

      node.visible = isPropeller ? propellerParts.includes(node.name) : !propellerParts.includes(node.name)
      node.material = material
      node.material.wireframe = true
    })

    object.add(gltf.scene.clone())
    return object
  }

  onReady (callback) {
    if (this.ready) callback()
    else this.callbacks.push(callback)
  }
}
