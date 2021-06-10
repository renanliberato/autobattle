import { Component } from '../../ecs/Component.js';

export class ThreeDTextSizing extends Component {
  getDefaultProperties() {
    return {
      fontSize: 0,
      dFontSize: 0
    };
  }
}
