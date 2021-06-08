import { Position } from '../../components/Position';
import { Entity } from '../../../ecs/Entity';
import { Rendering } from '../../components/Rendering';
import { ImageRendering } from '../../components/ImageRendering';
import { Size } from '../../components/Size';

export class Image extends Entity {
    constructor(x, y, image) {
        super({
            Position: new Position({
                x: x,
                y: y
            }),
            Size: new Size({
                x: 1,
                y: 1
            }),
            Rendering: new Rendering({}),
            ImageRendering: new ImageRendering({
                sprite: image
            }),
        });
    }
}
