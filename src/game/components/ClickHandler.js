import { Component } from '../../ecs/Component.js';

export class ClickHandler extends Component {
    getDefaultProperties() {
        return {
            handler: () => {}
        };
    }
}


