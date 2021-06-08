import { Component } from '../../ecs/Component';

export class Position extends Component {
  getDefaultProperties() {
    return {
      x: 0,
      y: 0
    };
  }
}
