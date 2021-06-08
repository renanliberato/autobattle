import { threeDModels, UNITSIZE } from '../../config';
import { Entity } from '../../ecs/Entity';
import { getAngleToPoint } from '../../helpers';
import { DestroyAt } from '../components/DestroyAt';
import { Rendering } from '../components/Rendering';
import { ThreeDAcceleration } from '../components/ThreeDAcceleration';
import { ThreeDRendering } from '../components/ThreeDRendering';
import { ThreeDVelocity } from '../components/ThreeDVelocity';

export class Arrow extends Entity {
    constructor(x, z, tx, tz, speed) {
        super({
            Rendering: new Rendering({}),
            ThreeDRendering: new ThreeDRendering({
                model: threeDModels.arrow,
                // isStatic: true
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
function createArrowModel(scenarioAnchor, x, z) {
    const arrowAnchor = new Zdog.Anchor({
        addTo: scenarioAnchor,
    });

    const arrowBody = new Zdog.Box({
        addTo: arrowAnchor,
        width: 0.1,
        height: 0.1,
        depth: 2,
        color: '#ffffff',
    });

    return {
        object: arrowAnchor
    };
}
