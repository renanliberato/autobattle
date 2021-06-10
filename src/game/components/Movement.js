import { Component } from '../../ecs/Component.js';

export class Movement extends Component {
  getDefaultProperties() {
    return {
      dx: 0,
      dy: 0
    };
  }
}
