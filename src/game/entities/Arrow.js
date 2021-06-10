import { threeDModels, UNITSIZE } from '../../config.js';
import { Entity } from '../../ecs/Entity.js';
import { getAngleToPoint } from '../../helpers.js';
import { DestroyAt } from '../components/DestroyAt.js';
import { Rendering } from '../components/Rendering.js';
import { ThreeDAcceleration } from '../components/ThreeDAcceleration.js';
import { ThreeDRendering } from '../components/ThreeDRendering.js';
import { ThreeDVelocity } from '../components/ThreeDVelocity.js';

export class Arrow extends Entity {
    constructor(x, z, tx, tz, speed) {
        super({
            Rendering: new Rendering({}),
            ThreeDRendering: new ThreeDRendering({
                model: threeDModels.arrow,
            }),
            ThreeDVelocity: new ThreeDVelocity({
                x: (tx - x) / (60 * speed / 1000),
                z: (tz - z) / (60 * speed / 1000),
            }),
            ThreeDAcceleration: new ThreeDAcceleration(),
            DestroyAt: new DestroyAt({
                time: window.gameTime + speed
            })
        });

        this.components.ThreeDPosition.x = x;
        this.components.ThreeDPosition.y = 0.5 * UNITSIZE;
        this.components.ThreeDPosition.z = z;

        this.components.ThreeDRotation.isStatic = true;
    }
}

