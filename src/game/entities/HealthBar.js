import { Entity } from '../../ecs/Entity.js';
import { Rendering } from '../components/Rendering.js';
import { ThreeDRendering } from '../components/ThreeDRendering.js';
import { threeDModels, UNITSIZE } from '../../config.js';
import { ThreeDRelativeToCameraRotation } from '../components/ThreeDRelativeToCameraRotation.js';

export class HealthBar extends Entity {
  constructor(ownerId, additionalOffset = 0) {
    super({
      Rendering: new Rendering({}),
      HealthBarFor: ownerId,
      ThreeDRendering: new ThreeDRendering({
        model: threeDModels.healthbar,
      }),
      ThreeDRelativePosition: {
        owner: ownerId,
        x: 0,
        y: UNITSIZE * (0.9 + additionalOffset),
        z: 0
      }
    });
  }
}
