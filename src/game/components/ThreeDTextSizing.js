import { Component } from '../../ecs/Component';

export class ThreeDTextSizing extends Component {
  getDefaultProperties() {
    return {
      fontSize: 0,
      dFontSize: 0
    };
  }
}
