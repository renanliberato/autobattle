import { System } from '../../ecs/System.js';

export class ObjectDestructionSystem extends System {
    constructor() {
        super('ObjectDestructionSystem');
    }

    query(entity) {
        return !!entity.components.Health;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            if (this.entities[k].components.Health.current <= 0)
                this.world.removeEntity(this.entities[k]);
        });
    }
}

