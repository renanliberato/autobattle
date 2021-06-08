import { Position } from '../components/Position';
import { Entity } from '../../ecs/Entity';
import { Rendering } from '../components/Rendering';
import { DestroyAt } from '../components/DestroyAt';
import { TextRendering } from '../components/TextRendering';

function positiveOrNegative() {
    return Math.random() >= 0.5 ? 1 : -1;
}

export class DamageText extends Entity {
    constructor(amount, x, y) {
        super({
            Position: new Position({
                x: x + 0.5 + Math.random() * 0.3 * positiveOrNegative(),
                y: y + 0.2 + Math.random() * 0.1 * positiveOrNegative()
            }),
            Rendering: new Rendering({}),
            TextRendering: new TextRendering({
                text: amount,
                color: 'white',
                size: 3.5
            }),
            DestroyAt: new DestroyAt({
                time: window.gameTime + 400
            })
        });
    }
}
