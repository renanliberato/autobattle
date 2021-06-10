import { Component } from '../../ecs/Component.js';

export class Position extends Component {
  getDefaultProperties() {
    return {
      x: 0,
      y: 0
    };
  }
}
