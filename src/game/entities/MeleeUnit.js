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

export class MeleeUnit extends Entity {
    constructor(x, z, team) {
        super({
            UnitKind: new UnitKind({
                kind: 'warrior'
            }),
            TeamMember: new TeamMember({
                team: team
            }),
            Health: new Health({
                max: 400,
                current: 400,
            }),
            Stats: new Stats({
                attack: 100,
                defense: 10
            }),
            ThreeDAttackRange: new ThreeDAttackRange({
                rangeZ: 1,
                rangeX: 1,
            }),
            Rendering: new Rendering({
            }),
            ThreeDRendering: new ThreeDRendering({
                model: threeDModels.sword,
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
                                {value: -3, duration: this.components.Stats.attackCd * 0.2},
                                {value: 3, duration: this.components.Stats.attackCd * 0.3},
                                {value: 0, duration: this.components.Stats.attackCd * 0.2},
                            ],
                        });
                        anime({
                            loop: false,
                            targets: this.components.ThreeDRendering.object.children[0].rotation,
                            x: [
                                {value: -Math.PI / 4, duration: this.components.Stats.attackCd * 0.2},
                                {value: Math.PI / 2, duration: this.components.Stats.attackCd * 0.3},
                                {value: 0, duration: this.components.Stats.attackCd * 0.3},
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
}

function createWarriorModel(scenarioAnchor, x, z) {
    var anchor = new Zdog.Anchor({
        addTo: scenarioAnchor,
        translate: {
            x: x,
            y: -5,
            z: z,
        },
    });

    var chestAnchor = new Zdog.Box({
        addTo: anchor,
        translate: {
            x: 0,
            z: 0,
            y: -3
        },
        color: 'transparent'
    });
    var chest = new Zdog.Box({
        addTo: chestAnchor,
        width: 3,
        height: 6,
        depth: 1,
        color: '#3d504e',
    });

    var rightLeg = new Zdog.Box({
        addTo: chestAnchor,
        width: 0.5,
        height: 2,
        depth: 0.5,
        translate: {
            x: -1,
            z: 0,
            y: 5
        },
        color: '#3d504e',
    });

    var leftLeg = new Zdog.Box({
        addTo: chestAnchor,
        width: 0.5,
        height: 2,
        depth: 0.5,
        translate: {
            x: 1,
            z: 0,
            y: 5
        },
        color: '#3d504e',
    });

    var rightArm = new Zdog.Box({
        addTo: chest,
        width: 0.5,
        height: 3,
        depth: 0.5,
        translate: {
            x: -2.5,
            y: -1.5,
            // z: 1,
        },
        // rotate: {
        //     x: 1,
        // },
        color: '#3d504e',
    });

    var rightHand = new Zdog.Shape({
        addTo: rightArm,
        stroke: 2,
        translate: {
            y: 1.75,
        },
        color: '#cdb473',
    });

    var leftArm = new Zdog.Box({
        addTo: chest,
        width: 0.5,
        height: 3,
        depth: 0.5,
        translate: {
            x: 2.5,
            y: -1.5,
            // z: 1,
        },
        // rotate: {
        //     x: 1,
        // },
        color: '#3d504e',
    });

    var leftHand = new Zdog.Shape({
        addTo: leftArm,
        stroke: 2,
        translate: {
            y: 1.75,
        },
        color: '#cdb473',
    });

    var head = new Zdog.Hemisphere({
        addTo: chest,
        diameter: 3,
        // fill enabled by default
        // disable stroke for crisp edge
        stroke: true,
        color: '#cdb473',
        backface: '#cdb473',
        translate: {
            y: -5,
            z: 0.1,
        },
        rotate: {
            x: -1,
        },
    });

    let hat = new Zdog.Hemisphere({
        addTo: head,
        diameter: 4,
        // fill enabled by default
        // disable stroke for crisp edge
        stroke: true,
        color: '#3d504e',
        backface: '#3d504e',
        translate: {
            z: 0.1
        },
        rotate: {
            x: 3,
        }
    });

    var swordHandler = new Zdog.Box({
        addTo: rightHand,
        width: 0.25,
        height: 2,
        depth: 0.25,
        translate: {
            z: 1
        },
        rotate: {
            x: 2,
            y: 1.75
        },
        color: '#191919',
    });

    var swordCrossHandler = new Zdog.Box({
        addTo: swordHandler,
        width: 0.2,
        height: 2.5,
        depth: 0.2,
        translate: {
            y: 1.5,
        },
        rotate: {
            z: 1.75,
        },
        color: '#191919',
    });

    var swordBlade = new Zdog.Box({
        addTo: swordHandler,
        width: 0.1,
        height: 5,
        depth: 0.1,
        translate: {
            y: 5,
        },
        color: '#a2b4a8',
    });

    return {
        object: anchor,
        components: {
            chestAnchor,
            chest,
            hat,
            head,
            leftArm,
            rightArm,
            leftHand,
            rightHand,
            leftLeg,
            rightLeg,
            swordHandler,
            swordCrossHandler,
            swordBlade,
        }
    };
}
