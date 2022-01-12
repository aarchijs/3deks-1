import './style.scss'
import './app.js'
import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ArrowHelper, GeometryUtils, Object3D, Scene } from 'three'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfa4a4);
const width = 610;
const height = 548;
const aspectRatio = width / height;
const viewSize = 548;

let topView = 1;
let personView = 0;

const gridHelper = new THREE.GridHelper(24, 22);
scene.add(gridHelper);
gridHelper.position.y = 0.501;

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
camera.position.y = 17;

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.domElement.style.zIndex = '8';

$('#desk-progress .container div.d-flex div.desk-canvas').append(renderer.domElement);

let labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(width, height);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.pointerEvents = 'none';
labelRenderer.domElement.style.top = '0';

$('#desk-progress .container div.d-flex div.desk-canvas').append(labelRenderer.domElement);

const deskGeometry = new THREE.BoxBufferGeometry(24, 24, 1);
const deskMaterial = new THREE.MeshBasicMaterial({
    color: 0xddd5d2,
});
const desk = new THREE.Mesh(deskGeometry, deskMaterial);
desk.rotation.set(Math.PI / 2, 0, 0);
scene.add(desk);

const deskBorderValue = 11.5;
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);

const cube = new THREE.Mesh(cubeGeometry);
cube.position.set(11.75, 1, 0);

const loader = new GLTFLoader();
function handle_load(gltf) {
    var object = gltf.scene.children[0].children[0];
    let annotationDiv = document.createElement('div');
    annotationDiv.className = 'annotationLabel';
    annotationDiv.textContent = 'ES';
    annotationDiv.style.marginTop = '-1em';
    let annotationLabel = new CSS2DObject(annotationDiv);
    annotationLabel.position.set(0, 1.5, 0);
    object.add(gltf.scene.children[0].children[1]);
    object.add(annotationLabel);
    pawn.add(object);
}
loader.load('assets/pawn2.glb', handle_load);
let pawn = new THREE.Mesh();
pawn.position.set(0, 0.5, 0);
pawn.name = 'ES';

scene.add(pawn);

$('#desk-intro-self a.continue').on('click', function (e) {
    e.preventDefault();

    let selfSize = $('#selfForm input[name=self]:checked').val();
    //@ts-ignore
    pawn.children[0].scale.set(selfSize, selfSize, selfSize);
})

scene.add(new THREE.AxesHelper(500));

//@ts-ignore
let objects = [];
//@ts-ignore
objects.push(pawn);

//8 main emotions + option to add 8 more additional emotions
let emotions = [
    'Skumjas',
    'Bailes',
    'Dusmas',
    'Prieks',
    'Kauns',
    'Vaina',
    'Riebums',
    'Interese',
    'additional-1',
    'additional-2',
    'additional-3',
    'additional-4',
    'additional-5',
    'additional-6',
    'additional-7',
    'additional-8',
];

let item;
emotions.forEach(function (emotion) {
    item = cube.clone();
    item.visible = false;
    item.name = emotion;

    let annotationDiv = document.createElement('div');
    annotationDiv.className = 'annotationLabel';
    annotationDiv.textContent = emotion;
    annotationDiv.style.marginTop = '-1em';
    let annotationLabel = new CSS2DObject(annotationDiv);
    annotationLabel.visible = false;
    annotationLabel.position.set(0, 1, 0);
    item.add(annotationLabel);

    scene.add(item);

    //@ts-ignore
    objects.push(item);
})

const controls = new DragControls(objects, camera, renderer.domElement);
const orbitControls = new OrbitControls(camera, renderer.domElement);
//first view is top view, these to restrict desk rotation to y axis
orbitControls.minPolarAngle = 0;
orbitControls.maxPolarAngle = 0;

//DragControls events
let dragObjectYPosition;
controls.addEventListener('dragstart', function (event) {
    orbitControls.enabled = false;

    dragObjectYPosition =
        event.object.parent.name === 'ES' ? pawn.position.y : event.object.position.y;
});
controls.addEventListener('drag', function (event) {
    if (
        event.object.position.y > dragObjectYPosition ||
        event.object.position.y < dragObjectYPosition
    ) {
        event.object.position.y = dragObjectYPosition;
    }

    if (event.object.parent.name === 'ES') {
        arrowHelper.position.x = event.object.position.x;
        arrowHelper.position.z = event.object.position.z;
    }
});
controls.addEventListener('dragend', function (event) {
    orbitControls.enabled = true;
});

//View switcher events
var sideView = 0;
$('.side-view').on('click', function () {
    controls.enabled = orbitControls.enabled = true;

    if (topView || personView) {
        topView = personView = 0;
        orbitControls.minPolarAngle = Math.PI / 3;
        orbitControls.maxPolarAngle = Math.PI * 0.1;
    }
    if (!pawn.visible) {
        pawn.visible = true;
    }

    sideView++;

    switch (sideView) {
        case 1:
            camera.position.set(0, 2, 16);
            break;
        case 2:
            camera.position.set(-16, 2, 0);
            break;
        case 3:
            camera.position.set(0, 2, -16);
            break;
        case 4:
            camera.position.set(16, 2, 0);
            break;
        default:
            sideView = 1;
            camera.position.set(0, 2, 16);
            break;
    }
    camera.lookAt(0, 2, 0);
    render();
});
$('.top-view').on('click', function () {
    pawn.visible = true;
    if (!topView) {
        topView = 1;
    }
    if (personView) {
        personView = 0;
    }
    controls.enabled = orbitControls.enabled = true;

    orbitControls.minPolarAngle = 0;
    orbitControls.maxPolarAngle = 0;
    camera.position.set(0, 17, 0);
    camera.lookAt(0, 0, 0);

    render();
});
$('.person-view').on('click', function () {
    if (topView) {
        topView = 0
    }
    if (!personView) {
        personView = 1
    }

    pawn.visible = false
    let self = pawn.children[0]
    camera.position.set(self.position.x, self.scale.y, self.position.z)
    camera.lookAt(self.position.x + arrowHelper.cone.position.y, self.scale.y, self.position.z)
    camera.rotation.y = arrowHelper.rotation.y - Math.PI / 2
    controls.enabled = orbitControls.enabled = false

    render()
});

//Simboliska Es skata virziens
const dir = new THREE.Vector3(1, 0, 0);
dir.normalize();
const origin = new THREE.Vector3(0, 1, 0);
const length = 2.5;
const hex = 0x000000;
const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
arrowHelper.scale.set(2, 1, 1);
scene.add(arrowHelper);

let hasDirection = 1;
$('#desk-progress.ibm-tabs-content.me a.continue').on('click', function () {
    if ($('#desk-progress.ibm-tabs-content').hasClass('direction')) {
        if (hasDirection) {
            scene.add(arrowHelper);
        }
        hasDirection--;
    }
});

$('#emotionForm input[name=emotion]').on('change', function () {})
let additional = 0;
$('#emotionForm .emotion-size').on('click', function (e) {
    $(this).find('input[name=intensity]').prop('checked', true);

    let size = $(this).find('input[name=intensity]').val();
    let nameValue = String($('input[name=emotion]').val()).toLowerCase();
    let name: string = nameValue.charAt(0).toUpperCase() + nameValue.slice(1);
    let emotion;

    if ($('#desk-progress').hasClass('additional')) {
        additional++;
        emotion = scene.getObjectByName('additional-' + additional);
        emotion.name = emotion.children[0].element.textContent = name;
    } else {
        emotion = scene.getObjectByName(name);
    }

    if (!emotion) {
        return;
    }

    emotion.visible = emotion.children[0].visible = true;

    switch (size) {
        case '1':
            emotion.scale.y = emotion.position.y = 1;
            break;
        case '2':
            emotion.scale.y = 3;
            emotion.position.y = 1.5;
            break
        case '3':
            emotion.scale.y = 5;
            emotion.position.y = 2.5;
            break;
        default:
            emotion.scale.y = emotion.position.y = 1;
            break;
    }

    $('#desk-progress.ibm-tabs-content a.continue').removeClass('not-active');
});

$('#slider').on('slide', function (e, ui) {
    arrowHelper.rotation.y = pawn.children[0].rotation.y = Math.PI * 2 * (ui.value / 360);
    if (personView) {
        camera.rotation.y = arrowHelper.rotation.y - Math.PI / 2;
    }
});

function init() {}
function animate() {
    requestAnimationFrame(animate);
    render();
}
function render() {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

init();
animate();
