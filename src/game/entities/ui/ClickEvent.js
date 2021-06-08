import { Position } from '../../components/Position';
import { Entity } from '../../../ecs/Entity';
import { Click } from '../../components/Click';

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
