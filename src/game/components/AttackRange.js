import { Component } from '../../ecs/Component';

export class AttackRange extends Component {
    getDefaultProperties() {
        return {
            rangeY: 1,
            rangeX: 0,
            hasEnemyWithinRange: false,
        };
    }
}
