import { Entity } from '../../ecs/Entity';
import { Rendering } from '../components/Rendering';
import { ThreeDRendering } from '../components/ThreeDRendering';
import { threeDModels } from '../../config';

export class InventoryTile extends Entity {
  constructor(x, z) {
    super({
      Rendering: new Rendering({}),
      ThreeDRendering: new ThreeDRendering({
        model: threeDModels.tileinventory,
      })
    });

    this.components.ThreeDPosition.x = x;
    this.components.ThreeDPosition.z = z;
  }
}
