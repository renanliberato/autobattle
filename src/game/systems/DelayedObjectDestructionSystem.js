import { System } from '../../ecs/System';

export class DelayedObjectDestructionSystem extends System {
    constructor() {
        super('DelayedObjectDestructionSystem');
    }

    query(entity) {
        return !!entity.components.DestroyAt;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            if (time >= this.entities[k].components.DestroyAt.time)
                this.world.removeEntity(this.entities[k]);
        });
    }
}
