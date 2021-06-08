import { Component } from '../../ecs/Component';

export class ThreeDPosition extends Component {
  getDefaultProperties() {
    return {
      x: 0,
      y: 0,
      z: 0,
    };
  }
}
