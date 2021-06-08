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
    new PolygonRenderingSystem(gameCanvasContext, UNITSIZE),
    new ImageRenderingSystem(gameCanvasContext, UNITSIZE),
    new TextRenderingSystem(gameCanvasContext, UNITSIZE),
]));

state.addOnPropertyChanged(() => updateUI());

for (var y = 0; y <= YSIZE; y++) {
    for (var x = 0; x <= XSIZE; x++) {
        world.addEntity(new GrassTile(x, y));
    }
}

world.addEntity(new Button(2, 9.25, () => {
    window.location.href = '/battle.html';
}, 'img-button-large-background', 3, 2));

world.addEntity(new Text(3.5, 10.3, 'PLAY', 9, 'black', 'bold'));

function updateUI() {
}

updateUI();