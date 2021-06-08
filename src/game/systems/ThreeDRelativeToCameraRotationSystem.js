import { System } from '../../ecs/System';

export class ThreeDRelativeToCameraRotationSystem extends System {
    constructor() {
        super('ThreeDRelativeToCameraRotationSystem');
    }

    query(entity) {
        return !!entity.components.ThreeDRotation && !!entity.components.ThreeDRelativeToCameraRotation;
    }

    run(time, dt) {
        const cameraAngleX = this.world.camera.rotation.x.map(0, Math.PI * 2, 0, 1);
        const cameraAngleY = this.world.camera.rotation.y.map(0, Math.PI * 2, 0, 1);
        const cameraAngleZ = this.world.camera.rotation.z.map(0, Math.PI * 2, 0, 1);

        Object.keys(this.entities).forEach(k => {
            this.entities[k].components.ThreeDRotation.x = -cameraAngleX + this.entities[k].components.ThreeDRelativeToCameraRotation.x;
            this.entities[k].components.ThreeDRotation.y = -cameraAngleY + this.entities[k].components.ThreeDRelativeToCameraRotation.y;
            this.entities[k].components.ThreeDRotation.z = -cameraAngleZ + this.entities[k].components.ThreeDRelativeToCameraRotation.z;
        });
    }
}
