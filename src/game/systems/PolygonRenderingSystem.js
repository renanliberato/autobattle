import { System } from '../../ecs/System';

export class PolygonRenderingSystem extends System {
    constructor(context, renderingUnit) {
        super('PolygonRenderingSystem');
        this.context = context;
        this.renderingUnit = renderingUnit;
    }

    query(entity) {
        return !!entity.components.Position && !!entity.components.PolygonRendering;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            drawPolygon(
                this.context,
                this.entities[k].components.Position.x * this.renderingUnit + (this.renderingUnit / 2),
                this.entities[k].components.Position.y * this.renderingUnit + (this.renderingUnit / 2),
                this.entities[k].components.PolygonRendering.sides,
                this.entities[k].components.Size.x * this.renderingUnit,
                this.entities[k].components.PolygonRendering.strokeWidth * this.renderingUnit,
                this.entities[k].components.PolygonRendering.strokeColor,
                this.entities[k].components.PolygonRendering.fillColor,
                this.entities[k].components.Rotation.angle);
        });
    }
}

export function drawPolygon(context, centerX, centerY, sideCount, size, strokeWidth, strokeColor, fillColor, rotationDegrees) {
    switch (sideCount) {
        case 3:
            rotationDegrees += 90 / 3
            break;
        case 2:
            rotationDegrees += 90;
            break;
        case 4:
            rotationDegrees += 45;
            break;
    }

    var radians = rotationDegrees * Math.PI / 180;
    context.translate(centerX, centerY);
    context.rotate(radians);
    context.beginPath();
    context.moveTo(size * Math.cos(0), size * Math.sin(0));
    for (var i = 1; i <= sideCount; i += 1) {
        context.lineTo(size * Math.cos(i * 2 * Math.PI / sideCount), size * Math.sin(i * 2 * Math.PI / sideCount));
    }
    context.closePath();
    context.fillStyle = fillColor;
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeWidth;
    context.stroke();
    context.fill();
    context.rotate(-radians);
    context.translate(-centerX, -centerY);
}