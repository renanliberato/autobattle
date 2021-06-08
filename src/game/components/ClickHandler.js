import { Component } from '../../ecs/Component';

export class ClickHandler extends Component {
    getDefaultProperties() {
        return {
            handler: () => {}
        };
    }
}


