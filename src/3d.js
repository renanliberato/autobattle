const canvas = document.getElementById('game-canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

Zfont.init(Zdog);

let myFont = new Zdog.Font({
    src: require('./fonts/PressStart2P-Regular.ttf')
});

// create illo
let illo = new Zdog.Illustration({
    // set canvas with selector
    element: '#game-canvas',
    dragRotate: true,
    rotate: {
        x: -0.2,
        y: 5,
    },
    zoom: 7,
});

let scenarioAnchor = new Zdog.Anchor({
    addTo: illo,
    translate: {
        z: -20
    }
    // options
});

var xLength = 6;
var zLength = 10;

[...Array(xLength).keys()].forEach(x => {
    [...Array(zLength).keys()].forEach(z => {
        createGrassModel(x, z);
    });
});

function createGrassModel(x, z) {
    return new Zdog.Box({
        addTo: scenarioAnchor,
        width: 10,
        height: 1,
        depth: 10,
        translate: {
            x: (x) * 10 + (x) * 2,
            z: (z) * 10 + (z) * 2
        },
        color: '#54842a',
    });
}

// var particles = 


function animate() {
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}

animate();