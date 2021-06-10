import { Component } from '../../ecs/Component.js';

export class UnitKind extends Component {
  getDefaultProperties() {
    return {
      kind: '' // warrior, archer
    }
  }
}

