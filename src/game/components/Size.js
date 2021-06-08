import { Component } from '../../ecs/Component';

export class Size extends Component {
    getDefaultProperties() {
        return {
            x: 0,
            y: 0,
        };
    }
}