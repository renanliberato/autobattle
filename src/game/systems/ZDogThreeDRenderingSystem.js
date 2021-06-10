import { System } from '../../ecs/System.js';

export class ZDogThreeDRenderingSystem extends System {
    constructor(scene, renderingUnit) {
        super('ZDogThreeDRenderingSystem');
        this.scene = scene;
        this.renderingUnit = renderingUnit;
    }

    query(entity) {
        return !!entity.components.ThreeDRendering;
    }

    remove(entity) {
        super.remove(entity);

        if (entity.components.ThreeDRendering.object !== null && entity.components.ThreeDRendering.object !== undefined) {
            entity.components.ThreeDRendering.object.remove();
            entity.components.ThreeDRendering.object = null;
        }
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            if (this.entities[k].components.ThreeDRendering.object === null) {
                const modelResult = this.entities[k].components.ThreeDRendering.model(this.scene, this.entities[k].components.ThreeDPosition.x, this.entities[k].components.ThreeDPosition.z);
                this.entities[k].components.ThreeDRendering.object = modelResult.object;
                this.entities[k].components.ThreeDRendering.components = modelResult.components;
            }

            if (this.entities[k].components.ThreeDRendering.isStatic) {
                return;
            }

            this.entities[k].components.ThreeDRendering.object.translate.x = this.entities[k].components.ThreeDPosition.x * this.renderingUnit;
            this.entities[k].components.ThreeDRendering.object.translate.y = this.entities[k].components.ThreeDPosition.y * this.renderingUnit;
            this.entities[k].components.ThreeDRendering.object.translate.z = this.entities[k].components.ThreeDPosition.z * this.renderingUnit;
            this.entities[k].components.ThreeDRendering.object.rotate.x = this.entities[k].components.ThreeDRotation.x * Zdog.TAU;
            this.entities[k].components.ThreeDRendering.object.rotate.y = this.entities[k].components.ThreeDRotation.y * Zdog.TAU;
            this.entities[k].components.ThreeDRendering.object.rotate.z = this.entities[k].components.ThreeDRotation.z * Zdog.TAU;
        });
    }
}
