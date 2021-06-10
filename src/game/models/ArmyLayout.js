import { Model } from "./Model.js";

export class ArmyLayout extends Model {
    constructor() {
        super();
        
        this.army = [];
    }

    toJson() {
        return {
            army: this.army,
        }
    }

    onLoaded(state) {
        this.army = state.army;
    }

    get army() {
        return this._army;
    }

    set army(v) {
        this.setAndTrigger('army', v);
    }
}