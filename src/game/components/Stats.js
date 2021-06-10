import { Component } from '../../ecs/Component.js';

export class Stats extends Component {
    getDefaultProperties() {
        return {
            attack: 1,
            defense: 0,
            moveCd: window.stepsInterval * 2,
            attackCd: window.stepsInterval * 2,
            nextMoveTime: (Math.random() * window.stepsInterval * 2),
            nextAttackTime: 0,
            specialAttackChance: 0
        };
    }
}