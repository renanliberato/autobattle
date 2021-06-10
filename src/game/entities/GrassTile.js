import { Entity } from '../../ecs/Entity.js';
import { Rendering } from '../components/Rendering.js';
import { ThreeDRendering } from '../components/ThreeDRendering.js';
import { threeDModels } from '../../config.js';

export class GrassTile extends Entity {
  constructor(x, z) {
    super({
      Rendering: new Rendering({}),
      ThreeDRendering: new ThreeDRendering({
        // model: createGrassModel,
        model: threeDModels.tile,
        // isStatic: true
      })
    });

    this.components.ThreeDPosition.x = x;
    this.components.ThreeDPosition.z = z;
  }

  update(delta) {

  }
}
