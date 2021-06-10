import { World } from './ecs/World.js';
import { GlobalState } from './game/models/GlobalState.js';

import { GLTFLoader } from '../libs/GLTFLoader.js';
import { threeDFonts, UNITSIZE, XSIZE, YSIZE } from './config.js';
import { GrassTile } from './game/entities/GrassTile.js';
import { Cloud } from './game/entities/Cloud.js';
import { loadGameModels } from './loadGameModels.js';

import { OrbitControls } from './game/OrbitControls.js';

var isPaused = false;
window.onkeydown = (e) => {
    if (e.key == "Escape") {
        isPaused = !isPaused;
    }
}

export async function getGame(systems) {
    var state = new GlobalState();
    state.load();

    const gameCanvas = document.getElementById('game-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.set(
        0,
        Math.max(XSIZE, YSIZE) * 0.66 * UNITSIZE,
        -YSIZE / 5 * UNITSIZE
    );

    camera.lookAt(
        Math.floor(XSIZE / 2) * UNITSIZE,
        0,
        Math.floor(YSIZE / 2) * UNITSIZE
    );

    const renderer = new THREE.WebGLRenderer({ canvas: gameCanvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x3698b6, 1);

    // const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.update();

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const fontLoader = new THREE.FontLoader();

    function loadFontAsync(path) {
        return new Promise((resolve, reject) => {
            fontLoader.load(path, function (font) {
                resolve(font);
            }, undefined, function (err) {
                reject(err);
            });
        })
    }

    await loadGameModels();
    // threeDModels.tileinventory.children[0].scale.set(0.25, 0.25, 0.25);
    // threeDModels.tileinventory.children[0].rotation.x = 0.25 * Math.PI * 2;

    threeDFonts.default = await loadFontAsync('./src/fonts/PressStart2P_Regular.txt');

    var world = new World(systems({ state, scene }));

    world.camera = camera;
    world.scene = scene;
    window.world = world;
    window.scene = scene;
    window.stepsInterval = world.stepsInterval;

    // const scaledRenderingUnit = UNITSIZE * SCALE;

    // function getCursorPosition(canvas, e) {
    //     var x;
    //     var y;
    //     if (e.pageX || e.pageY) {
    //         x = e.pageX;
    //         y = e.pageY;
    //     }
    //     else {
    //         x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    //         y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    //     }
    //     x -= canvas.offsetLeft;
    //     y -= canvas.offsetTop;
    //     return { x: Math.floor(x / scaledRenderingUnit), y: Math.floor(y / scaledRenderingUnit) };
    // }

    // gameCanvas.addEventListener('click', (e) => {
    //     const position = getCursorPosition(gameCanvas, e);
    //     world.addCommand(new ClickEvent(position.x, position.y));
    // });


    for (var y = 0; y < YSIZE; y++) {
        for (var x = 0; x < XSIZE; x++) {
            world.addEntity(new GrassTile(x * UNITSIZE, y * UNITSIZE));
        }
    }

    [...Array(100).keys()].forEach(_ => {
        world.addEntity(new Cloud(
            Math.random().map(0, 1, -32 * UNITSIZE, 43 * UNITSIZE),
            Math.random().map(0, 1, -4 * UNITSIZE, -8 * UNITSIZE),
            Math.random().map(0, 1, -12 * UNITSIZE, 50 * UNITSIZE)
        ));
    });


    let lastTime = 0;
    let dt = 0;

    var clock = new THREE.Clock();

    function update(time) {
        dt = time - lastTime;
        window.gameTime = time;

        if (isPaused) {
            window.requestAnimationFrame(update);
            return;
        }

        Object.keys(world.entities).forEach(k => {
            world.entities[k].update(clock.getDelta());
        });

        world.runSystems(time, dt);

        // controls.update();

        renderer.render(scene, camera);

        window.requestAnimationFrame(update);
    }


    update(0);

    return { world, state, scene };
}


