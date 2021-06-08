import { System } from '../../ecs/System';
import PF from 'pathfinding';
import anime from 'animejs';
import { UNITSIZE } from '../../config';

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var getAngle = function (currX, currZ, endX, endZ) {
  var angle = Math.atan2(endZ - currZ, endX - currX);

  return angle;
};

function getDistance(x1, y1, x2, y2) {
  let y = x2 - x1;
  let x = y2 - y1;

  return Math.sqrt(x * x + y * y);
}

export class ThreeDUnitMovementSystem extends System {
  constructor(maxX, maxZ) {
    super('ThreeDUnitMovementSystem', 100);
    this.maxX = maxX;
    this.maxZ = maxZ;
  }

  query(entity) {
    return !!entity.components.TeamMember;
  }

  run(time, dt) {
    var positionMatrix = [...Array(this.maxZ).keys()]
      .map(y =>
        [...Array(this.maxX).keys()]
          .map(x =>
            undefined));

    Object.keys(this.entities).forEach(k => {
      positionMatrix[this.entities[k].components.GridPosition.z][this.entities[k].components.GridPosition.x] = this.entities[k];
    });

    Object.keys(this.entities).forEach(k => {
      const entity = this.entities[k];

      if (entity.components.UnitKind.kind === 'tower')
        return;

      if (entity.components.ThreeDAttackRange.hasEnemyWithinRange)
        return;

      if (entity.components.Stats.nextMoveTime > window.gameTime)
        return;

      entity.components.Stats.nextMoveTime = window.gameTime + entity.components.Stats.moveCd;

      const enemies = Object
        .values(this.entities)
        .filter(e => e.components.TeamMember.team != entity.components.TeamMember.team)
        .map(e => ({
          e: e,
          d: getDistance(
            entity.components.GridPosition.x,
            entity.components.GridPosition.z,
            e.components.GridPosition.x,
            e.components.GridPosition.z,
          )
        }));

      enemies.sort((a, b) => a.d - b.d);
      const nearestEnemy = enemies[0];

      if (nearestEnemy == undefined)
        return;

      var grid = new PF.Grid(positionMatrix.map(row => row.map(e => e === undefined || e === entity || e === nearestEnemy.e ? 0 : 1)));
      var finder = new PF.AStarFinder();
      var path = finder.findPath(
        entity.components.GridPosition.x,
        entity.components.GridPosition.z,
        nearestEnemy.e.components.GridPosition.x,
        nearestEnemy.e.components.GridPosition.z,
        grid);

      if (path !== undefined && path[1] !== undefined && (path[1][0] != nearestEnemy.e.components.GridPosition.x || path[1][1] != nearestEnemy.e.components.GridPosition.z)) {
        positionMatrix[entity.components.GridPosition.z][entity.components.GridPosition.x] = undefined;
        positionMatrix[path[1][1]][path[1][0]] = entity;
        const angleToCoordinate = getAngle(
          entity.components.GridPosition.x,
          entity.components.GridPosition.z,
          path[1][0],
          path[1][1],
        ) * 180 / Math.PI;

        entity.components.GridPosition.x = path[1][0];
        entity.components.GridPosition.z = path[1][1];

        entity.components.ThreeDRendering.runAnimation('moveToTile');

        // anime({
        //   targets: entity.components.ThreeDRendering.components.chestAnchor.rotate,
        //   y: angleToCoordinate.map(-180, 180, -Zdog.TAU / 2, Zdog.TAU / 2) + (entity.components.TeamMember.team == 'a' ? -Zdog.TAU / 4 : Zdog.TAU / 4),
        //   easing: 'linear',
        //   duration: this.world.stepsInterval / 2
        // });
        anime({
          targets: entity.components.ThreeDPosition,
          x: path[1][0] * UNITSIZE,
          z: path[1][1] * UNITSIZE,
          y: [
            { value: entity.components.ThreeDPosition.y - 0.2 },
            { value: entity.components.ThreeDPosition.y },
          ],
          duration: this.world.stepsInterval / 3,
          easing: 'linear',
        });
      }
    });
  }
}