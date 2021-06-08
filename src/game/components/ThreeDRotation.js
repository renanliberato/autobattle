import { Component } from '../../ecs/Component';

export class ThreeDRotation extends Component {
    getDefaultProperties() {
        return {
            x: 0,
            y: 0,
            z: 0,
            xOffset: 0,
            yOffset: 0,
            zOffset: 0,
            isStatic: false
        };
    }
}
