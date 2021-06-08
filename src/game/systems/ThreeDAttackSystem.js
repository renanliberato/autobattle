import { System } from '../../ecs/System';
import { ArcherAttackLine } from '../entities/ArcherAttackLine';
import { ArcherUnitDamageIndicator } from '../entities/ArcherUnitDamageIndicator';
import { ThreeDDamageText } from '../entities/ThreeDDamageText';
import { MeleeUnitDamageIndicator } from '../entities/MeleeUnitDamageIndicator';
import anime from 'animejs';
import { DamageParticle } from '../entities/DamageParticle';
import { Arrow } from '../entities/Arrow';

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

                const amount = Math.floor(entity.components.Stats.attack * (100 / (100 + enemy.components.Stats.defense)));

                if (enemy !== undefined) {
                    if (entity.components.UnitKind.kind == 'warrior') {
                        console.log('will animate warrior');
                    }
                    if (entity.components.UnitKind.kind == 'archer') {
                        const arrow = new Arrow(
                            entity.components.ThreeDPosition.x,
                            entity.components.ThreeDPosition.z,
                            enemy.components.ThreeDPosition.x,
                            enemy.components.ThreeDPosition.z,
                            entity.components.Stats.attackCd * 0.8
                        );
                        arrow.components.ThreeDRendering.object.position.set(
                            arrow.components.ThreeDPosition.x,
                            arrow.components.ThreeDPosition.y,
                            arrow.components.ThreeDPosition.z,
                        );
                        arrow.components.ThreeDRendering.object.lookAt(
                            enemy.components.ThreeDPosition.x,
                            enemy.components.ThreeDPosition.y,
                            enemy.components.ThreeDPosition.z,
                        );

                        this.world.addEntity(arrow);
                    }

                    entity.components.ThreeDRendering.runAnimation('attack', {
                    });

                    setTimeout(() => {
                        enemy.components.Health.current -= amount;

                        this.world.addEntity(new ThreeDDamageText(enemy.components.ThreeDPosition.x, -1, enemy.components.ThreeDPosition.z, amount));
                    }, entity.components.Stats.attackCd * 0.8);
                }
            }
        });
    }
}


