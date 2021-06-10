import { Position } from '../../components/Position.js';
import { Entity } from '../../../ecs/Entity.js';
import { Rendering } from '../../components/Rendering.js';
import { TextRendering } from '../../components/TextRendering.js';

export class Text extends Entity {
    constructor(x, y, text, size, color, bold) {
        super({
            Position: new Position({
                x: x,
                y: y
            }),
            Rendering: new Rendering({}),
            TextRendering: new TextRendering({
                text: text,
                color: color,
                size: size,
                bold: bold
            }),
        });
    }
}
