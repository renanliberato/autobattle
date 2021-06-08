import { System } from '../../ecs/System';

export class MatchStepSystem extends System {
    constructor() {
        super('MatchStepSystem');
        this.lastStep = '';
        this.nextStepTime = 0;
    }

    query(entity) {
        return false;
    }

    run(time, dt) {
        if (time >= this.nextStepTime) {
            this.nextStepTime = time + this.world.stepsInterval + 50;
            switch (this.lastStep) {
                case 'teamAMove':
                    this.world.matchStep = 'teamAAim';
                    this.lastStep = 'teamAAim';
                    break;
                    break;
                case 'teamAAim':
                    this.world.matchStep = 'teamAAttack';
                    this.lastStep = 'teamAAttack';
                    break;
                case 'teamAAttack':
                    this.world.matchStep = 'teamBMove';
                    this.lastStep = 'teamBMove';
                    break;
                case 'teamBMove':
                    this.world.matchStep = 'teamBAim';
                    this.lastStep = 'teamBAim';
                    break;
                    break;
                case 'teamBAim':
                    this.world.matchStep = 'teamBAttack';
                    this.lastStep = 'teamBAttack';
                    break;
                case 'teamBAttack':
                    this.world.matchStep = 'teamAMove';
                    this.lastStep = 'teamAMove';
                    break;
                default:
                    this.world.matchStep = 'teamAMove';
                    this.lastStep = 'teamAMove';
                    break;
            }
        }
    }
}
