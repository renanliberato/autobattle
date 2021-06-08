import { World } from './ecs/World';
import { GlobalState } from './game/models/GlobalState';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, SCALE, threeDFonts, threeDModels, UNITSIZE } from './config';
import { ClickEvent } from './game/entities/ui/ClickEvent';
import { PolygonRenderingSystem } from './game/systems/PolygonRenderingSystem';
import { ClickDetectionSystem } from './game/systems/ClickDetectionSystem';
import { ImageRenderingSystem } from './game/systems/ImageRenderingSystem';
import { TextRenderingSystem } from './game/systems/TextRenderingSystem';

require('./game/OrbitControls');

export async function getGame(systems) {
    var state = new GlobalState();
    state.load();

    const gameCanvas = document.getElementById('game-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.set(
        3 * UNITSIZE,
        8 * UNITSIZE,
        -3 * UNITSIZE
    );

    camera.lookAt(3 * UNITSIZE, 0, 5 * UNITSIZE);

    const renderer = new THREE.WebGLRenderer({ canvas: gameCanvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x3698b6, 1);

    // const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.update();

    const light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

    const loader = new GLTFLoader();
    const fontLoader = new THREE.FontLoader();

    function loadModelAsync(path) {
        return new Promise((resolve, reject) => {
            loader.load(path, function (gltf) {
                resolve(gltf.scene);
            }, undefined, function (err) {
                reject(err);
            });
        })
    }

    function loadFontAsync(path) {
        return new Promise((resolve, reject) => {
            fontLoader.load(path, function (font) {
                resolve(font);
            }, undefined, function (err) {
                reject(err);
            });
        })
    }

    threeDModels.healthbar = new THREE.Group();
    const healthbarModel = await loadModelAsync(require('./3dmodels/healthbar.glb'));
    healthbarModel.scale.set(0.5, 0.3, 0.5);
    threeDModels.healthbar.add(healthbarModel);

    threeDModels.tile = await loadModelAsync(require('./3dmodels/tile.glb'));
    
    threeDModels.sword = new THREE.Group();
    threeDModels.sword.add(await loadModelAsync(require('./3dmodels/sword.glb')));
    threeDModels.sword.children[0].scale.set(0.5, 0.5, 0.5);
    threeDModels.sword.children[0].rotation.y = 0.25 * (Math.PI * 2);
    // threeDModels.sword.children[0].applyMatrix( new THREE.Matrix4().makeTranslation( 0, -3/2, 0 ) );

    threeDModels.bow = new THREE.Group();
    threeDModels.bow.add(await loadModelAsync(require('./3dmodels/bow.glb')));
    threeDModels.bow.children[0].scale.set(0.5, 0.5, 0.5);
    threeDModels.bow.children[0].rotation.y = -0.25 * Math.PI * 2;

    threeDModels.tower = await loadModelAsync(require('./3dmodels/tower.glb'));
    threeDModels.tower.scale.set(0.5, 0.5, 0.5);

    threeDModels.cloud = await loadModelAsync(require('./3dmodels/cloud.glb'));

    threeDModels.arrow = new THREE.Group();
    threeDModels.arrow.add(await loadModelAsync(require('./3dmodels/arrow.glb')));
    threeDModels.arrow.children[0].scale.set(0.25, 0.25, 0.25);
    threeDModels.arrow.children[0].rotation.x = 0.25 * Math.PI * 2;

    threeDFonts.default = await loadFontAsync(require('./fonts/PressStart2P_Regular.txt'));

    var world = new World(systems({ state, scene }));

    world.camera = camera;
    world.scene = scene;
    window.world = world;
    window.scene = scene;
    window.stepsInterval = world.stepsInterval;

    const scaledRenderingUnit = UNITSIZE * SCALE;

    function getCursorPosition(canvas, e) {
        var x;
        var y;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        }
        else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
        return { x: Math.floor(x / scaledRenderingUnit), y: Math.floor(y / scaledRenderingUnit) };
    }

    gameCanvas.addEventListener('click', (e) => {
        const position = getCursorPosition(gameCanvas, e);
        world.addCommand(new ClickEvent(position.x, position.y));
    });

    let lastTime = 0;
    let dt = 0;

    function update(time) {
        dt = time - lastTime;
        window.gameTime = time;

        world.runSystems(time, dt);

        // controls.update();
        
        renderer.render(scene, camera);

        window.requestAnimationFrame(update);
    }


    update(0);

    return { world, state, scene };
}