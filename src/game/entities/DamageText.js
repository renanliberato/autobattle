import { Position } from '../components/Position.js';
import { Entity } from '../../ecs/Entity.js';
import { Rendering } from '../components/Rendering.js';
import { DestroyAt } from '../components/DestroyAt.js';
import { TextRendering } from '../components/TextRendering.js';

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
