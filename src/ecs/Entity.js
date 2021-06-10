import { Rotation } from "../game/components/Rotation.js";
import { ThreeDPosition } from "../game/components/ThreeDPosition.js";
import { ThreeDRotation } from "../game/components/ThreeDRotation.js";

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export class Entity {
  constructor(components) {
    this.id = uuidv4();
    this.components = {};
    this.components.ThreeDPosition = new ThreeDPosition();
    this.components.ThreeDRotation = new ThreeDRotation();
    this.components.Rotation = new Rotation({
      angle: 0
    });
    this.children = [];
    
    Object.keys(components).forEach(c => {
      this.components[c] = components[c];
    });
  }

  addChild(entity) {
    this.children.push(entity.id);
    this.addEntity(entity);
  }

  addEntity(entity) {
    window.world.addEntity(entity);
  }

  queryEntities(query) {
    return Object.values(window.world.entities).filter(query);
  }

  update() {

  }
}
