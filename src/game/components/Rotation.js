import { Component } from '../../ecs/Component';

export class Rotation extends Component {
    getDefaultProperties() {
        return {
            angle: 0,
        };
    }
}
