import { Component } from '../../ecs/Component';

export class LineRendering extends Component {
    getDefaultProperties() {
        return {
            fillColor: 'white',
            strokeColor: 'black',
            strokeWidth: 0.1,
            decrease: false,
            from: {
                x: 0,
                y: 0
            },
            to: {
                x: 0,
                y: 0
            }
        };
    }
}
