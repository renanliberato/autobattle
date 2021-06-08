import { System } from '../../ecs/System';

export class ImageRenderingSystem extends System {
    constructor(context, renderingUnit) {
        super('ImageRenderingSystem');
        this.context = context;
        this.renderingUnit = renderingUnit;
    }

    query(entity) {
        return !!entity.components.Position && !!entity.components.ImageRendering;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            this.context.drawImage(this.entities[k].components.ImageRendering.spriteSrc, this.entities[k].components.Position.x * this.renderingUnit, this.entities[k].components.Position.y * this.renderingUnit);
        });
    }
}