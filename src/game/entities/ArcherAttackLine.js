import { Position } from '../components/Position.js';
import { Entity } from '../../ecs/Entity.js';
import { Rendering } from '../components/Rendering.js';
import { DestroyAt } from '../components/DestroyAt.js';
import { LineRendering } from '../components/LineRendering.js';

export class ArcherAttackLine extends Entity {
    constructor(x, y, x2, y2) {
        super({
            Position: new Position({
                x: x,
                y: y
            }),
            Rendering: new Rendering({}),
            LineRendering: new LineRendering({
                fillColor: 'white',
                strokeColor: 'black',
                strokeWidth: 0.5,
                decrease: false,
                from: {
                    x: x + 0.5,
                    y: y + 0.5
                },
                to: {
                    x: x2 + 0.5,
                    y: y2 + 0.5
                }
            }),
            DestroyAt: new DestroyAt({
                time: window.gameTime + 200
            })
        });
    }
}
