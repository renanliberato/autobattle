import { System } from '../../ecs/System';


export class ThreeDRelativePositionSystem extends System {
    constructor() {
        super('ThreeDRelativePositionSystem');
    }

    query(entity) {
        return !!entity.components.ThreeDRelativePosition;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            const entity = this.entities[k];
            const parent = this.world.entities[entity.components.ThreeDRelativePosition.owner];

            if (!parent)
                return;

            entity.components.ThreeDPosition.x = parent.components.ThreeDPosition.x + entity.components.ThreeDRelativePosition.x;
            entity.components.ThreeDPosition.y = parent.components.ThreeDPosition.y + entity.components.ThreeDRelativePosition.y;
            entity.components.ThreeDPosition.z = parent.components.ThreeDPosition.z + entity.components.ThreeDRelativePosition.z;
        });
    }
}
