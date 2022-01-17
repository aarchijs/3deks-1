// const cubeDouble = cube.clone()
// const secondCube = new THREE.Mesh(cubeGeometry)
// secondCube.position.set(0, 0, 1)
// cubeDouble.add(secondCube)

// const cubeDoubleFolder = gui.addFolder('2x');

// //@ts-ignore
// cubeDoubleFolder.add(cubeDouble.position, 'x', -deskBorderValue, deskBorderValue)
// //@ts-ignore
// cubeDoubleFolder.add(cubeDouble.position, 'y', -deskBorderValue, deskBorderValue)
// //@ts-ignore
// cubeDoubleFolder.add(cubeDouble.position, 'z', -deskBorderValue, deskBorderValue)

// const cubeTriple = cubeDouble.clone()
// const thirdCube = new THREE.Mesh(cubeGeometry)
// thirdCube.position.set(0, 0, 2)
// cubeTriple.add(thirdCube)

// let medium = cubeDouble.clone();
// medium.position.set(2,0,1)

// let big = cubeTriple.clone();
// big.position.set(3,0,1)

// scene.add(medium)
// scene.add(big)

// const coneGeometry = new THREE.ConeBufferGeometry(1, 3, 32 );
// const pawn = new THREE.Mesh(coneGeometry);
// pawn.name = 'Torso';
// pawn.rotation.set(Math.PI/2,0,0);
// pawn.position.set(0,0,2);

// const sphereGeometry = new THREE.SphereBufferGeometry( 0.7, 32, 16 );
// const sphere = new THREE.Mesh(sphereGeometry);
// sphere.name = 'Head';
// sphere.position.set(0,1.5,0);
// pawn.add(sphere);
// let annotationDiv = document.createElement('div')
// annotationDiv.className = 'annotationLabel'
// annotationDiv.textContent = 'ES'
// annotationDiv.style.marginTop = '-1em'
// let annotationLabel = new CSS2DObject(annotationDiv)
// annotationLabel.position.set(0, 0, 1)
// pawn.add(annotationLabel)

// scene.add(pawn)

    // console.log(event.object.children)
    // event.object.children[0].position.z = 4;
    // controls.transformGroup = ['Head', 'Torso'].includes(event.object.name);

    //@ts-ignore
// controls.addEventListener('mousedown', function (event) {
//     // controls.transformGroup = ['Head', 'Torso'].includes(event.object.name);
//     console.log('click')
// })

//     controls.transformGroup = false;


// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

// const sceneFolder = gui.addFolder('SCENE');
// sceneFolder.add(scene.rotation, 'x', -Math.PI, Math.PI)
// sceneFolder.add(scene.rotation, 'y', -Math.PI, Math.PI)
// sceneFolder.add(scene.rotation, 'z', -Math.PI, Math.PI)

// const pawnFolder = gui.addFolder('ES')
// pawnFolder.add(pawn.position, 'x', -deskBorderValue, deskBorderValue)
// pawnFolder.add(pawn.position, 'y', -deskBorderValue, deskBorderValue)
// pawnFolder.add(pawn.position, 'z', -deskBorderValue, deskBorderValue)
// pawnFolder.add(pawn.rotation, 'y', -Math.PI, Math.PI)


// const emotion = scene.getObjectByName('Skumjas')
// const emotionFolder = gui.addFolder('Skumjas')

// //@ts-ignore
// emotionFolder.add(emotion.position, 'x', -deskBorderValue, deskBorderValue)
// //@ts-ignore
// emotionFolder.add(emotion.position, 'y', -deskBorderValue, deskBorderValue)
// //@ts-ignore
// emotionFolder.add(emotion.position, 'z', -deskBorderValue, deskBorderValue)
// //@ts-ignore
// emotionFolder.add(emotion.scale, 'x', 1, 3)
// //@ts-ignore
// emotionFolder.add(emotion.scale, 'y', 1, 3)
// //@ts-ignore
// emotionFolder.add(emotion.scale, 'z', 1, 5)


// const emotionsFolder = gui.addFolder('EMOCIJAS')
// gui.close()
// let pawnGroup = new THREE.Object3D;
// pawnGroup.add(pawn);
// pawnGroup.add(annotationLabel)
// scene.add(pawnGroup)


// import { GUI, GUIController } from 'dat.gui';
// import { Fireworks } from 'fireworks-js'
// const gui = new GUI()
// const cameraFolder = gui.addFolder('SKATS')
// cameraFolder.add(camera.rotation, 'x', 0, Math.PI)
// cameraFolder.add(camera.rotation, 'y', 0, Math.PI)
// cameraFolder.add(camera.rotation, 'z', 0, Math.PI)

// cameraFolder.add(camera.position, 'x', -deskBorderValue, deskBorderValue)
// cameraFolder.add(camera.position, 'z', -deskBorderValue, deskBorderValue)
// cameraFolder.add(camera.position, 'y', 0, 20)
// cameraFolder.open()

    // if(event.object.name === 'Head') {
    //     event.object.position.y = 1.5;
    //     event.object.parent.updateMatrixWorld();
    // } else {
    //     event.object.position.z = 2;
    // }

        // console.log(orbitControls.minPolarAngle)
    // console.log(orbitControls.maxPolarAngle)

    // orbitControls.minPolarAngle = 0;
    // orbitControls.maxPolarAngle = Math.PI;
            //Math.PI and 0
        // orbitControls.minPolarAngle = Math.PI / 3;
        // orbitControls.maxPolarAngle = Math.PI * 0.1;
        // $('.close-button.close-bottom').css('display', 'block')

    // console.log(camera.rotation, camera.position)
    // orbitControls.minPolarAngle = Math.PI / 2;
    // orbitControls.maxPolarAngle = Math.PI / 2;

            // $('.close-button.close-bottom').css('display', 'none')
            // import { ArrowHelper, Object3D, Scene } from 'three'

// controls.addEventListener('dragstart', function (event) {
//     orbitControls.enabled = false;

//     dragObjectYPosition =
//         event.object.parent.name === 'ES' ? pawn.position.y : event.object.position.y;
// });
// controls.addEventListener('drag', function (event) {
//     if (
//         event.object.position.y > dragObjectYPosition ||
//         event.object.position.y < dragObjectYPosition
//     ) {
//         event.object.position.y = dragObjectYPosition;
//     }

//     if (event.object.parent.name === 'ES') {
//         arrowHelper.position.x = event.object.position.x;
//         arrowHelper.position.z = event.object.position.z;
//     }
// });
// controls.addEventListener('dragend', function (event) {
//     orbitControls.enabled = true;
// });
        // // obj = scene.getObjectByName()
        // if(selectedItem){
        //     selectedItem.material.color.setHex(0xffffff)
        // }

        // selectedItem = item;

        // //@ts-ignore
        // item.material.color.setHex(Math.random() * 0xffffff)

        // const gridHelper = new THREE.GridHelper(24, 22)
// gridHelper.position.y = 0.501
// scene.add(gridHelper)
// scene.add(new THREE.AxesHelper(500))

// $('#desk-intro .container div.desk-canvas').append(renderer.domElement);

// const pDragControls = new DragControls(objects, pCamera, renderer.domElement)
    // pDragControls

