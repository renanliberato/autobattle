import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/gltfloader';
import { threeDModels } from './config';

const loader = new GLTFLoader();
export function loadModelAsync(path) {
    return new Promise((resolve, reject) => {
        loader.load(path, function (gltf) {
            resolve(gltf.scene);
        }, undefined, function (err) {
            reject(err);
        });
    })
}

export async function loadGameModels() {
    threeDModels.healthbar = new THREE.Group();
    const healthbarModel = await loadModelAsync(require('./3dmodels/healthbar.glb'));
    healthbarModel.scale.set(0.5, 0.3, 0.5);
    threeDModels.healthbar.add(healthbarModel);

    threeDModels.tile = await loadModelAsync(require('./3dmodels/tile.glb'));

    threeDModels.sword = new THREE.Group();
    threeDModels.sword.add(await loadModelAsync(require('./3dmodels/sword.glb')));
    threeDModels.sword.children[0].scale.set(0.5, 0.5, 0.5);
    threeDModels.sword.children[0].rotation.y = 0.25 * (Math.PI * 2);

    threeDModels.dagger = new THREE.Group();
    threeDModels.dagger.add(await loadModelAsync(require('./3dmodels/dagger.glb')));
    threeDModels.dagger.children[0].scale.set(0.5, 0.5, 0.5);
    threeDModels.dagger.children[0].rotation.y = 0.25 * (Math.PI * 2);

    threeDModels.scepter = new THREE.Group();
    threeDModels.scepter.add(await loadModelAsync(require('./3dmodels/scepter.glb')));
    threeDModels.scepter.children[0].scale.set(0.5, 0.5, 0.5);
    threeDModels.scepter.children[0].rotation.y = 0.25 * (Math.PI * 2);

    threeDModels.orbred = new THREE.Group();
    threeDModels.orbred.add(await loadModelAsync(require('./3dmodels/orbred.glb')));
    threeDModels.orbred.children[0].scale.set(0.15, 0.15, 0.15);

    threeDModels.bow = new THREE.Group();
    threeDModels.bow.add(await loadModelAsync(require('./3dmodels/bow.glb')));
    threeDModels.bow.children[0].scale.set(0.5, 0.5, 0.5);
    threeDModels.bow.children[0].rotation.y = -0.25 * Math.PI * 2;

    threeDModels.shield = new THREE.Group();
    threeDModels.shield.add(await loadModelAsync(require('./3dmodels/shield.glb')));
    threeDModels.shield.children[0].scale.set(0.5, 0.5, 0.5);
    threeDModels.shield.children[0].rotation.y = -0.25 * Math.PI * 2;

    threeDModels.tower = await loadModelAsync(require('./3dmodels/tower.glb'));
    threeDModels.tower.scale.set(0.5, 0.5, 0.5);

    threeDModels.cloud = await loadModelAsync(require('./3dmodels/cloud.glb'));

    threeDModels.arrow = new THREE.Group();
    threeDModels.arrow.add(await loadModelAsync(require('./3dmodels/arrow.glb')));
    threeDModels.arrow.children[0].scale.set(0.25, 0.25, 0.25);
    threeDModels.arrow.children[0].rotation.x = 0.25 * Math.PI * 2;

    threeDModels.tileinventory = new THREE.Group();
    threeDModels.tileinventory.add(await loadModelAsync(require('./3dmodels/tileinventory.glb')));
}
