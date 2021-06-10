import { Entity } from '../../ecs/Entity.js';
import { Health } from '../components/Health.js';
import { Stats } from '../components/Stats.js';
import { ThreeDAttackRange } from '../components/ThreeDAttackRange.js';
import { TeamMember } from '../components/TeamMember.js';
import { Rendering } from '../components/Rendering.js';
import { ThreeDRendering } from '../components/ThreeDRendering.js';
import { UnitKind } from '../components/UnitKind.js';
import { GridPosition } from '../components/GridPosition.js';
import { threeDModels, UNITSIZE } from '../../config.js';
import { HealthBar } from './HealthBar.js';

export class Tower extends Entity {
    constructor(x, z, team) {
        super({
            UnitKind: new UnitKind({
                kind: 'tower'
            }),
            TeamMember: new TeamMember({
                team: team
            }),
            Health: new Health({
                max: 10000,
                current: 10000,
            }),
            Stats: new Stats({
                // attack: 200,
                defense: 100
            }),
            ThreeDAttackRange: new ThreeDAttackRange({
                rangeZ: 0,
                rangeX: 0,
            }),
            Rendering: new Rendering({}),
            ThreeDRendering: new ThreeDRendering({
                model: threeDModels.tower
            }),
            GridPosition: new GridPosition({
                x: x,
                z: z
            })
        });

        this.components.ThreeDPosition.x = x * UNITSIZE;
        this.components.ThreeDPosition.y = UNITSIZE * 1.4;
        this.components.ThreeDPosition.z = z * UNITSIZE;

        this.components.ThreeDRotation.y = team == 'a' ? 0 : 0.5;
        this.addChild(new HealthBar(this.id, 0.7));
    }
}
function createTowerModel(scenarioAnchor, x, z) {
    var anchor = new Zdog.Anchor({
        addTo: scenarioAnchor,
        translate: {
            x: x,
            y: 0,
            z: z,
        },
    });

    var pilar = new Zdog.Cylinder({
        addTo: anchor,
        diameter: 10,
        length: 20,
        stroke: true,
        color: '#5a3021',
        backface: '#5a3021',
        translate: {
            y: -11
        },
        rotate: {
            x: Zdog.TAU / 4
        }
    });

    return {
        object: anchor,
        // components: {
        // }
    };
}
