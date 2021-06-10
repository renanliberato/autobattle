import { Position } from '../../components/Position.js';
import { Entity } from '../../../ecs/Entity.js';
import { Rendering } from '../../components/Rendering.js';
import { ImageRendering } from '../../components/ImageRendering.js';
import { Size } from '../../components/Size.js';

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
