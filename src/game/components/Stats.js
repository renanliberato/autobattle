import { Component } from '../../ecs/Component';

export class Stats extends Component {
    getDefaultProperties() {
        return {
            attack: 1,
            defense: 0,
            moveCd: 1000,
            attackCd: 1000,
            nextMoveTime: (Math.random() * 1000),
            nextAttackTime: 0,
        };
    }
}