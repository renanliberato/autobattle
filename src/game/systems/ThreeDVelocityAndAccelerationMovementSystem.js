import { System } from '../../ecs/System';

export class ThreeDVelocityAndAccelerationMovementSystem extends System {
    constructor(context) {
        super('VelocityAndAccelerationMovementSystem');
    }

    query(entity) {
        return !!entity.components.ThreeDPosition && !!entity.components.ThreeDVelocity && !!entity.components.ThreeDAcceleration;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            const entity = this.entities[k];
            entity.components.ThreeDVelocity.x += entity.components.ThreeDAcceleration.x;
            entity.components.ThreeDVelocity.y += entity.components.ThreeDAcceleration.y;
            entity.components.ThreeDVelocity.z += entity.components.ThreeDAcceleration.z;

            entity.components.ThreeDPosition.x += entity.components.ThreeDVelocity.x;
            entity.components.ThreeDPosition.y += entity.components.ThreeDVelocity.y;
            entity.components.ThreeDPosition.z += entity.components.ThreeDVelocity.z;
        });
    }
}
