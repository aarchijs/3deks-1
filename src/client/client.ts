import './style.scss'
import './app.js'
import * as THREE from 'three'
import { GUI, GUIController } from 'dat.gui'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Fireworks } from 'fireworks-js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xbfa4a4)
const width = 610
const height = 548
const aspectRatio = width / height
const viewSize = 548

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)
camera.position.z = 17

var light = new THREE.AmbientLight(0xffffff)
scene.add(light)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.domElement.style.zIndex = '8'
$('#desk-progress .container div.d-flex div.desk-canvas').append(renderer.domElement)

let labelRenderer = new CSS2DRenderer()
labelRenderer.setSize(width, height)
labelRenderer.domElement.style.position = 'absolute'
labelRenderer.domElement.style.zIndex = '10'
labelRenderer.domElement.style.top = '0'

$('#desk-progress .container div.d-flex div.desk-canvas').append(labelRenderer.domElement)

const deskGeometry = new THREE.BoxBufferGeometry(24, 24, 1)
const deskMaterial = new THREE.MeshBasicMaterial({
    color: 0xddd5d2,
})
const desk = new THREE.Mesh(deskGeometry, deskMaterial)
const deskBorderValue = 11.5
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

const loader = new GLTFLoader()
loader.load('assets/pawn2.glb', handle_load)
var pawn = new THREE.Object3D()
scene.add(pawn)

function handle_load(gltf) {
    var object = gltf.scene.children[0]
    object.rotation.set(Math.PI / 2 , 0, 0)
    object.position.set(0, 0, 2)
    pawn.add(object)
}

$('#desk-intro-self a.continue').on('click', function (e) {
    e.preventDefault()
    let selfSize = $('#selfForm input[name=self]:checked').val()

    switch (selfSize) {
        case '1':
            pawn.scale.set(0.23, 0.23, 0.23)
            break
        case '2':
            pawn.scale.set(0.46, 0.46, 0.46)
            break
        case '3':
            pawn.scale.set(0.73, 0.73, 0.73)
            break
        default:
            break
    }
})

let annotationDiv = document.createElement('div')
annotationDiv.className = 'annotationLabel'
annotationDiv.textContent = 'ES'
annotationDiv.style.marginTop = '-1em'
let annotationLabel = new CSS2DObject(annotationDiv)
annotationLabel.position.set(0, 0, 0)
pawn.add(annotationLabel)

const gui = new GUI()

const cameraFolder = gui.addFolder('SKATS')
cameraFolder.add(camera.rotation, 'y', 0, Math.PI * 2)
cameraFolder.add(camera.position, 'z', 0, 20)
cameraFolder.open()

const pawnFolder = gui.addFolder('ES')
pawnFolder.add(pawn.position, 'x', -deskBorderValue, deskBorderValue)
pawnFolder.add(pawn.position, 'y', -deskBorderValue, deskBorderValue)

const emotionsFolder = gui.addFolder('EMOCIJAS')
// gui.close()

scene.add(new THREE.AxesHelper(500))
scene.add(desk)

// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

var sideView = 0
$('.side-view').on('click', function () {
    camera.position.z = 2
    camera.rotation.set(Math.PI / 2, 0, 0)

    if (topView) {
        topView = 0
    }
    if (!pawn.visible) {
        pawn.visible = true
    }

    sideView++

    switch (sideView) {
        case 1:
            camera.position.set(0, -16, 2)
            break
        case 2:
            camera.position.set(-16, 0, 2)
            camera.rotation.set(Math.PI / 2, -Math.PI / 2, 0)
            break
        case 3:
            camera.position.set(0, 16, 2)
            camera.rotation.set(Math.PI / 2, -Math.PI, 0)
            break
        case 4:
            camera.position.set(16, 0, 2)
            camera.rotation.set(Math.PI / 2, Math.PI / 2, 0)
            break
        default:
            sideView = 1
            camera.position.set(0, -16, 2)
            camera.rotation.set(Math.PI / 2, 0, 0)
            break
    }

    // $('.close-button.close-bottom').css('display', 'none')
    camera.position.x
    render()
})

var topView = 1

$('.top-view').on('click', function () {
    pawn.visible = true

    if (!topView) {
        topView = 1
        // $('.close-button.close-bottom').css('display', 'none')
        camera.position.set(0, 0, 17)
        camera.rotation.set(0, 0, 0)
        render()
    }
})

$('.person-view').on('click', function () {
    if (topView) {
        topView = 0
        // $('.close-button.close-bottom').css('display', 'block')
        pawn.visible = false
        camera.position.set(0, 0, 2)
        camera.rotation.set(Math.PI / 2, 0, 0)
        render()
    }
})

//Simboliska Es skata virziens
const dir = new THREE.Vector3(0, 1, 0)
dir.normalize()
const origin = new THREE.Vector3(0, 0, 0)
const length = 2.5
const hex = 0x000000
const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex)
arrowHelper.scale.set(2, 1, 1)

let hasDirection = 1;
$('#desk-progress.ibm-tabs-content.me a.continue').on('click', function(){
    if($('#desk-progress.ibm-tabs-content').hasClass('direction')) {
        if(hasDirection) {        
            scene.add(arrowHelper)
        }
        hasDirection--;
    }
})

$('.add-emotion').on('click', function (e) {
    let name: string = String($('input[name=emotion]').val())
    let size = $('#emotionForm input[name=intensity]:checked').val()
    let emotion

    console.log(name, size, emotion)

    switch (size) {
        case '1':
            emotion = cube.clone()
            break
        case '2':
            emotion = cubeDouble.clone()
            break
        case '3':
            emotion = cubeTriple.clone()
            break
        default:
            break
    }

    $('#desk-progress.ibm-tabs-content a.continue').removeClass('not-active')

    emotion.position.y = 11.5

    let annotationDiv = document.createElement('div')
    annotationDiv.className = 'annotationLabel'
    annotationDiv.textContent = name
    annotationDiv.style.marginTop = '-1em'
    let annotationLabel = new CSS2DObject(annotationDiv)
    annotationLabel.position.set(0, 0, 3)

    emotion.add(annotationLabel)
    scene.add(emotion)

    const emotionFolder = emotionsFolder.addFolder(name)
    emotionFolder.add(emotion.position, 'x', -deskBorderValue, deskBorderValue)
    emotionFolder.add(emotion.position, 'y', -deskBorderValue, deskBorderValue)

    $(this).attr('disabled', 'disabled')
})

$('#slider').on('slidestop', function (e, ui) {
    arrowHelper.rotation.z = Math.PI * 2 * (ui.value / 360)
})

function init() {}

function animate() {
    requestAnimationFrame(animate)
    arrowHelper.position.set(pawn.position.x, pawn.position.y, 1)
    render()
}

function render() {
    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)
}

init()
animate()
