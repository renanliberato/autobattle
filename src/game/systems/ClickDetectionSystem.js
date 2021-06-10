import { System } from '../../ecs/System.js';

export class ClickDetectionSystem extends System {
    constructor() {
        super('ClickDetectionSystem');
    }

    queryCommand(command) {
        return !!entity.components.Click;
    }

    query(entity) {
        return !!entity.components.ClickHandler;
    }

    run(time, dt) {
        Object.values(this.commands).forEach(click => {
            Object.values(this.entities).forEach(b => {
                if (click.components.Position.x >= Math.floor(b.components.Position.x) && click.components.Position.x <= b.components.Size.x - 1 + Math.floor(b.components.Position.x) && click.components.Position.y >= Math.floor(b.components.Position.y) && click.components.Position.y <= b.components.Size.y - 1 + Math.floor(b.components.Position.y)) {
                    (b.components.ClickHandler.handler)();
                }
            });
        });
    }
}
