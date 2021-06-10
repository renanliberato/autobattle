import { System } from '../../ecs/System.js';

export class ThreeDUnitHealthBarSizingSystem extends System {
    constructor() {
        super('ThreeDUnitHealthBarSizingSystem');
    }

    query(entity) {
        return !!entity.components.HealthBarFor;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            const unit = this.world.entities[this.entities[k].components.HealthBarFor].components.Health;
            
            this.entities[k].components.ThreeDRendering.object.scale.x = unit.current / unit.max;
        });
    }
}
