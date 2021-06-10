import { System } from '../../ecs/System.js';

export class ThreeJSThreeDRelativeToCameraRotationSystem extends System {
    constructor() {
        super('ThreeJSThreeDRelativeToCameraRotationSystem');
    }

    query(entity) {
        return !!entity.components.ThreeDRendering && !!entity.components.ThreeDRelativeToCameraRotation;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            this.entities[k].components.ThreeDRendering.object.lookAt(this.world.camera.position);
        });
    }
}
