import { Position } from '../../components/Position.js';
import { Entity } from '../../../ecs/Entity.js';
import { Click } from '../../components/Click.js';

export class ClickEvent extends Entity {
    constructor(x, y) {
        super({
            Position: new Position({
                x: x,
                y: y
            }),
            Click: new Click(),
        });
    }
}
