export class World {
  constructor(systems) {
    this.entities = {};
    this.systems = systems;
    this.systems.forEach(system => {
      system.world = this;
    });
    this.entityIdsToRemove = new Set();
    this.commands = {};
    this.stepsInterval = 590;
  }

  addEntity(entity) {
    this.entities[entity.id] = entity;
    this.systems.forEach((system) => {
      system.add(entity);
    });
  }

  removeEntity(entity) {
    entity.children.forEach(c => this.entityIdsToRemove.add(c));

    this.entityIdsToRemove.add(entity.id);
  }

  addCommand(command) {
    this.systems.forEach((system) => {
      system.addCommand(command);
    });
  }

  runSystems(time, dt) {
    // const commandIds = Object.keys(this.commands);
    // commandIds.forEach(id => {
    //   this.addEntity(this.commands[id]);
    // });

    this.systems.forEach((system) => {
      system.runSystem(time, dt);
    });

    this.entityIdsToRemove.forEach(id => {
      this.systems.forEach((system) => {
        if (system.query(this.entities[id]))
          system.remove(this.entities[id]);
      });

      delete this.entities[id];
      this.entityIdsToRemove.delete(id);
    });

    // commandIds.forEach(id => {
    //   this.systems.forEach((system) => {
    //     if (system.query(this.commands[id]))
    //       system.remove(this.commands[id]);
    //   });

    //   delete this.commands[id];
    // });
  }
}
