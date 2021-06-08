import { Component } from '../../ecs/Component';

export class UnitKind extends Component {
  getDefaultProperties() {
    return {
      kind: '' // warrior, archer
    }
  }
}

