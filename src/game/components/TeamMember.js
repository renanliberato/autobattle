import { Component } from '../../ecs/Component';

export class TeamMember extends Component {
  getDefaultProperties() {
    return {
      team: 'none'
    };
  }
}
