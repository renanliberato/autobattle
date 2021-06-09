import { Entity } from '../../ecs/Entity';
import { Health } from '../components/Health';
import { Stats } from '../components/Stats';
import { ThreeDAttackRange } from '../components/ThreeDAttackRange';
import { TeamMember } from '../components/TeamMember';
import { Rendering } from '../components/Rendering';
import { UnitKind } from '../components/UnitKind';
import { ThreeDRendering } from '../components/ThreeDRendering';
import { GridPosition } from '../components/GridPosition';
import { threeDModels, UNITSIZE } from '../../config';
import { HealthBar } from './HealthBar';
import anime from 'animejs';
import { ThreeDDamageText } from './ThreeDDamageText';

export class RogueUnit extends Entity {
    constructor(x, z, team) {
        super({
            UnitKind: new UnitKind({
                kind: 'rogue'
            }),
            TeamMember: new TeamMember({
                team: team
            }),
            Health: new Health({
                max: 200,
                current: 200,
            }),
            Stats: new Stats({
                attack: 70,
                defense: 7,
                moveCd: window.stepsInterval,
                attackCd: window.stepsInterval / 3,
            }),
            ThreeDAttackRange: new ThreeDAttackRange({
                rangeZ: 1,
                rangeX: 1,
            }),
            Rendering: new Rendering({}),
            ThreeDRendering: new ThreeDRendering({
                model: threeDModels.dagger,
                animations: {
                    moveToTile: () => {
                        anime({
                            targets: this.components.ThreeDRendering.object.children[0].position,
                            y: [
                                { value: 3, duration: window.stepsInterval * 0.4 },
                                { value: 0, duration: window.stepsInterval * 0.4 },
                            ],
                        });
                    },
                    attack: () => {
                        anime({
                            loop: false,
                            targets: this.components.ThreeDRendering.object.children[0].position,
                            z: [
                                { value: -3, duration: this.components.Stats.attackCd * 0.2 },
                                { value: 3, duration: this.components.Stats.attackCd * 0.3 },
                                { value: 0, duration: this.components.Stats.attackCd * 0.2 },
                            ],
                        });
                        anime({
                            loop: false,
                            targets: this.components.ThreeDRendering.object.children[0].rotation,
                            x: [
                                { value: -Math.PI / 4, duration: this.components.Stats.attackCd * 0.2 },
                                { value: Math.PI / 2, duration: this.components.Stats.attackCd * 0.3 },
                                { value: 0, duration: this.components.Stats.attackCd * 0.3 },
                            ],
                        });
                    },
                    specialattack: () => {
                        // anime({
                        //     loop: false,
                        //     targets: this.components.ThreeDRendering.object.children[0].position,
                        //     z: [
                        //         {value: -3, duration: this.components.Stats.attackCd * 0.2},
                        //         {value: 3, duration: this.components.Stats.attackCd * 0.3},
                        //         {value: 0, duration: this.components.Stats.attackCd * 0.2},
                        //     ],
                        // });
                        anime({
                            loop: false,
                            targets: this.components.ThreeDRendering.object.children[0].rotation,
                            y: [
                                { value: this.components.ThreeDRendering.object.children[0].rotation.y + Math.PI / 2, duration: this.components.Stats.attackCd * 0.2 },
                                { value: this.components.ThreeDRendering.object.children[0].rotation.y, delay: this.components.Stats.attackCd * 0.5, duration: this.components.Stats.attackCd * 0.2 },
                            ],
                            x: [
                                { value: this.components.ThreeDRendering.object.children[0].rotation.x + Math.PI / 2, duration: this.components.Stats.attackCd * 0.2 },
                                { value: this.components.ThreeDRendering.object.children[0].rotation.x, delay: this.components.Stats.attackCd * 0.5, duration: this.components.Stats.attackCd * 0.2 },
                            ],
                            z: [
                                { value: this.components.ThreeDRendering.object.children[0].rotation.z + Math.PI * 2, duration: this.components.Stats.attackCd * 0.7, delay: this.components.Stats.attackCd * 0.2 },
                            ],
                        });
                    }
                }
            }),
            GridPosition: new GridPosition({
                x: x,
                z: z
            })
        });

        this.components.ThreeDPosition.x = x * UNITSIZE;
        this.components.ThreeDPosition.y = UNITSIZE;
        this.components.ThreeDPosition.z = z * UNITSIZE;

        this.components.ThreeDRotation.y = team == 'a' ? 0 : 0.5;

        this.addChild(new HealthBar(this.id));
    }

    attack(enemy) {
        const amount = Math.floor(this.components.Stats.attack * (100 / (100 + enemy.components.Stats.defense)));

        if (Math.random() <= this.components.Stats.specialAttackChance) {
            this.specialAttack(amount);
            return;
        }

        this.components.ThreeDRendering.runAnimation('attack', {});

        setTimeout(() => {
            enemy.components.Health.current -= amount;

            this.addEntity(new ThreeDDamageText(enemy.components.ThreeDPosition.x, -1, enemy.components.ThreeDPosition.z, amount));
        }, this.components.Stats.attackCd * 0.8);
    }

    specialAttack(amount) {
        this
            .queryEntities(e => !!e.components.TeamMember
                && e.components.TeamMember.team != this.components.TeamMember.team
                && Math.abs(this.components.GridPosition.x - e.components.GridPosition.x) <= this.components.ThreeDAttackRange.rangeX
                && Math.abs(this.components.GridPosition.z - e.components.GridPosition.z) <= this.components.ThreeDAttackRange.rangeZ
            )
            .forEach(e => {
                setTimeout(() => {
                    e.components.Health.current -= amount;

                    this.addEntity(new ThreeDDamageText(e.components.ThreeDPosition.x, -1, e.components.ThreeDPosition.z, amount));
                }, this.components.Stats.attackCd * 0.8);
            });
        this.components.ThreeDRendering.runAnimation('specialattack', {});
    }
}
