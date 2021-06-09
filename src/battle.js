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
import { MageUnit } from "./game/entities/MageUnit";
import { TankUnit } from "./game/entities/TankUnit";
import { RogueUnit } from "./game/entities/RogueUnit";

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

    // world.addEntity(new Tower(3, 0, 'a'));
    // world.addEntity(new Tower(3, YSIZE - 1, 'b'));

    // enemies
    world.addEntity(new RogueUnit(1, 1, 'a'));
    world.addEntity(new TankUnit(5, 1, 'a'));
    world.addEntity(new ArcherUnit(2, 0, 'a'));
    world.addEntity(new ArcherUnit(4, 0, 'a'));
    world.addEntity(new RogueUnit(5, 1, 'a'));
    world.addEntity(new MageUnit(2, 1, 'a'));
    world.addEntity(new MageUnit(4, 1, 'a'));

    world.addEntity(new TankUnit(1, YSIZE - 2, 'b'));
    world.addEntity(new TankUnit(5, YSIZE - 2, 'b'));
    world.addEntity(new TankUnit(2, YSIZE - 1, 'b'));
    world.addEntity(new TankUnit(4, YSIZE - 1, 'b'));

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