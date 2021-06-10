import { Component } from '../../ecs/Component.js';

export class GridPosition extends Component {
  getDefaultProperties() {
    return {
      x: 0,
      z: 0,
    };
  }
}
