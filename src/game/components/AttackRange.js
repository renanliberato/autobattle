import { Component } from '../../ecs/Component.js';

export class AttackRange extends Component {
    getDefaultProperties() {
        return {
            rangeY: 1,
            rangeX: 0,
            hasEnemyWithinRange: false,
        };
    }
}
