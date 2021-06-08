import { Position } from '../components/Position';
import { Entity } from '../../ecs/Entity';
import { Rendering } from '../components/Rendering';
import { ImageRendering } from '../components/ImageRendering';
import { DestroyAt } from '../components/DestroyAt';
import { Size } from '../components/Size';
import { PolygonRendering } from '../components/PolygonRendering';


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
