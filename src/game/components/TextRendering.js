import { Component } from '../../ecs/Component';

export class TextRendering extends Component {
    getDefaultProperties() {
        return {
            text: '',
            size: 12,
            color: '',
            bold: false,
        };
    }
}
