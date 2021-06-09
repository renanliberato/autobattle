import { System } from '../../ecs/System';
import { ArcherAttackLine } from '../entities/ArcherAttackLine';
import { ArcherUnitDamageIndicator } from '../entities/ArcherUnitDamageIndicator';
import { ThreeDDamageText } from '../entities/ThreeDDamageText';
import { MeleeUnitDamageIndicator } from '../entities/MeleeUnitDamageIndicator';
import anime from 'animejs';
import { DamageParticle } from '../entities/DamageParticle';
import { Arrow } from '../entities/Arrow';
import { OrbRed } from '../entities/OrbRed';

export class ThreeDAttackSystem extends System {
    constructor() {
        super('ThreeDAttackSystem', 100);
    }

    query(entity) {
        return !!entity.components.Health && !!entity.components.Stats & !!entity.components.ThreeDAttackRange;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            const entity = this.entities[k];

            if (entity.components.Health.current <= 0)
                return;

            if (entity.components.Stats.nextAttackTime > window.gameTime)
                return;

            entity.components.Stats.nextAttackTime = window.gameTime + entity.components.Stats.attackCd;

            if (entity.components.ThreeDAttackRange.hasEnemyWithinRange) {
                const enemy = this.entities[entity.components.ThreeDAttackRange.hasEnemyWithinRange];

                if (!enemy)
                    return;

                if (enemy !== undefined) {
                    entity.attack(enemy);
                }
            }
        });
    }
}


