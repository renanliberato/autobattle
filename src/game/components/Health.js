import { Component } from '../../ecs/Component.js';

export class Health extends Component {
  getDefaultProperties() {
    return {
      max: 1,
      current: 1
    };
  }
}
