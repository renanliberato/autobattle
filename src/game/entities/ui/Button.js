import { Position } from '../../components/Position.js';
import { Entity } from '../../../ecs/Entity.js';
import { Rendering } from '../../components/Rendering.js';
import { ImageRendering } from '../../components/ImageRendering.js';
import { Size } from '../../components/Size.js';
import { ClickHandler } from '../../components/ClickHandler.js';

export class Button extends Entity {
  constructor(x, y, handler, background, sizeX, sizeY) {
    super({
      Position: new Position({
        x: x,
        y: y
      }),
      Size: new Size({
        x: sizeX !== undefined ? sizeX : 1,
        y: sizeY !== undefined ? sizeY : 1
      }),
      ClickHandler: new ClickHandler({
        handler: handler
      }),
      Rendering: new Rendering({}),
      ImageRendering: new ImageRendering({
        sprite: background !== undefined ? background : 'img-button-background'
      }),
    });
  }
}