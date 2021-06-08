import { UNITSIZE, XSIZE, YSIZE } from "./config";
import { ArcherUnit } from "./game/entities/ArcherUnit";
import { GrassTile } from "./game/entities/GrassTile";
import { MeleeUnit } from "./game/entities/MeleeUnit";
import { ThreeDAttackRangeSystem } from "./game/systems/ThreeDAttackRangeSystem";
import { MatchStepSystem } from "./game/systems/MatchStepSystem";
import { ThreeDAttackSystem } from "./game/systems/ThreeDAttackSystem";
import { DelayedObjectDestructionSystem } from "./game/systems/DelayedObjectDestructionSystem";
import { ThreeDUnitMovementSystem } from "./game/systems/ThreeDUnitMovementSystem";
import { ObjectDestructionSystem } from "./game/systems/ObjectDestructionSystem";
import { getGame } from "./getgame";
import { ThreeDVelocityAndAccelerationMovementSystem } from "./game/systems/ThreeDVelocityAndAccelerationMovementSystem";
import { Cloud } from "./game/entities/Cloud";
import { ThreeJSThreeDRelativeToCameraRotationSystem } from "./game/systems/ThreeJSThreeDRelativeToCameraRotationSystem";
import { ThreeJSThreeDRenderingSystem } from "./game/systems/ThreeJSThreeDRenderingSystem";
import { Tower } from "./game/entities/Tower";
import { ThreeDRelativePositionSystem } from "./game/systems/ThreeDRelativePositionSystem";
import { ThreeDUnitHealthBarSizingSystem } from "./game/systems/ThreeDUnitHealthBarSizingSystem";

require('./globals');

async function initialize() {
    const { state, world } = await getGame(({ scene }) => ([
        new MatchStepSystem(),
        new ThreeDVelocityAndAccelerationMovementSystem(),
        new ThreeDAttackRangeSystem(XSIZE, YSIZE),
        new ThreeDUnitMovementSystem(XSIZE, YSIZE),
        new ThreeDAttackSystem(),
        new ThreeDUnitHealthBarSizingSystem(),
        new ThreeDRelativePositionSystem(),
        new ThreeJSThreeDRelativeToCameraRotationSystem(),
        new ThreeJSThreeDRenderingSystem(scene),
        new ObjectDestructionSystem(),
        new DelayedObjectDestructionSystem(),
    ]));

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

    world.addEntity(new Tower(3, 0, 'a'));
    world.addEntity(new Tower(3, YSIZE - 1, 'b'));

    // enemies
    world.addEntity(new MeleeUnit(1, 1, 'a'));
    world.addEntity(new MeleeUnit(5, 1, 'a'));
    world.addEntity(new ArcherUnit(2, 0, 'a'));
    world.addEntity(new ArcherUnit(4, 0, 'a'));

    world.addEntity(new MeleeUnit(1, YSIZE - 2, 'b'));
    world.addEntity(new MeleeUnit(5, YSIZE - 2, 'b'));
    world.addEntity(new ArcherUnit(2, YSIZE - 1, 'b'));
    world.addEntity(new ArcherUnit(4, YSIZE - 1, 'b'));

    // state.army.army.forEach(u => {
    //     switch (u.kind) {
    //         case 'warrior':
    //             world.addEntity(new MeleeUnit(u.x, u.y, 'b'));
    //             break;
    //         case 'archer':
    //             world.addEntity(new ArcherUnit(u.x, u.y, 'b'));
    //             break;
    //     }
    // });
}

initialize();