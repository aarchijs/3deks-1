import './style.scss'
import './app.js'
import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { InteractionManager } from 'three.interactive'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xbfa4a4)
const width = 528
const height = 528
const aspect = width / height
let camera
const pCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
const oCamera = new THREE.OrthographicCamera(
    width / -2,
    width / 2,
    height / 2,
    height / -2,
    0,
    1000
)
oCamera.position.y = 17
oCamera.zoom = 21
oCamera.updateProjectionMatrix()
oCamera.updateMatrix()
camera = oCamera

var light = new THREE.AmbientLight(0xffffff)
scene.add(light)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.domElement.style.zIndex = '8'

let topView = 1
let personView = 0

let labelRenderer = new CSS2DRenderer()
labelRenderer.setSize(width, height)
labelRenderer.domElement.style.position = 'absolute'
labelRenderer.domElement.style.pointerEvents = 'none'
labelRenderer.domElement.style.top = '0'

const canvas = $('#desk-progress .container div.d-flex div.desk-canvas');
canvas.append(renderer.domElement)
canvas.append(labelRenderer.domElement)

const deskGeometry = new THREE.BoxBufferGeometry(24, 24, 1)
const deskMaterial = new THREE.MeshBasicMaterial({
    color: 0xddd5d2,
})
const desk = new THREE.Mesh(deskGeometry, deskMaterial)
desk.rotation.set(Math.PI / 2, 0, 0)
scene.add(desk)

const radius = 1.25;
const segments = 24;
const thetaStart = Math.PI / 4;
const thetaLength = Math.PI / 4 * 2;
const sightGeometry = new THREE.CircleGeometry(
    radius, segments, thetaStart, thetaLength);
    const sightMaterial = new THREE.MeshBasicMaterial({
        color: 0xbababa
    })
const sight = new THREE.Mesh(sightGeometry, sightMaterial)
sight.position.y = 0.501;
sight.rotation.set(Math.PI / 2, Math.PI, Math.PI / 2)
sight.visible = false
scene.add(sight)

const loader = new GLTFLoader()
function handle_load(gltf)
{
    var object = gltf.scene.children[0];

    let annotationDiv = document.createElement('div')
    annotationDiv.className = 'annotationLabel'
    annotationDiv.textContent = 'ES'
    annotationDiv.style.marginTop = '-1em'
    let annotationLabel = new CSS2DObject(annotationDiv)
    annotationLabel.position.set(0, 1.5, 0)

    object.add(annotationLabel)
    pawn.add(object)
}
function handle_arrow_load(gltf)
{
    var object = gltf.scene.children[0]
    object.position.set(-0.1,4,0)
    object.scale.set(0.35,0.35,0.35)
    object.rotation.y = -Math.PI / 2
    object.name = 'sightDirection';
    object.visible = false;
    arrow.add(object)
}
loader.load('assets/me.glb', handle_load)
loader.load('assets/arrow.glb', handle_arrow_load)

let pawn = new THREE.Mesh()
pawn.scale.set(0.215,0.215,0.215)
pawn.position.set(0, 0.5, 0)
pawn.name = 'ES'

let arrow = new THREE.Mesh();
scene.add(pawn)
scene.add(arrow)
$('#desk-intro-self a.continue').on('click', function (e) {
    e.preventDefault()

    let selfSize = $('#selfForm input[name=self]:checked').val()
    //@ts-ignore
    pawn.scale.set(pawn.scale.x * selfSize, pawn.scale.y * selfSize, pawn.scale.z * selfSize)
})

let check = scene.getObjectByName('sightDirection');
check?.addEventListener('mousedown', function(){console.log('yesyes?')})

//@ts-ignore
let objects = []
//@ts-ignore
objects.push(pawn)

//8 main emotions + option to add 8 more additional emotions
let emotions = [
    {
        name: 'Dusmas',
        description:
            'funkcija ir sagatavot ķermeni un prātu cīņai, signalizēt par robežu pārkāpšanu un ierastās kārtības izjaukšanu.<br /><br />' +
            '<ul class="mb-0">' +
                '<li>Dod enerģiju un drosmi rīkoties, veicināt pārmaiņas, pretoties nepatīkamajam</li>' +
                '<li>Aizsargā arī no dziļākām, grūtāk izturamākām emocijām, tādām kā: vilšanās, skumjas, trauksme, izmisums, bailes</li>' +
            '</ul>'
    },
    {
        name: 'Bailes',
        description:
            'funkcija ir izvairīties, izkļūt ārā no nepatīkamām un bīstamām situācijām.<br /><br />' +
            '<ul class="mb-0">' +
                '<li>Ķermenis tiek sagatavots, lai pietiktu enerģijas un spēka bēgt vai uzbrukt</li>' +
                '<li>Palīdz pārdzīvot draudu situācijas</li>' +
                '<li>Motivē meklēt risinājumu vai atrast drošu vidi</li>' +
                '<li>Palīdz būt modram un aizsargāties</li>' +
                '<li>Aktualizē rūpēs par drošību, veselību</li>' +
                '<li>Iedrošina pārvarēt šaubas un izaicinājumus</li>' +
            '</ul>'
    },
    {
        name: 'Interese',
        description:
            'funkcija ir palīdzēt cilvēkam vieglāk pielāgoties ikdienai un dzīvei kopumā.<br /><br />' +
            '<ul class="mb-0">' +
                '<li>Nodrošina spēju ilgstoši noturēt uzmanību</li>' +
                '<li>Attīsta jaunas iemaņas, prasmes un intelektu</li>' +
                '<li>Ir rīcības enerģijas avots, motivē sasniegt iecerēto</li>' +
                '<li>Rosina iztēli, fantāziju un ziņkārību</li>' +
                '<li>Rada vēlmi izpētīt un iesaistīties</li>' +
            '</ul>'
    },
    {
        name: 'Kauns',
        description:
            'veic piederības funkciju sabiedrībā, attīsta cilvēku savstarpējo emocionālo saikņu veidošanos.<br /><br />' +
            '<ul class="mb-0">' +
                '<li>Pasargā no neapdomīgas rīcības</li>' +
                '<li>Veicina iejūtību pret apkārtējiem</li>' +
                '<li>Aktualizē citu intereses, viedokli un kritiku</li>' +
                '<li>Pasargā no neapdomīgas rīcības</li>' +
                '<li>Nodrošina vietu sabiedrībā un tas ir grupas komforta glabātājs</li>' +
            '</ul>'
    },
    {
        name: 'Vaina',
        description:
            'nodrošina savstarpējo attiecību veidošanas funkciju, ļauj risināt situācijas attiecībās un atturēties no nelabvēlīgām darbībām.<br /><br />' +
            '<ul class="mb-0">' +
                '<li>Palīdz izvairīties no kaitējuma nodarīšanas otram</li>' +
                '<li>Attīsta atbildību, veicinot spēju atzīt un labot kļūdas</li>' +
                '<li>Attīsta empātiju, otra cilvēka emocionālā stāvokļa izpratni</li>' +
                '<li>Veido ētiku un morāli</li>' +
            '</ul>'
    },
    {
        name: 'Prieks',
        description:
            'funkcija veido pieķeršanos un savstarpējo uzticēšanos, rada labu garastāvokli un vēlmi rīkoties. <br /><br />' +
            '<ul class="mb-0">' +
                '<li>Veicina dzīves jēgas apzināšanos</li>' +
                '<li>Pamanīt un baudīt skaisto ikdienas mirkļos </li>' +
                '<li>Spēt pieņemt apkārtējo pasauli</li>' +
                '<li>Piepilda ar enerģiju</li>' +
                '<li>Ļauj ķermenim un prātam atslābināties</li>' +
                '<li>Uzlabo ķermeņa fizioloģisko stāvokli</li>' +
                '<li>Attīsta iekšējo motivāciju</li>' +
                '<li>Iedvesmo jaunu iespēju atklāšanai un izmaiņu veikšanai</li>' +
                '<li>Veicina radošumu</li>' +
                '<li>Attīsta komunikācijas prasmes</li>' +
            '</ul>'
    },
    {
        name: 'Riebums',
        description:
            'funkcija ir nodrošināt organismam izdzīvošanu - adaptīva reakcija, kas ļauj izvairīties no nepatīkamām un veselībai kaitīgām situācijām. Veido robežas: mans – svešs. <br /><br />' +
            '<ul class="mb-0">' +
                '<li>Palīdz adaptēties ārējiem faktoriem, ļaujot apdomāt un izvēlēties, kā rīkoties</li>' +
                '<li>Mudina izolēties no šķietami nepieņemamā, piemēram, ziņo par kaitīgu, nevēlamu vidi</li>' +
                '<li>Motivē pārtraukt nelabvēlīgas attiecības – atbrīvoties no objekta vai pašiem aiziet</li>' +
            '</ul>'
    },
    {
        name: 'Skumjas',
        description:
            'funkcija ļauj apzināties pārdzīvojuma nozīmīgumu, un palīdzības nepieciešamību. <br /><br />' +
            '<ul class="mb-0">' +
                '<li>Skumjas ir nepatīkamas un grūti izturamas</li>' +
                '<li>Mudina rīkoties, motivē esošo situāciju mainīt un sasniegt jaunus mērķus</li>' +
                '<li>Palīdz pārdomāt dzīvi, rosina uz attīstību</li>' +
                '<li>Padara vērīgākus attiecībā pret notiekošo un apkārtējiem cilvēkiem</li>' +
            '</ul>'
    },

    { name: 'additional-1' },
    { name: 'additional-2' },
    { name: 'additional-3' },
    { name: 'additional-4' },
    { name: 'additional-5' },
    { name: 'additional-6' },
    { name: 'additional-7' },
    { name: 'additional-8' },
    { name: 'additional-9' },
    { name: 'additional-10' },
    { name: 'additional-11' },
    { name: 'additional-12' },
    { name: 'additional-13' },
    { name: 'additional-14' },
    { name: 'additional-15' },
    { name: 'additional-16' },
]

const interactionManager = new InteractionManager(renderer, camera, renderer.domElement)
emotions.forEach(function (emotion) {
    const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
    const item = new THREE.Mesh(cubeGeometry)
    item.position.set(11, 1, 0)
    item.visible = false
    item.name = emotion.name
    item.userData = { description: emotion.description ?? null }

    //@ts-ignore
    item.addEventListener('mouseover', (event) => {
        if(topView) {
            event.target.material.color.setHex( 0x77A172 );
        }

        if (!event.target.name.includes('additional')) {
            event.target.children[0].element.classList.add('fw-bold')
            $('.emotion-description .emotion-name').text(event.target.name)
            $('.emotion-description .emotion-text').append(event.target.userData.description)
        }
    })

    item.addEventListener('mouseout', (event) => {
        event.target.children[0].element.classList.remove('fw-bold')
        event.target.material.color.setHex( 0xffffff );

        $('.emotion-description .emotion-name').text('')
        $('.emotion-description .emotion-text').empty();
    })

    let annotationDiv = document.createElement('div')
    annotationDiv.className = 'annotationLabel text-uppercase'
    annotationDiv.textContent = emotion.name
    annotationDiv.style.marginTop = '-1em'
    let annotationLabel = new CSS2DObject(annotationDiv)
    annotationLabel.visible = false
    annotationLabel.position.set(0, 1, 0)
    item.add(annotationLabel)
    scene.add(item)
    interactionManager.add(item)

    //@ts-ignore
    objects.push(item)
})

//Ortographic camera controls
const oDragControls = new DragControls(objects, oCamera, renderer.domElement)
const oOrbitControls = new OrbitControls(oCamera, renderer.domElement)

//Perspective camera controls
const pOrbitControls = new OrbitControls(pCamera, renderer.domElement)

const dragControls = [
    oDragControls,
]

const orbitControls = [oOrbitControls, pOrbitControls]
const controls = [...dragControls, ...orbitControls]

//first view is top view, these to restrict desk rotation to y axis
oOrbitControls.minPolarAngle = 0
oOrbitControls.maxPolarAngle = 0

//Drag object events
let dragObjectYPosition
dragControls.forEach((dragControl) => {
    dragControl.addEventListener('dragstart', function (event) {
        orbitControls.forEach((orbitControl) => (orbitControl.enabled = false))
        dragObjectYPosition = event.object.position.y
        event.object.parent.name === 'ES' ? pawn.position.y : event.object.position.y
    })

    dragControl.addEventListener('drag', function (event) {
        if (
            event.object.position.y > dragObjectYPosition ||
            event.object.position.y < dragObjectYPosition
        ) {
            event.object.position.y = dragObjectYPosition
        }

        if (event.object.parent.name === 'ES') {
            arrowHelper.position.x = event.object.position.x
            arrowHelper.position.z = event.object.position.z
            sight.position.x = event.object.position.x
            sight.position.z = event.object.position.z

            if (event.object.name === 'sightDirection') {
                let pawnFigure = scene.getObjectByName('Sphere_1')
                //@ts-ignore
                pawnFigure.position.x = event.object.position.x+0.1
                //@ts-ignore
                pawnFigure.position.z = event.object.position.z
            } else {
                let pawnFigure = scene.getObjectByName('sightDirection')
                //@ts-ignore
                pawnFigure.position.x = event.object.position.x-0.1
                //@ts-ignore
                pawnFigure.position.z = event.object.position.z
            }
        }
    })

    dragControl.addEventListener('dragend', function (event) {
        orbitControls.forEach((orbitControl) => (orbitControl.enabled = true))
    })
})

//View switcher events
var sideView = 0
$('.side-view').on('click', function () {
    camera = pCamera
    orbitControls.forEach((orbitControl) => (orbitControl.enabled = true))
    dragControls.forEach((dragControl) => (dragControl.enabled = false))

    if (topView || personView) {
        topView = personView = 0
        orbitControls.forEach((orbitControl) => {
            orbitControl.minPolarAngle = Math.PI / 3
            orbitControl.maxPolarAngle = Math.PI * 0.1
        })
    }

    if (!pawn.visible) {
        pawn.visible = true
    }

    sideView++

    switch (sideView) {
        case 1:
            camera.position.set(0, 2, 16)
            break
        case 2:
            camera.position.set(-16, 2, 0)
            break
        case 3:
            camera.position.set(0, 2, -16)
            break
        case 4:
            camera.position.set(16, 2, 0)
            break
        default:
            sideView = 1
            camera.position.set(0, 2, 16)
            break
    }
    console.log(camera)
    camera.lookAt(0, 2, 0)
    render()
})
$('.top-view').on('click', function () {
    camera = oCamera

    pawn.visible = true
    if (!topView) {
        topView = 1
    }
    if (personView) {
        personView = 0
    }

    controls.forEach((control) => (control.enabled = true))

    orbitControls.forEach((orbitControl) => {
        orbitControl.minPolarAngle = 0
        orbitControl.maxPolarAngle = 0
    })
    camera.position.set(0, 17, 0)
    camera.lookAt(0, 0, 0)

    render()
})
$('.person-view').on('click', function () {
    camera = pCamera

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
    controls.forEach((control) => (control.enabled = false))

    render()
})

//Simboliska Es skata virziens
const dir = new THREE.Vector3(1, 0, 0)
dir.normalize()
const origin = new THREE.Vector3(0, 1, 0)
const length = 2.5
const hex = 0x000000
const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex)
arrowHelper.scale.set(2, 1, 1)
arrowHelper.visible = false
scene.add(arrowHelper)

$('#desk-progress.me a.back').on('click', function () {
    if ($('#desk-progress').hasClass('additional')) {
        if (!hasDirection) {
            sight.visible = false
            //@ts-ignore
            arrow.children[0].visible = false
            hasDirection++
        }
    }
})
let hasDirection = 1
$('#desk-progress.me a.continue').on('click', function () {
    if ($('#desk-progress').hasClass('direction')) {
        if (hasDirection) {
            sight.visible = true
            //@ts-ignore
            arrow.children[0].visible = true
        }
        hasDirection--
    }
})

$('#emotionForm input[name=emotion]').on('change', function () {})
let additional = 0
$('#emotionForm .emotion-size').on('click', function (e) {
    $(this).find('input[name=intensity]').prop('checked', true)

    let size = $(this).find('input[name=intensity]').val()
    let nameValue = String($('input[name=emotion]').val()).toLowerCase()
    let name: string = nameValue.charAt(0).toUpperCase() + nameValue.slice(1)
    let emotionFigure

    if ($('#desk-progress').hasClass('additional')) {
        additional++
        emotionFigure = scene.getObjectByName('additional-' + additional)
        emotionFigure.name = emotionFigure.children[0].element.textContent = name
    } else {
        emotionFigure = scene.getObjectByName(name)
    }

    if (!emotionFigure) {
        return
    }

    emotionFigure.visible = emotionFigure.children[0].visible = true
    emotionFigure.material.color.setHex( 0x77A172 );
    setTimeout(function(){emotionFigure.material.color.setHex( 0xffffff );}, 300);

    switch (size) {
        case '1':
            emotionFigure.scale.y = emotionFigure.position.y = 1
            break
        case '2':
            emotionFigure.scale.y = 2
            emotionFigure.position.y = 1.5
            break
        case '3':
            emotionFigure.scale.y = 3
            emotionFigure.position.y = 2
            break
        default:
            emotionFigure.scale.y = emotionFigure.position.y = 1
            break
    }

    $('#desk-progress a.continue').removeClass('not-active')
})

$('#slider').on('slide', function (e, ui) {
    arrowHelper.rotation.y = pawn.children[0].rotation.y = Math.PI * 2 * (ui.value / 360)
    sight.rotation.z = Math.PI * 2 * (ui.value / 360) + Math.PI / 2
    arrow.children[0].rotation.y = Math.PI * 2 * (ui.value / 360) - Math.PI / 2

    if (personView) {
        camera.rotation.y = arrowHelper.rotation.y - Math.PI / 2
    }
})

function init() {}
function animate() {
    requestAnimationFrame(animate)
    interactionManager.update()
    render()
}
function render() {
    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)
}

init()
animate()
