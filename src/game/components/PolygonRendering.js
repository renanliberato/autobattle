import { Component } from '../../ecs/Component.js';

export class PolygonRendering extends Component {
    getDefaultProperties() {
        return {
            sides: 4,
            strokeWidth: 0.1,
            strokeColor: 'black',
            fillColor: 'white',
        };
    }
}