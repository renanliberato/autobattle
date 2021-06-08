import { System } from '../../ecs/System';

export class TextRenderingSystem extends System {
    constructor(context, renderingUnit) {
        super('TextRenderingSystem');
        this.context = context;
        this.renderingUnit = renderingUnit;
    }

    query(entity) {
        return !!entity.components.Position && !!entity.components.TextRendering;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            this.context.fillStyle = this.entities[k].components.TextRendering.color;
            const bold = this.entities[k].components.TextRendering.bold ? 'bold' : '';
            this.context.font = `${bold} ${this.entities[k].components.TextRendering.size}px \"Press Start 2P\"`;

            this.context.fillText(this.entities[k].components.TextRendering.text, this.entities[k].components.Position.x * this.renderingUnit, this.entities[k].components.Position.y * this.renderingUnit);
        });
    }
}