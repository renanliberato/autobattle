import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


var swordModel;

function loadModelAsync(path) {
    return new Promise((resolve, reject) => {
        loader.load(path, function (gltf) {
            // gltf.scene.scale.set(0.2, 0.2, 0.2);
            resolve(gltf.scene);
        }, undefined, function (err) {
            reject(err);
        });
    })
}

const tileSize = 8;

async function initialize() {
    const tileModel = await loadModelAsync(require('./3dmodels/tile.glb'));
    const swordModel = await loadModelAsync(require('./3dmodels/sword.glb'));
    const bowModel = await loadModelAsync(require('./3dmodels/bow.glb'));

    // camera.rotation.x = -0.9;
    // camera.rotation.y = -0.2;

    var xLength = 6;
    var zLength = 10;

    [...Array(xLength).keys()].forEach(x => {
        [...Array(zLength).keys()].forEach(z => {
            const clone = tileModel.clone();
            clone.position.set(x * tileSize, 0, z * tileSize);
            scene.add(clone);
        });
    });

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
    }

    animate();
}

initialize();