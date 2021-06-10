import { Component } from '../../ecs/Component.js';

export class DestroyAt extends Component {
    getDefaultProperties() {
        return {
            time: 0,
        };
    }
}