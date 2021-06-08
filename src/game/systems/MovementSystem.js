import { System } from '../../ecs/System';
import PF from 'pathfinding';

function getDistance(x1, y1, x2, y2) {
  let y = x2 - x1;
  let x = y2 - y1;

  return Math.sqrt(x * x + y * y);
}

export class MovementSystem extends System {
  constructor(maxX, maxY) {
    super('MovementSystem', 1000);
    this.maxX = maxX;
    this.maxY = maxY;
  }

  query(entity) {
    return !!entity.components.Position && !!entity.components.Movement;
  }

  run(time, dt) {
    var positionMatrix = [...Array(this.maxY).keys()]
      .map(y =>
        [...Array(this.maxX).keys()]
          .map(x =>
            undefined));

    Object.keys(this.entities).forEach(k => {
      positionMatrix[this.entities[k].components.Position.y][this.entities[k].components.Position.x] = this.entities[k];
    });

    Object.keys(this.entities).forEach(k => {
      const entity = this.entities[k];

      const enemies = Object
        .values(this.entities)
        .filter(e => e.components.TeamMember.team != entity.components.TeamMember.team)
        .map(e => ({
          e: e,
          d: getDistance(
            entity.components.Position.x,
            entity.components.Position.y,
            e.components.Position.x,
            e.components.Position.y,
          )
        }));

      enemies.sort((a, b) => a.d - b.d);
      const nearestEnemy = enemies[0];

      if (nearestEnemy == undefined)
        return;

      var grid = new PF.Grid(positionMatrix.map(row => row.map(e => e === undefined || e === entity || e === nearestEnemy.e ? 0 : 1)));
      var finder = new PF.AStarFinder();
      var path = finder.findPath(
        entity.components.Position.x,
        entity.components.Position.y,
        nearestEnemy.e.components.Position.x,
        nearestEnemy.e.components.Position.y,
        grid);

      if (path !== undefined && path[1] !== undefined && (path[1][0] != nearestEnemy.e.components.Position.x || path[1][1] != nearestEnemy.e.components.Position.y)) {
        entity.components.Position.x = path[1][0];
        entity.components.Position.y = path[1][1];
      }
    });
  }
}