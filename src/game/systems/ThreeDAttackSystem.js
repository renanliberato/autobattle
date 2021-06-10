import { System } from '../../ecs/System.js';
import { ArcherAttackLine } from '../entities/ArcherAttackLine.js';
import { ArcherUnitDamageIndicator } from '../entities/ArcherUnitDamageIndicator.js';
import { ThreeDDamageText } from '../entities/ThreeDDamageText.js';
import { MeleeUnitDamageIndicator } from '../entities/MeleeUnitDamageIndicator.js';
import { DamageParticle } from '../entities/DamageParticle.js';
import { Arrow } from '../entities/Arrow.js';
import { OrbRed } from '../entities/OrbRed.js';

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


