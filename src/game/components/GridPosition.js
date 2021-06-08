import { Component } from '../../ecs/Component';

export class GridPosition extends Component {
  getDefaultProperties() {
    return {
      x: 0,
      z: 0,
    };
  }
}
