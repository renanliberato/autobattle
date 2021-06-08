export class System {
  constructor(name, interval) {
    this.entities = {};
    this.commands = {};
    this.name = name;
    this.world = undefined;
    this.interval = interval !== undefined ? interval : 0;
    this.nextRun = 0;
    this.isEnabled = true;
  }

  query(entity) {
    return false;
  }

  add(entity) {
    if (this.query(entity))
      this.entities[entity.id] = entity;
  }

  remove(entity) {
    delete this.entities[entity.id];
  }

  queryCommand(command) {
    return false;
  }

  addCommand(command) {
    if (this.queryCommand(command))
      this.commands[command.id] = command;
  }

  removeCommand(command) {
    delete this.commands[command.id];
  }

  run(time, dt) {

  }

  runSystem(time, dt) {
    if (!this.isEnabled)
      return;

    if (this.interval == 0) {
      this.run(time, dt);
      return;
    }

    if (time >= this.nextRun) {
      const commandsToRemove = Object.keys(this.commands);
      
      this.run(time, dt);
      this.nextRun = time + this.interval;
      
      commandsToRemove.forEach(k => {
        delete this.commands[k];
      });
    }
  }
}
