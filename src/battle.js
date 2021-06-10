import { UNITSIZE, XSIZE, YSIZE } from "./config.js";
import { ArcherUnit } from "./game/entities/ArcherUnit.js";
import { GrassTile } from "./game/entities/GrassTile.js";
import { MeleeUnit } from "./game/entities/MeleeUnit.js";
import { ThreeDAttackRangeSystem } from "./game/systems/ThreeDAttackRangeSystem.js";
import { MatchStepSystem } from "./game/systems/MatchStepSystem.js";
import { ThreeDAttackSystem } from "./game/systems/ThreeDAttackSystem.js";
import { DelayedObjectDestructionSystem } from "./game/systems/DelayedObjectDestructionSystem.js";
import { ThreeDUnitMovementSystem } from "./game/systems/ThreeDUnitMovementSystem.js";
import { ObjectDestructionSystem } from "./game/systems/ObjectDestructionSystem.js";
import { getGame } from "./getgame.js";
import { ThreeDVelocityAndAccelerationMovementSystem } from "./game/systems/ThreeDVelocityAndAccelerationMovementSystem.js";
import { Cloud } from "./game/entities/Cloud.js";
import { ThreeJSThreeDRelativeToCameraRotationSystem } from "./game/systems/ThreeJSThreeDRelativeToCameraRotationSystem.js";
import { ThreeJSThreeDRenderingSystem } from "./game/systems/ThreeJSThreeDRenderingSystem.js";
import { Tower } from "./game/entities/Tower.js";
import { ThreeDRelativePositionSystem } from "./game/systems/ThreeDRelativePositionSystem.js";
import { ThreeDUnitHealthBarSizingSystem } from "./game/systems/ThreeDUnitHealthBarSizingSystem.js";
import { MageUnit } from "./game/entities/MageUnit.js";
import { TankUnit } from "./game/entities/TankUnit.js";
import { RogueUnit } from "./game/entities/RogueUnit.js";

import lala from './globals.js';

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

    // enemies
    world.addEntity(new RogueUnit(1, 1, 'a'));
    world.addEntity(new TankUnit(5, 1, 'a'));
    world.addEntity(new MeleeUnit(2, 0, 'a'));
    world.addEntity(new ArcherUnit(4, 0, 'a'));
    world.addEntity(new RogueUnit(5, 1, 'a'));
    world.addEntity(new MeleeUnit(2, 1, 'a'));
    world.addEntity(new MageUnit(4, 1, 'a'));

    world.addEntity(new TankUnit(1, YSIZE - 2, 'b'));
    world.addEntity(new TankUnit(5, YSIZE - 2, 'b'));
    world.addEntity(new TankUnit(2, YSIZE - 1, 'b'));
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