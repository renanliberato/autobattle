import { Position } from '../components/Position.js';
import { Entity } from '../../ecs/Entity.js';
import { Rendering } from '../components/Rendering.js';
import { ImageRendering } from '../components/ImageRendering.js';
import { DestroyAt } from '../components/DestroyAt.js';
import { Size } from '../components/Size.js';
import { PolygonRendering } from '../components/PolygonRendering.js';


export class ArcherUnitDamageIndicator extends Entity {
    constructor(x, y, team) {
        super({
            Position: new Position({
                x: x,
                y: y
            }),
            Rendering: new Rendering({}),
            Size: new Size({
                x: 0.4,
                y: 0.4,
            }),
            PolygonRendering: new PolygonRendering({
                sides: 3,
                strokeWidth: 0.1,
                strokeColor: 'black',
                fillColor: '#792426'
            }),
            DestroyAt: new DestroyAt({
                time: window.gameTime + 1000
            })
        });

        this.components.Rotation.angle = team == 'a' ? 180 : 0;
    }
}
