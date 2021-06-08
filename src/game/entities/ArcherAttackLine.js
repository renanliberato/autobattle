import { Position } from '../components/Position';
import { Entity } from '../../ecs/Entity';
import { Rendering } from '../components/Rendering';
import { DestroyAt } from '../components/DestroyAt';
import { LineRendering } from '../components/LineRendering';

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
