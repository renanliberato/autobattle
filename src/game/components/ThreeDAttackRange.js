import { Component } from '../../ecs/Component.js';

export class ThreeDAttackRange extends Component {
    getDefaultProperties() {
        return {
            rangeX: 1,
            rangeY: 1,
            rangeZ: 1,
            hasEnemyWithinRange: false,
        };
    }
}
