import anime from 'animejs';
import { System } from '../../ecs/System';

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var getAngle = function (currX, currZ, endX, endZ) {
    var angle = Math.atan2(endZ - currZ, endX - currX);

    return angle;
};

export class ThreeDAttackRangeSystem extends System {
    constructor(maxX, maxZ) {
        super('ThreeDAttackRangeSystem', 500);
        this.maxX = maxX;
        this.maxZ = maxZ;
        this.lastRun = 0;
    }

    query(entity) {
        return !!entity.components.ThreeDAttackRange;
    }

    run(time, dt) {
        var positionMatrix = [...Array(this.maxZ).keys()]
            .map(y => [...Array(this.maxX).keys()]
                .map(x => undefined));

        Object.keys(this.entities).forEach(k => {
            const entity = this.entities[k];
            positionMatrix[entity.components.GridPosition.z][entity.components.GridPosition.x] = entity;
        });

        Object.keys(this.entities).forEach(k => {
            const entity = this.entities[k];

            if (entity.components.UnitKind.kind == 'tower')
                return;

            var wasUndefined = entity.components.ThreeDAttackRange.hasEnemyWithinRange === undefined;
            entity.components.ThreeDAttackRange.hasEnemyWithinRange = undefined;

            for (var rz = entity.components.ThreeDAttackRange.rangeZ * -1; rz <= entity.components.ThreeDAttackRange.rangeZ; rz++) {
                const nextY = entity.components.GridPosition.z + rz;

                if (positionMatrix[nextY] === undefined)
                    continue;

                for (var rx = entity.components.ThreeDAttackRange.rangeX * -1; rx <= entity.components.ThreeDAttackRange.rangeX; rx++) {
                    const nextX = entity.components.GridPosition.x + rx;
                    const possibleEnemy = positionMatrix[nextY][nextX];

                    if (possibleEnemy === undefined)
                        continue;

                    if (entity.components.TeamMember.team === possibleEnemy.components.TeamMember.team)
                        continue;

                    if (wasUndefined)
                        entity.components.Stats.nextAttackTime = window.gameTime + Math.random().map(0, 1, entity.components.Stats.attackCd * 0.5, entity.components.Stats.attackCd);

                    entity.components.ThreeDAttackRange.hasEnemyWithinRange = possibleEnemy.id;

                    // const angleToCoordinate = getAngle(
                    //     entity.components.GridPosition.x,
                    //     entity.components.GridPosition.z,
                    //     possibleEnemy.components.GridPosition.x,
                    //     possibleEnemy.components.GridPosition.z
                    // ) * 180 / Math.PI;

                    entity.components.ThreeDRendering.runAnimation('attack', {

                    });
                    // anime({
                    //     targets: entity.components.ThreeDRendering.components.chestAnchor.rotate,
                    //     y: angleToCoordinate.map(-180, 180, -Zdog.TAU / 2, Zdog.TAU / 2) + (entity.components.TeamMember.team == 'a' ? -Zdog.TAU / 4 : Zdog.TAU / 4),
                    //     easing: 'linear',
                    //     duration: this.world.stepsInterval / 2
                    // });

                    return;
                }
            }
        });
    }
}
