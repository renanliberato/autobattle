import { Component } from '../../ecs/Component.js';

export class ThreeDMovement extends Component {
  getDefaultProperties() {
    return {
      dx: 0,
      dy: 0,
      dz: 0,
    };
  }
}
