import { Component } from '../../ecs/Component';

export class ThreeDRendering extends Component {
    constructor(values) {
        super(values);

        if (this.model) {
            this.object = this.model.clone();
        }
    }
    getDefaultProperties() {
        return {
            model: null,
            object: null,
            animations: {}
        };
    }

    runAnimation(name, params) {
        if (!this.animations[name])
            return;

        (this.animations[name])(params);
    }
}