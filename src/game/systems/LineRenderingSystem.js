import { System } from '../../ecs/System.js';

function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

export class LineRenderingSystem extends System {
    constructor(context, renderingUnit) {
        super('LineRenderingSystem');
        this.context = context;
        this.renderingUnit = renderingUnit;
    }

    query(entity) {
        return !!entity.components.Position && !!entity.components.LineRendering;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            // this.entities[k].components.Position.x * this.renderingUnit + (this.renderingUnit/2),
            // this.entities[k].components.Position.y * this.renderingUnit + (this.renderingUnit/2),
            this.context.save();
            this.context.beginPath();
            this.context.moveTo(
                this.entities[k].components.LineRendering.from.x * this.renderingUnit,
                this.entities[k].components.LineRendering.from.y * this.renderingUnit
            );
            this.context.lineTo(
                this.entities[k].components.LineRendering.to.x * this.renderingUnit,
                this.entities[k].components.LineRendering.to.y * this.renderingUnit
            );
            this.context.fillStyle = this.entities[k].components.LineRendering.fillColor;
            this.context.strokeStyle = this.entities[k].components.LineRendering.strokeColor;
            this.context.lineWidth = this.entities[k].components.LineRendering.strokeWidth;
            this.context.fill();
            this.context.stroke();
            this.context.restore();

            if (this.entities[k].components.LineRendering.decrease)
                this.entities[k].components.LineRendering.strokeWidth = lerp(this.entities[k].components.LineRendering.strokeWidth, 0, 0.3);
        });
    }
}
