import { Entity } from '../../ecs/Entity';
import { Rendering } from '../components/Rendering';
import { ThreeDRendering } from '../components/ThreeDRendering';
import { threeDModels, UNITSIZE } from '../../config';
import { ThreeDRelativeToCameraRotation } from '../components/ThreeDRelativeToCameraRotation';

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
