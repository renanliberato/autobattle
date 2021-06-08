import { SCALE, UNITSIZE, XSIZE, YSIZE } from './config';
import { World } from './ecs/World';
import { ArcherUnit } from './game/entities/ArcherUnit';
import { GrassTile } from './game/entities/GrassTile';
import { MeleeUnit } from './game/entities/MeleeUnit';
import { Button } from './game/entities/ui/Button';
import { ClickEvent } from './game/entities/ui/ClickEvent';
import { Image } from './game/entities/ui/Image';
import { Text } from './game/entities/ui/Text';
import { GlobalState } from './game/models/GlobalState';
import { ArmyEditorUnitGridDetectionSystem } from './game/systems/ArmyEditorUnitGridDetectionSystem';
import { ClickDetectionSystem } from './game/systems/ClickDetectionSystem';
import { ImageRenderingSystem } from './game/systems/ImageRenderingSystem';
import { PolygonRenderingSystem } from './game/systems/PolygonRenderingSystem';
import { TextRenderingSystem } from './game/systems/TextRenderingSystem';
import { getGame } from './getgame';

const { gameCanvas, state, world, gameCanvasContext } = getGame(({gameCanvasContext, state}) => ([
    new ClickDetectionSystem(),
    new ArmyEditorUnitGridDetectionSystem(XSIZE, YSIZE, state.units),
    new PolygonRenderingSystem(gameCanvasContext, UNITSIZE),
    new ImageRenderingSystem(gameCanvasContext, UNITSIZE),
    new TextRenderingSystem(gameCanvasContext, UNITSIZE),
]));

window.selectedKind = 'warrior';

;state.addOnPropertyChanged((prop) => {
    updateUI();
});


for (var y = 0; y < YSIZE; y++) {
    for (var x = 0; x < XSIZE; x++) {
        world.addEntity(new GrassTile(x, y));
    }
}

state.army.army.forEach(u => {
    switch (u.kind) {
        case 'warrior':
            world.addEntity(new MeleeUnit(u.x, u.y, 'b'));
            break;
        case 'archer':
            world.addEntity(new ArcherUnit(u.x, u.y, 'b'));
            break;
    }
});

world.addEntity(new Button(6, 0, () => {
    window.selectedKind = 'warrior';
}, 'img-button-unit-background'));

world.addEntity(new Image(6, 0, 'img-warrior'));

const warriorQtdText = new Text(6.2, 0.3, 0, 3, 'black', 'bold');
world.addEntity(warriorQtdText);

world.addEntity(new Button(6, 1, () => {
    window.selectedKind = 'archer';
}, 'img-button-unit-background'));

world.addEntity(new Image(6, 1, 'img-archer'));

const archerQtdText = new Text(6.2, 1.3, 0, 3, 'black', 'bold');
world.addEntity(archerQtdText);

world.addEntity(new Button(6, 2, () => {
    state.army.army = Object
        .values(world.entities)
        .filter(e => !!e.components.UnitKind)
        .map(e => ({
            kind: e.components.UnitKind.kind,
            x: e.components.Position.x,
            y: e.components.Position.y,
        }));

    state.save();
    document.location.href = '/index.html';
}, 'img-button-background'));
world.addEntity(new Text(6.5, 2.6, 'Save', 2.5, 'black', 'bold'));

world.addEntity(new Button(6, 3, () => {
    Object.values(world.entities).filter(e => !!e.components.UnitKind).forEach(e => world.removeEntity(e));
    state.units.warrior = 5;
    state.units.archer = 5;
}, 'img-button-background'));
world.addEntity(new Text(6.5, 3.6, 'Clear', 2.2, 'black', 'bold'));

function updateUI() {
    warriorQtdText.components.TextRendering.text = state.units.warrior;
    archerQtdText.components.TextRendering.text = state.units.archer;
}

updateUI();