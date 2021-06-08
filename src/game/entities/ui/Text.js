import { Position } from '../../components/Position';
import { Entity } from '../../../ecs/Entity';
import { Rendering } from '../../components/Rendering';
import { TextRendering } from '../../components/TextRendering';

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
