import { System } from '../../ecs/System';

export class AttackRangeSystem extends System {
    constructor(maxX, maxY) {
        super('AttackRangeSystem', 1000);
        this.maxX = maxX;
        this.maxY = maxY;
        this.lastRun = 0;
    }

    query(entity) {
        return !!entity.components.Position && !!entity.components.Movement && !!entity.components.Health && !!entity.components.Stats & !!entity.components.AttackRange;
    }

    run(time, dt) {
        var positionMatrix = [...Array(this.maxY).keys()]
            .map(y => [...Array(this.maxX).keys()]
                .map(x => undefined));

        Object.keys(this.entities).forEach(k => {
            const entity = this.entities[k];
            positionMatrix[entity.components.Position.y][entity.components.Position.x] = entity;
            entity.components.AttackRange.hasEnemyWithinRange = undefined;
        });

        Object.keys(this.entities).forEach(k => {
            const entity = this.entities[k];
            for (var ry = entity.components.AttackRange.rangeY * -1; ry <= entity.components.AttackRange.rangeY; ry++) {
                const nextY = entity.components.Position.y + ry;

                if (positionMatrix[nextY] === undefined)
                    continue;

                for (var rx = entity.components.AttackRange.rangeX * -1; rx <= entity.components.AttackRange.rangeX; rx++) {
                    const nextX = entity.components.Position.x + rx;
                    const possibleEnemy = positionMatrix[nextY][nextX];
    
                    if (possibleEnemy === undefined)
                        continue;
    
                    if (entity.components.TeamMember.team === possibleEnemy.components.TeamMember.team)
                        continue;
    
                    entity.components.AttackRange.hasEnemyWithinRange = possibleEnemy.id;
                    return;
                }
            }
        });
    }
}
