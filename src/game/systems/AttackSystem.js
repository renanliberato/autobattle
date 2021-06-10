import { System } from '../../ecs/System.js';
import { ArcherAttackLine } from '../entities/ArcherAttackLine.js';
import { ArcherUnitDamageIndicator } from '../entities/ArcherUnitDamageIndicator.js';
import { DamageText } from '../entities/DamageText.js';
import { MeleeUnitDamageIndicator } from '../entities/MeleeUnitDamageIndicator.js';

export class AttackSystem extends System {
    constructor() {
        super('AttackSystem', 1000);
    }

    query(entity) {
        return !!entity.components.Position && !!entity.components.Movement && !!entity.components.Health && !!entity.components.Stats & !!entity.components.AttackRange;
    }

    run(time, dt) {
        Object.keys(this.entities).forEach(k => {
            const entity = this.entities[k];

            if (entity.components.Health.current <= 0)
                return;

            if (entity.components.AttackRange.hasEnemyWithinRange) {
                const enemy = this.entities[entity.components.AttackRange.hasEnemyWithinRange];

                const amount = Math.floor(entity.components.Stats.attack * (100 / (100 + enemy.components.Stats.defense)));

                if (enemy !== undefined) {
                    if (entity.components.UnitKind.kind == 'archer') {
                        this.world.addEntity(new ArcherAttackLine(
                            entity.components.Position.x,
                            entity.components.Position.y,
                            enemy.components.Position.x,
                            enemy.components.Position.y,
                        ));
                    }

                    setTimeout(() => {
                        enemy.components.Health.current -= amount;
                        switch (enemy.components.UnitKind.kind) {
                            case 'warrior':
                                this.world.addEntity(new MeleeUnitDamageIndicator(enemy.components.Position.x, enemy.components.Position.y, enemy.components.TeamMember.team));
                                break;
                            case 'archer':
                                this.world.addEntity(new ArcherUnitDamageIndicator(enemy.components.Position.x, enemy.components.Position.y, enemy.components.TeamMember.team));
                                break;
                        }

                        this.world.addEntity(new DamageText(amount, enemy.components.Position.x, enemy.components.Position.y));
                    }, 200);
                }
            }
        });
    }
}


