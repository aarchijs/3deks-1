import './style.scss'
import './app.js'
import * as THREE from 'three'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { GUI, GUIController } from 'dat.gui'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xbfa4a4)
const width = 610
const height = 548
const aspectRatio = width / height
const viewSize = 548

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)
camera.position.z = 17

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.zIndex = '8'
// $('#desk-progress .container div.d-flex div.canvas').append(renderer.domElement);
$('#desk-intro div.canvas').append(renderer.domElement)

let labelRenderer = new CSS2DRenderer() // Новый CSS2DRenderer
labelRenderer.setSize(width, height)
labelRenderer.domElement.style.position = 'absolute'
labelRenderer.domElement.style.zIndex = '10'
// labelRenderer.domElement.style.top = '0'

// $('#desk-progress .container div.d-flex div.canvas').append(labelRenderer.domElement);
$('#desk-intro div.container').append(labelRenderer.domElement)

const deskGeometry = new THREE.BoxBufferGeometry(24, 24, 1)
const deskMaterial = new THREE.MeshBasicMaterial({
    color: 0xddd5d2,
})
const desk = new THREE.Mesh(deskGeometry, deskMaterial)

const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1)

const cube = new THREE.Mesh(cubeGeometry)
cube.castShadow = true
cube.receiveShadow = true
cube.position.set(0, 0, 1)

const cubeDouble = cube.clone()
const secondCube = new THREE.Mesh(cubeGeometry)
secondCube.position.set(0, 0, 1.15)
cubeDouble.add(secondCube)

const cubeTriple = cubeDouble.clone()
const thirdCube = new THREE.Mesh(cubeGeometry)
thirdCube.position.set(0, 0, 2.3)
cubeTriple.add(thirdCube)
cubeTriple.position.y = 10


const coneGeometry = new THREE.ConeGeometry(0.5, 0.5, 16)
const cone = new THREE.Mesh(coneGeometry)
cone.position.set(0, 10, 1)
cone.rotation.set(Math.PI / 2, 0, 0)

const sphereGeometry = new THREE.SphereGeometry(0.35, 32, 16)
const sphere = new THREE.Mesh(sphereGeometry)
sphere.position.set(0, 0.63, 0)
const pawn = cone.add(sphere)

let annotationDiv = document.createElement('div')
annotationDiv.className = 'annotationLabel'
annotationDiv.textContent = 'Es'
annotationDiv.style.marginTop = '-1em'
let annotationLabel = new CSS2DObject(annotationDiv)
annotationLabel.position.set(0, 0, 2)
pawn.add(annotationLabel)

const gui = new GUI()

const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.rotation, 'y', 0, Math.PI * 2)
cameraFolder.open()

const pawnFolder = gui.addFolder('Es')
pawnFolder.add(pawn.position, 'x', -10, 10)
pawnFolder.add(pawn.position, 'y', -10, 10)
 
gui.close()

scene.add(new THREE.AxesHelper(500))
scene.add(desk)
scene.add(pawn)

// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

// window.addEventListener('click', onWindowResize, false)
var mesh, mesh1, mesh2
var objects: any[] = []
var dragControls = new DragControls(objects, camera, renderer.domElement)
dragControls.transformGroup = true

var topView = 1
$('.view-switch').on('click', function () {
    if (topView) {
        topView = 0
        dragControls.enabled = false
        // $('.close-button.close-bottom').css('display', 'block')
        camera.position.z = 2
        camera.rotation.set(Math.PI / 2, 0, 0)
        render()
    } else {
        topView = 1
        dragControls.enabled = true
        // $('.close-button.close-bottom').css('display', 'none')
        camera.position.z = 17
        camera.rotation.set(0, 0, 0)
        render()
    }
})

$('.top-view').on('click', function () {
    if (!topView) {
        topView = 1
        dragControls.enabled = true
        // $('.close-button.close-bottom').css('display', 'none')
        camera.position.z = 17
        camera.rotation.set(0, 0, 0)
        render()
    }
})

$('.person-view').on('click', function () {
    if (topView) {
        topView = 0
        dragControls.enabled = false
        // $('.close-button.close-bottom').css('display', 'block')
        camera.position.z = 2
        camera.rotation.set(Math.PI / 2, 0, 0)
        render()
    }
})
// Skumjas, Bailes, Dusmas, Prieks, Kauns, Vaina, Riebums, Interese
function addEmotion(name)
{
    let emotion = cubeTriple.clone()
    let annotationDiv = document.createElement('div')
    annotationDiv.className = 'annotationLabel'
    annotationDiv.textContent = name
    annotationDiv.style.marginTop = '-1em'
    let annotationLabel = new CSS2DObject(annotationDiv)
    annotationLabel.position.set(0, 0, 3)

    emotion.add(annotationLabel)
    scene.add(emotion)

    const emotionFolder = gui.addFolder(name)
    emotionFolder.add(emotion.position, 'x', -10, 10)
    emotionFolder.add(emotion.position, 'y', -10, 10)
}
$('.add-emotion').on('click', function () {
    let name = $('.emotion-name').text();
    console.log(name);
    addEmotion(name);
})

$('.add-sadness').on('click', function () {
    // mesh1 = cubeTriple.clone()
    // let annotationDiv = document.createElement('div')
    // annotationDiv.className = 'annotationLabel'
    // annotationDiv.textContent = 'Skumjas'
    // annotationDiv.style.marginTop = '-1em'
    // let annotationLabel = new CSS2DObject(annotationDiv)
    // annotationLabel.position.set(0, 0, 3)

    // mesh1.add(annotationLabel)
    // scene.add(mesh1)

    // const meshFolder1 = gui.addFolder('Skumjas')
    // meshFolder1.add(mesh1.position, 'x', -10, 10)
    // meshFolder1.add(mesh1.position, 'y', -10, 10)
})

$('.add-happiness').on('click', function () {
    mesh = cubeTriple.clone()

    let annotationDiv = document.createElement('div')
    annotationDiv.className = 'annotationLabel'
    annotationDiv.textContent = 'Prieks'
    annotationDiv.style.marginTop = '-1em'
    let annotationLabel = new CSS2DObject(annotationDiv)
    annotationLabel.position.set(0, 0, 3)

    mesh.add(annotationLabel)
    scene.add(mesh)

    const meshFolder = gui.addFolder('Prieks')
    meshFolder.add(mesh.position, 'x', -10, 10)
    meshFolder.add(mesh.position, 'y', -10, 10)
})

function init() {}

function animate() {
    requestAnimationFrame(animate)
    render()
}

function render() {
    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)
}

init()
animate()
