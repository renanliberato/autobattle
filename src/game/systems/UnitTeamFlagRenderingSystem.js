import { System } from '../../ecs/System';

export class UnitTeamFlagRenderingSystem extends System {
    constructor(context, renderingUnit) {
        super('UnitTeamFlagRenderingSystem');
        this.context = context;
        this.renderingUnit = renderingUnit;
    }

    query(entity) {
        return !!entity.components.Position && !!entity.components.TeamMember;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            const height = 0.2 * this.renderingUnit;
            const width = 0.2 * this.renderingUnit;

            const x1 = (this.entities[k].components.Position.x + 0.5) * this.renderingUnit - width / 2;
            const y1 = this.entities[k].components.Position.y * this.renderingUnit + (this.renderingUnit * 3 / 4) - height;

            this.context.beginPath();
            this.context.rect(x1, y1, width, height);
            this.context.closePath();
            this.context.fillStyle = '#3d504e';
            this.context.strokeStyle = '#3d504e';
            this.context.lineWidth = 0.05;
            this.context.stroke();
            this.context.fill();

            this.context.fillStyle = 'white';
            this.context.font = `1.5px \"Press Start 2P\"`;

            this.context.fillText(this.entities[k].components.TeamMember.team, x1 + width / 2, y1 + height);
        });
    }
}
