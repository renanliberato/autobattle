import { System } from '../../ecs/System';

export class UnitHealthBarRenderingSystem extends System {
    constructor(context, renderingUnit) {
        super('UnitHealthBarRenderingSystem');
        this.context = context;
        this.renderingUnit = renderingUnit;
    }

    query(entity) {
        return !!entity.components.Position && !!entity.components.Health;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            const height = 0.2 * this.renderingUnit;
            const width = 0.8 * this.renderingUnit * (this.entities[k].components.Health.current / this.entities[k].components.Health.max);

            const x1 = this.entities[k].components.Position.x * this.renderingUnit + (this.renderingUnit / 2) - width / 2;
            const y1 = this.entities[k].components.Position.y * this.renderingUnit + (this.renderingUnit / 4) - height / 2;

            this.context.beginPath();
            this.context.rect(x1, y1, width, height);
            this.context.closePath();
            this.context.fillStyle = '#a04339';
            this.context.strokeStyle = '#421e1e';
            this.context.lineWidth = 0.05;
            this.context.stroke();
            this.context.fill();
        });
    }
}
