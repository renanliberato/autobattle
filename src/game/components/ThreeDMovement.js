import { Component } from '../../ecs/Component';

export class ThreeDMovement extends Component {
  getDefaultProperties() {
    return {
      dx: 0,
      dy: 0,
      dz: 0,
    };
  }
}
