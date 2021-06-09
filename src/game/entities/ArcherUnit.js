import { Position } from '../components/Position';
import { Entity } from '../../ecs/Entity';
import { Movement } from '../components/Movement';
import { Health } from '../components/Health';
import { Stats } from '../components/Stats';
import { ThreeDAttackRange } from '../components/ThreeDAttackRange';
import { TeamMember } from '../components/TeamMember';
import { Rendering } from '../components/Rendering';
import { UnitKind } from '../components/UnitKind';
import { Size } from '../components/Size';
import { PolygonRendering } from '../components/PolygonRendering';
import { ThreeDRendering } from '../components/ThreeDRendering';
import { GridPosition } from '../components/GridPosition';
import { threeDModels, UNITSIZE } from '../../config';
import { HealthBar } from './HealthBar';
import anime from 'animejs';
import { Arrow } from './Arrow';
import { ThreeDDamageText } from './ThreeDDamageText';

export class ArcherUnit extends Entity {
    constructor(x, z, team) {
        super({
            UnitKind: new UnitKind({
                kind: 'archer'
            }),
            Health: new Health({
                max: 200,
                current: 200,
            }),
            TeamMember: new TeamMember({
                team: team
            }),
            Stats: new Stats({
                attack: 50,
                defense: 5,
                attackCd: window.stepsInterval * 0.3
            }),
            ThreeDAttackRange: new ThreeDAttackRange({
                rangeZ: 3,
                rangeX: 1,
            }),
            Rendering: new Rendering({
            }),
            Size: new Size({
                x: 0.4,
                y: 0.4,
            }),
            ThreeDRendering: new ThreeDRendering({
                model: threeDModels.bow,
                animations: {
                    moveToTile: () => {
                        anime({
                            targets: this.components.ThreeDRendering.object.children[0].position,
                            y: [
                                {value: 3, duration: window.stepsInterval * 0.4},
                                {value: 0, duration: window.stepsInterval * 0.4},
                            ],
                        });
                    },
                    attack: () => {
                        anime({
                            loop: false,
                            targets: this.components.ThreeDRendering.object.children[0].position,
                            z: [
                                {value: -3, duration: this.components.Stats.attackCd * 0.1},
                                {value: 0, duration: this.components.Stats.attackCd * 0.7},
                            ],
                        });
                        // anime({
                        //     loop: false,
                        //     targets: this.components.ThreeDRendering.object.children[0].rotation,
                        //     x: [
                        //         {value: -Math.PI / 4, duration: this.components.Stats.attackCd * 0.2},
                        //         {value: Math.PI / 2, duration: this.components.Stats.attackCd * 0.3},
                        //         {value: 0, duration: this.components.Stats.attackCd * 0.3},
                        //     ],
                        // });
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
            this.components.ThreeDRendering.runAnimation('specialattack', {
            });
            return;
        }

        this.components.ThreeDRendering.runAnimation('attack', {
        });

        const arrow = new Arrow(
            this.components.ThreeDPosition.x,
            this.components.ThreeDPosition.z,
            enemy.components.ThreeDPosition.x,
            enemy.components.ThreeDPosition.z,
            this.components.Stats.attackCd * 0.8
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

        this.addEntity(arrow);

        setTimeout(() => {
            enemy.components.Health.current -= amount;

            this.addEntity(new ThreeDDamageText(enemy.components.ThreeDPosition.x, -1, enemy.components.ThreeDPosition.z, amount));
        }, this.components.Stats.attackCd * 0.8);
    }
}