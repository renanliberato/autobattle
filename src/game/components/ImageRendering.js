import { Component } from '../../ecs/Component.js';

export class ImageRendering extends Component {
    constructor(values) {
        super(values);

        if (values.sprite)
            this.spriteSrc = document.getElementById(values.sprite);
    }

    getDefaultProperties() {
        return {
            sprite: 'none.png',
            spriteSrc: undefined,
        };
    }
}
