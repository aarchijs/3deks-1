import './style.scss' // CSS/SCSS import
import './app.js' // JS/jQuery import
import * as THREE from 'three' // visualisation engine import
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer' // for text labels, arrows and other 2D stuff
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' // for imported 3D objects
import { DragControls } from 'three/examples/jsm/controls/DragControls' // to drag around objects
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // to rotate scene around object
import { InteractionManager } from 'three.interactive' // adds DOM events like click, mouseover,mouseout etc.

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xbfa4a4) //scene background color

//HTML canvas dimensions
const width = 528
const height = 528
const aspect = width / height

let camera // variable to make camera switching from Perspective to Ortographic possible
const pCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
const oCamera = new THREE.OrthographicCamera(
    width / -2,width / 2,
    height / 2,height / -2,
    0,1000
)
oCamera.position.y = 17 // Scene rotates against Y axis, not Z
oCamera.zoom = 21
oCamera.updateProjectionMatrix()
oCamera.updateMatrix()
camera = oCamera

scene.add(new THREE.AmbientLight(0xffffff)) // without light imported 3D objects will render black

const renderer = new THREE.WebGLRenderer() //render 3D objects
renderer.setSize(width, height)
renderer.domElement.style.zIndex = '8'

let topView = 1
let personView = 0

//render 2D objects
let labelRenderer = new CSS2DRenderer()
labelRenderer.setSize(width, height)
labelRenderer.domElement.style.position = 'absolute' // so label renderer is overlaying 3D renderer and you can see text labels for figures
labelRenderer.domElement.style.pointerEvents = 'none' // lets you drag, click and other DOM events on 3D objects instead of text labels if they appear on top
labelRenderer.domElement.style.top = '0'

//HTML canvas
const canvas = $('#desk-progress .container div.d-flex div.desk-canvas');
canvas.append(renderer.domElement) //adding 3D renderer to html
canvas.append(labelRenderer.domElement) //adding 2D renderer to html

//Desk where figures are placed on top
const deskGeometry = new THREE.BoxBufferGeometry(24, 24, 1)
const deskMaterial = new THREE.MeshBasicMaterial({color: 0xddd5d2})
const desk = new THREE.Mesh(deskGeometry, deskMaterial)
desk.rotation.set(Math.PI / 2, 0, 0)
scene.add(desk)

// symbolic Self sight direction made of plain circle
const sightGeometry = new THREE.CircleGeometry(1.25, 24, Math.PI / 4, Math.PI / 4 * 2);
const sightMaterial = new THREE.MeshBasicMaterial({color: 0xbababa})
const sight = new THREE.Mesh(sightGeometry, sightMaterial)
sight.position.y = 0.55;
sight.rotation.set(Math.PI / 2, Math.PI, Math.PI / 2)
sight.visible = false //becomes visible only on step where self sight direction is set
scene.add(sight)

//symbolic self model
let pawn = new THREE.Mesh()
pawn.position.set(0, 0.5, 0)
pawn.name = 'ES'
let arrow = new THREE.Mesh();//sight direction arrow model;

//Loader for imported objects
const loader = new GLTFLoader()
function handle_load(gltf) //loader function for 3D model (symbolic self)
{
    var object = gltf.scene.children[0];
    let annotationDiv = document.createElement('div')
    annotationDiv.className = 'annotationLabel'
    annotationDiv.textContent = 'ES' //text label
    annotationDiv.style.marginTop = '-1em'
    let annotationLabel = new CSS2DObject(annotationDiv)
    annotationLabel.position.set(0, 1.5, 0)
    object.add(annotationLabel)
    pawn.add(object)
}
function handle_arrow_load(gltf) //loader function for 3D model (self sight direction arrow)
{
    var object = gltf.scene.children[0]
    object.position.set(0,4,0)
    object.scale.set(0.35,0.35,0.35)
    object.rotation.y = -Math.PI / 2
    object.name = 'sightDirection';
    object.visible = false; //becomes visible only on step where self sight direction is set
    arrow.add(object)
}

//loading actual 3D objects
loader.load('assets/me.glb', handle_load)
loader.load('assets/arrow.glb', handle_arrow_load)

//adding actual 3D objects to scene
scene.add(pawn)
scene.add(arrow)

//Symbolic Self sight direction
const dir = new THREE.Vector3(1, 0, 0)
dir.normalize()
const origin = new THREE.Vector3(0, 1, 0)
const length = 2.5
const hex = 0x000000
const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex)
arrowHelper.scale.set(2, 1, 1)
arrowHelper.visible = false
scene.add(arrowHelper)

$('#selfForm input[name=self]').each(function(){
    $(this).on('click', function(){
        $('#desk-intro-self a.continue').removeClass('not-active')
    })
});

//change Self model/object size according to user choosed size by checking radio button on size choice step
$('#desk-intro-self a.continue').on('click', function (e) {
    e.preventDefault()

    let selfSize = $('#selfForm input[name=self]:checked').val()
    //@ts-ignore
    pawn.scale.set(0.215 * selfSize, 0.215 * selfSize, 0.215 * selfSize)
})

//@ts-ignore
let objects = []
//@ts-ignore
objects.push(pawn)

//8 main emotions with descriptions + option to add 8 more additional emotions
//Had to add to scene in visible = false state because DragControls works only with certain objects added from the moment
//when the scene is created
let emotions = [
    {
        name: 'Dusmas',
        description:
            'funkcija ir sagatavot ??ermeni un pr??tu c????ai, signaliz??t par robe??u p??rk??p??anu un ierast??s k??rt??bas izjauk??anu.<br /><br />' +
            '<ul class="mb-0">' +
                '<li>Dod ener??iju un drosmi r??koties, veicin??t p??rmai??as, pretoties nepat??kamajam</li>' +
                '<li>Aizsarg?? ar?? no dzi????k??m, gr??t??k izturam??m emocij??m, t??d??m k?? vil??an??s, skumjas, trauksme, izmisums, bailes</li>' +
            '</ul>'
    },
    {
        name: 'Bailes',
        description:
            'funkcija ir izvair??ties, izk????t no nepat??kam??m un b??stam??m situ??cij??m.<br /><br />' +
            '<ul class="mb-0">' +
                '<li>??ermenis tiek sagatavots, lai pietiktu ener??ijas un sp??ka b??gt vai uzbrukt</li>' +
                '<li>Pal??dz p??rdz??vot draudu situ??cijas</li>' +
                '<li>Motiv?? mekl??t risin??jumu vai atrast dro??u vidi</li>' +
                '<li>Pal??dz b??t modram un aizsarg??ties</li>' +
                '<li>Aktualiz?? r??p??s par dro????bu, vesel??bu</li>' +
                '<li>Iedro??ina p??rvar??t ??aubas un izaicin??jumus</li>' +
            '</ul>'
    },
    {
        name: 'Interese',
        description:
            'funkcija ir pal??dz??t cilv??kam viegl??k piel??goties ikdienai un dz??vei kopum??.<br /><br />' +
            '<ul class="mb-0">' +
                '<li>Nodro??ina sp??ju ilgsto??i notur??t uzman??bu</li>' +
                '<li>Att??sta jaunas iema??as, prasmes un intelektu</li>' +
                '<li>Ir r??c??bas ener??ijas avots, motiv?? sasniegt iecer??to</li>' +
                '<li>Rosina izt??li, fant??ziju un zi??k??r??bu</li>' +
                '<li>Rada v??lmi izp??t??t un iesaist??ties</li>' +
            '</ul>'
    },
    {
        name: 'Kauns',
        description:
            'veic pieder??bas funkciju sabiedr??b??, att??sta cilv??ku savstarp??jo emocion??lo saik??u veido??anos.<br /><br />' +
            '<ul class="mb-0">' +
                '<li>Pasarg?? no neapdom??gas r??c??bas</li>' +
                '<li>Veicina iej??t??bu pret apk??rt??jiem</li>' +
                '<li>Aktualiz?? citu intereses, viedokli un kritiku</li>' +
                '<li>Nodro??ina vietu sabiedr??b??, un tas ir grupas komforta glab??t??js</li>' +
            '</ul>'
    },
    {
        name: 'Vaina',
        description:
            'nodro??ina savstarp??jo attiec??bu veido??anas funkciju, ??auj risin??t situ??cijas attiec??b??s un attur??ties no nelabv??l??g??m darb??b??m.<br /><br />' +
            '<ul class="mb-0">' +
                '<li>Pal??dz izvair??ties no kait??juma nodar????anas otram</li>' +
                '<li>Att??sta atbild??bu, veicinot sp??ju atz??t un labot k????das</li>' +
                '<li>Att??sta emp??tiju, otra cilv??ka emocion??l?? st??vok??a izpratni</li>' +
                '<li>Veido ??tiku un mor??li</li>' +
            '</ul>'
    },
    {
        name: 'Prieks',
        description:
            'funkcija veido pie??er??anos un savstarp??jo uztic????anos, rada labu garast??vokli un v??lmi r??koties. <br /><br />' +
            '<ul class="mb-0">' +
                '<li>Veicina dz??ves j??gas apzin????anos</li>' +
                '<li>Iedvesmo paman??t un baud??t skaisto ikdienas mirk??os</li>' +
                '<li>Motiv?? pie??emt apk??rt??jo pasauli</li>' +
                '<li>Piepilda ar ener??iju</li>' +
                '<li>??auj ??ermenim un pr??tam atsl??bin??ties</li>' +
                '<li>Uzlabo ??erme??a fiziolo??isko st??vokli</li>' +
                '<li>Att??sta iek????jo motiv??ciju</li>' +
                '<li>Iedvesmo jaunu iesp??ju atkl????anai un izmai??u veik??anai</li>' +
                '<li>Veicina rado??umu</li>' +
                '<li>Att??sta komunik??cijas prasmes</li>' +
            '</ul>'
    },
    {
        name: 'Riebums',
        description:
            'funkcija ir nodro??in??t organismam izdz??vo??anu ??? adapt??va reakcija, kas ??auj izvair??ties no nepat??kam??m un vesel??bai kait??g??m situ??cij??m. Veido robe??as: mans ??? sve??s. <br /><br />' +
            '<ul class="mb-0">' +
                '<li>Pal??dz piel??goties ??r??jiem faktoriem, ??aujot apdom??t un izv??l??ties, k?? r??koties</li>' +
                '<li>Mudina izol??ties no ????ietami nepie??emam??, piem??ram, zi??o par kait??gu, nev??lamu vidi</li>' +
                '<li>Motiv?? p??rtraukt nelabv??l??gas attiec??bas ???atbr??voties no objekta vai pa??iem aiziet</li>' +
            '</ul>'
    },
    {
        name: 'Skumjas',
        description:
            'funkcija ??auj apzin??ties p??rdz??vojuma noz??m??gumu, un pal??dz??bas nepiecie??am??bu. <br /><br />' +
            '<ul class="mb-0">' +
                '<li>Skumjas ir nepat??kamas un gr??ti izturamas</li>' +
                '<li>Mudina r??koties, motiv?? eso??o situ??ciju main??t un sasniegt jaunus m??r??us</li>' +
                '<li>Pal??dz p??rdom??t dz??vi, rosina att??st??ties</li>' +
                '<li>Padara v??r??g??kus attiec??b?? pret notieko??o un apk??rt??jiem cilv??kiem</li>' +
            '</ul>'
    }
]

const emotionsCount = emotions.length;
let additionalEmotionNumber = 1;
for(let i=emotionsCount; i<emotionsCount+16; i++){
    let additionalEmotion = 'additional-' + additionalEmotionNumber;
    emotions[i] = {
        name: additionalEmotion,
        description: 'Diem????l, mums neb??s skaidrojums, jo ???? ir tevis ievad??ta emocija. Ar pamatemociju skaidrojumiem vari iepaz??ties novietojot kursoru uz emocijas.'
    };
    additionalEmotionNumber++;
}

const interactionManager = new InteractionManager(renderer, camera, renderer.domElement)
emotions.forEach(function (emotion) {
    const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
    const item = new THREE.Mesh(cubeGeometry)
    item.position.set(11, 1, 0) //every emotion placed on the right side of the deck
    item.visible = false //every emotion invisible until added on certain Add emotion step
    item.name = emotion.name
    item.userData = { description: emotion.description ?? null }

    //@ts-ignore
    item.addEventListener('mouseover', (event) => {

        //3D object highlight should happen only in Top view
        if (topView) {
            event.target.material.color.setHex(0x77A172);
        }

        if(event.target.visible === true && topView) {
            event.target.children[0].element.classList.add('fw-bold')
            $('.emotion-description .emotion-name').text(event.target.name)
            $('.emotion-description .emotion-text').html(event.target.userData.description)
            $('p.emotion-helper').addClass('d-none');
            $('img.emotion-info').addClass('d-none');
        }
    })

    item.addEventListener('mouseout', (event) => {
        if(event.target.visible === true && topView) {
            //removing highlight on mouseout
            event.target.children[0].element.classList.remove('fw-bold')
            event.target.material.color.setHex( 0xffffff );

            $('.emotion-description .emotion-name').text('')
            $('.emotion-description .emotion-text').empty();
            $('p.emotion-helper').removeClass('d-none');
            $('img.emotion-info').removeClass('d-none');
        }
    })

    //adding 2D text label
    let annotationDiv = document.createElement('div')
    annotationDiv.className = 'annotationLabel text-uppercase'
    annotationDiv.textContent = emotion.name
    annotationDiv.style.marginTop = '-1em'

    let annotationLabel = new CSS2DObject(annotationDiv)
    annotationLabel.visible = false //stay invisible until emotion is shown up
    annotationLabel.position.set(0, -0.5, 0)
    item.add(annotationLabel)
    scene.add(item)
    interactionManager.add(item) //to add DOM events to object like clickable etc.

    //@ts-ignore
    objects.push(item)
})

//Ortographic camera controls
const oDragControls = new DragControls(objects, oCamera, renderer.domElement)
const oOrbitControls = new OrbitControls(oCamera, renderer.domElement)

//Perspective camera controls
const pOrbitControls = new OrbitControls(pCamera, renderer.domElement)

//Dragging is possible only when in Ortographic view like Top view
const dragControls = [
    oDragControls,
]

const orbitControls = [oOrbitControls, pOrbitControls]
orbitControls.forEach((orbitControl) => (orbitControl.enabled = false))
const controls = [...dragControls, ...orbitControls]

//first view is top view, these to restrict desk rotation to y axis
oOrbitControls.minPolarAngle = 0
oOrbitControls.maxPolarAngle = 0

//Drag object events
let dragObjectYPosition
dragControls.forEach((dragControl) => {
    dragControl.addEventListener('dragstart', function (event) {
        //restrict dragging to Z and X axis (only horizontal)
        dragObjectYPosition = event.object.position.y
        event.object.parent.name === 'ES' ? pawn.position.y : event.object.position.y
    })

    dragControl.addEventListener('drag', function (event) {
        //restrict dragging to Z and X axis (only horizontal)
        if (
            event.object.position.y > dragObjectYPosition ||
            event.object.position.y < dragObjectYPosition
        ) {
            event.object.position.y = dragObjectYPosition
        }

        //restrict figure movement area
        let deskBorderValues = 11.5;
        if (event.object.parent.name === 'ES') {
            deskBorderValues /= pawn.scale.x;
        }

        if(event.object.position.x > deskBorderValues) {
            event.object.position.x = deskBorderValues;
        }
        if(event.object.position.x < -deskBorderValues) {
            event.object.position.x = -deskBorderValues;
        }
        if(event.object.position.z > deskBorderValues) {
            event.object.position.z = deskBorderValues;
        }
        if(event.object.position.z < -deskBorderValues) {
            event.object.position.z = -deskBorderValues;
        }

        if (event.object.parent.name === 'ES') {
            //move sight direction arrow and radius together with Self model
            arrowHelper.position.x = event.object.position.x
            arrowHelper.position.z = event.object.position.z
            sight.position.x = event.object.position.x * pawn.scale.x
            sight.position.z = event.object.position.z * pawn.scale.z

            if (event.object.name === 'sightDirection') {
                let pawnFigure = scene.getObjectByName('Sphere_1')
                //@ts-ignore
                pawnFigure.position.x = event.object.position.x * pawn.scale.x
                //@ts-ignore
                pawnFigure.position.z = event.object.position.z * pawn.scale.z
            } else {
                let pawnFigure = scene.getObjectByName('sightDirection')
                //@ts-ignore
                pawnFigure.position.x = event.object.position.x * pawn.scale.x
                //@ts-ignore
                pawnFigure.position.z = event.object.position.z * pawn.scale.z
            }

        }
    })
})

//View switcher events by 90 grades with every click
var sideView = 0
$('.side-view').on('click', function () {

    //try out side view changing view angle notification
    $(".try-directions")
        .css("display", "flex").hide().fadeIn(500)
        .animate({ left: '-=12' }, 300)
        .animate({ left: '+=24' }, 600)
        .animate({ left: '-=12' }, 300)
        .fadeOut(3000)

    //switch to perspective camera
    camera = pCamera
    //restrict dragging objects in sideView with dragControls, only rotating around scene center is allowed
    orbitControls.forEach((orbitControl) => (orbitControl.enabled = true))
    dragControls.forEach((dragControl) => (dragControl.enabled = false))

    if (topView || personView) {
        topView = personView = 0
        //restrict orbitControls vertical angle for rotating around
        orbitControls.forEach((orbitControl) => {
            orbitControl.minPolarAngle = Math.PI / 3
            orbitControl.maxPolarAngle = Math.PI * 0.1
        })
    }

    $('img.emotion-info').addClass('d-none');
    $('p.emotion-helper').text('Uzzini emociju noz??mi "Skats no aug??as"');

    if (!pawn.visible) {
        pawn.visible = true //if changed from Self view
    }

    sideView++
    //View switcher events by 90 grades with every click
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
    //make camera look at center of the scene
    camera.lookAt(0, 2, 0)
    render()
})

//Top view
$('.top-view').on('click', function () {
    $(".try-directions").stop(true).fadeOut(100)

    //switch to ortographic camera
    camera = oCamera

    pawn.visible = true //if changed from Self view
    if (!topView) {
        topView = 1
    }
    if (personView) {
        personView = 0
    }

    $('img.emotion-info').removeClass('d-none');
    $('p.emotion-helper').text('Uzzini emociju noz??mi, novietojot kursoru uz emociju kuba');

    orbitControls.forEach((orbitControl) => (orbitControl.enabled = false))
    dragControls.forEach((dragControl) => (dragControl.enabled = true))

    //puts camera on top of desk and looking to desk center
    camera.zoom = 21
    camera.position.set(0, 17, 0)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
    camera.updateMatrix()
    render()
})

//Self view
$('.person-view').on('click', function () {
    $(".try-directions").stop(true).fadeOut(100)

    if($(this).data('blocked')) {
        return;
    }

    //switch to perspective camera
    camera = pCamera

    if (topView) {
        topView = 0
    }
    if (!personView) {
        personView = 1
    }

    $('img.emotion-info').addClass('d-none');
    $('p.emotion-helper').text('Uzzini emociju noz??mi "Skats no aug??as"');

    pawn.visible = false //in self view Self model should not be visible
    let self = pawn.children[0]
    camera.position.set(self.position.x * pawn.scale.x, self.scale.y, self.position.z * pawn.scale.z)
    camera.lookAt(self.position.x + arrowHelper.cone.position.y, self.scale.y, self.position.z)
    camera.rotation.set(0, arrowHelper.rotation.y - Math.PI / 2, 0)
    controls.forEach((control) => (control.enabled = false))
    camera.updateProjectionMatrix()
    camera.updateMatrix()
    render()
    console.log(camera.rotation)

})

$('#desk-progress.blank a.back').on('click', function () {
    if ($('#desk-progress').hasClass('additional')) {
        if (!hasDirection) {
            sight.visible = false
            //@ts-ignore
            arrow.children[0].visible = false
            hasDirection++
        }
    }
})

let hasDirection = 1 //something was wrong with switching the steps
//when Self direction step is on it makes arrow and radius visible
$('#desk-progress.blank a.continue').on('click', function () {
    if ($('#desk-progress').hasClass('direction')) {
        if (hasDirection) {
            sight.visible = true
            //@ts-ignore
            arrow.children[0].visible = true
        }
        hasDirection--
    }
})

let additional = 0
//Emotion becomes visible only when user chooses its size by clicking on certain size
$('#emotionForm .emotion-size').on('click', function (e) {
    //switch to top view
    $('.top-view').trigger('click');

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
    //small highlight when emotion appears on screen/desk
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

    //button Continue becomes enabled
    $('#desk-progress a.continue').removeClass('not-active')
})

//To rotate camera view in person view, sight direction arrow and radius together with dragging button on slider
$('.slider').each(function(){
    $(this).on('slide', function (e, ui) {

        arrowHelper.rotation.y = pawn.children[0].rotation.y = Math.PI * 2 * (ui.value / 360)
        sight.rotation.z = Math.PI * 2 * (ui.value / 360) + Math.PI / 2
        arrow.children[0].rotation.y = Math.PI * 2 * (ui.value / 360) - Math.PI / 2

        if (personView) {
            camera.rotation.set(0, arrowHelper.rotation.y - Math.PI / 2, 0)
            camera.updateProjectionMatrix()
            camera.updateMatrix()
        }

        let sliderRotation = $(this).find('span.ui-slider-handle').css('left');

        $('.slider').each(function(){
            $(this).find('span.ui-slider-handle').css('left', sliderRotation)
        })
    })
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
