import { Component } from '../../ecs/Component.js';

export class Rotation extends Component {
    getDefaultProperties() {
        return {
            angle: 0,
        };
    }
}
