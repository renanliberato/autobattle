import { Entity } from '../../ecs/Entity.js';
import { Rendering } from '../components/Rendering.js';
import { ThreeDRendering } from '../components/ThreeDRendering.js';
import { getAngleToPoint } from '../../helpers.js';
import { threeDModels } from '../../config.js';

function positiveOrNegative() {
    return Math.random() >= 0.5 ? 1 : -1;
}

export class Cloud extends Entity {
    constructor(x, y, z) {
        super({
            Rendering: new Rendering({}),
            ThreeDRendering: new ThreeDRendering({
                model: threeDModels.cloud,
                // isStatic: true
            })
        });

        this.components.ThreeDPosition.x = x;
        this.components.ThreeDPosition.y = y;
        this.components.ThreeDPosition.z = z;
        // this.components.ThreeDRotation.y = getAngleToPoint(x, z, 3, 5).map(-180, 180, -0.5, 0.5) + 0.5;
    }
}
function createCloudModel(scenarioAnchor, x, z) {
    const cloudAnchor = new Zdog.Anchor({
        addTo: scenarioAnchor,
    });

    const circleOne = new Zdog.Shape({
        addTo: cloudAnchor,
        translate: {
            x: 0
        },
        stroke: 14,
        color: '#ffffff',
    });

    const circleTwo = new Zdog.Shape({
        addTo: cloudAnchor,
        translate: {
            x: 8,
            y: 1,
        },
        stroke: 10,
        color: '#ffffff',
    });

    const circleThree = new Zdog.Shape({
        addTo: cloudAnchor,
        translate: {
            x: -8,
            y: 4,
        },
        stroke: 8,
        color: '#ffffff',
    });

    return {
        object: cloudAnchor
    };
}
