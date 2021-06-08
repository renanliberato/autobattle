import { Component } from '../../ecs/Component';

export class DestroyAt extends Component {
    getDefaultProperties() {
        return {
            time: 0,
        };
    }
}