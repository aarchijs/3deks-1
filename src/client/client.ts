import "./style.scss";
import "./app.js";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
// import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfa4a4);
const width = 610;
    const height = 548;
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
camera.position.z = 17

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
// $('#desk-progress .container div.d-flex div.canvas').append(renderer.domElement);
$('#desk-intro div.canvas').append(renderer.domElement);

const deskGeometry = new THREE.BoxBufferGeometry(24,24, 1)
const deskMaterial = new THREE.MeshBasicMaterial({
    color: 0xDDD5D2,
})
const desk = new THREE.Mesh(deskGeometry, deskMaterial);

const cubeGeometry = new THREE.BoxBufferGeometry(1,1, 1);

const cube = new THREE.Mesh(cubeGeometry);
cube.castShadow = true;
cube.receiveShadow = true;
cube.position.set(0,0,1);

const cubeDouble = cube.clone();
const secondCube = new THREE.Mesh(cubeGeometry);
secondCube.position.set(0,0,1.15);
cubeDouble.add(secondCube);

const cubeTriple = cubeDouble.clone();
const thirdCube = new THREE.Mesh(cubeGeometry);
thirdCube.position.set(0,0,2.3);
cubeTriple.add(thirdCube);

const coneGeometry = new THREE.ConeGeometry(.75,2,16);
const cone = new THREE.Mesh(coneGeometry);
cone.position.set(0,0,1.5);
cone.rotation.set(Math.PI / 2, 0, 0);


const sphereGeometry = new THREE.SphereGeometry(.35,32,16);

// var pawnGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries([coneGeometry, sphereGeometry]);
const sphere = new THREE.Mesh(sphereGeometry);
sphere.position.set(0,0.63,0);


const pawn = cone.add(sphere);

pawn.castShadow = true;
pawn.receiveShadow = true;

scene.add(new THREE.AxesHelper(500))
scene.add(desk)
// scene.add(pawn)
scene.add(cubeTriple)

// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }
const orbitControls = new OrbitControls(camera, renderer.domElement)
const dragControls = new DragControls([cubeTriple], camera, renderer.domElement)
dragControls.transformGroup = true;

function init() {
    var ambientLight = new THREE.AmbientLight(0x0f0f0f);
    scene.add(ambientLight);

    var light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);

    scene.add(light);


}

function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01

    orbitControls.update();

    render();
}

function render() {
    renderer.render(scene, camera);
}

init();
animate();
