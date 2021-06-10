import { Component } from '../../ecs/Component.js';

export class TeamMember extends Component {
  getDefaultProperties() {
    return {
      team: 'none'
    };
  }
}
