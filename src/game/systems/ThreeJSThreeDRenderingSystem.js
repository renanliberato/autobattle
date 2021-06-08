import { System } from '../../ecs/System';

export class ThreeJSThreeDRenderingSystem extends System {
    constructor(scene) {
        super('ThreeJSThreeDRenderingSystem');
        this.scene = scene;
    }

    query(entity) {
        return !!entity.components.ThreeDRendering;
    }

    add(entity) {
        super.add(entity);

        this.world.scene.add(entity.components.ThreeDRendering.object);
    }

    remove(entity) {
        super.remove(entity);

        if (entity.components.ThreeDRendering.object !== null && entity.components.ThreeDRendering.object !== undefined) {
            this.world.scene.remove(entity.components.ThreeDRendering.object);
            entity.components.ThreeDRendering.object = null;
        }
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            // if (this.entities[k].components.ThreeDRendering.object === null) {
            //     const model = this.entities[k].components.ThreeDRendering.model.clone();
            //     this.entities[k].components.ThreeDRendering.object = model;
            //     // this.entities[k].components.ThreeDRendering.components = modelResult.components;
            // }

            if (this.entities[k].components.ThreeDRendering.isStatic) {
                return;
            }

            this.entities[k].components.ThreeDRendering.object.position.set(
                this.entities[k].components.ThreeDPosition.x,
                this.entities[k].components.ThreeDPosition.y,
                this.entities[k].components.ThreeDPosition.z
            );

            if (this.entities[k].components.ThreeDRotation.isStatic) {
                return;
            }

            this.entities[k].components.ThreeDRendering.object.rotation.set(
                (this.entities[k].components.ThreeDRotation.x + this.entities[k].components.ThreeDRotation.xOffset) * Math.PI * 2,
                (this.entities[k].components.ThreeDRotation.y + this.entities[k].components.ThreeDRotation.yOffset) * Math.PI * 2,
                (this.entities[k].components.ThreeDRotation.z + this.entities[k].components.ThreeDRotation.zOffset) * Math.PI * 2
            );
        });
    }
}
