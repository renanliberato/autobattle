import { Component } from '../../ecs/Component';

export class Rendering extends Component {
    getDefaultProperties() {
        return {
            x: 0,
            y: 0,
        };
    }
}

