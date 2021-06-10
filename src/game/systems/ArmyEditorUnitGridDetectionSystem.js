import { System } from '../../ecs/System.js';
import { ArcherUnit } from '../entities/ArcherUnit.js';
import { MeleeUnit } from '../entities/MeleeUnit.js';

export class ArmyEditorUnitGridDetectionSystem extends System {
    constructor(xSize, ySize, availableUnits) {
        super('ArmyEditorUnitGridDetectionSystem');
        this.xSize = xSize;
        this.ySize = ySize;
        this.availableUnits = availableUnits;
    }

    query(entity) {
        return !!entity.components.UnitKind || (!!entity.components.Click && entity.components.Position.x < this.xSize && entity.components.Position.y < this.ySize);
    }

    run(time, dt) {
        const clicks = Object.keys(this.entities).filter(k => !!this.entities[k].components.Click).map(k => this.entities[k]);
        if (clicks.length == 0)
            return;

        const units = Object.keys(this.entities).filter(k => !!this.entities[k].components.UnitKind).map(k => this.entities[k]);
        var removedType = false;
        clicks.forEach(click => {
            units.forEach(unit => {
                if (click.components.Position.x == unit.components.Position.x && click.components.Position.y == unit.components.Position.y) {
                    this.world.removeEntity(unit);
                    this.availableUnits[unit.components.UnitKind.kind] = this.availableUnits[unit.components.UnitKind.kind] + 1;
                    removedType = unit.components.UnitKind.kind;
                }
            });

            if (removedType === window.selectedKind)
                return;

            if (this.availableUnits[window.selectedKind] == 0)
                return;

            switch (window.selectedKind) {
                case 'warrior':
                    if (this.availableUnits.warrior > 0)
                        this.world.addEntity(new MeleeUnit(click.components.Position.x, click.components.Position.y, 'b'));
                    break;
                case 'archer':
                    if (this.availableUnits.archer > 0)
                        this.world.addEntity(new ArcherUnit(click.components.Position.x, click.components.Position.y, 'b'));
                    break;
            }

            this.availableUnits[window.selectedKind] = this.availableUnits[window.selectedKind] - 1;
        });
    }
}
