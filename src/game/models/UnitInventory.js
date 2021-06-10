import { Model } from "./Model.js";

export class UnitInventory extends Model {
    constructor() {
        super();

        this._warrior = 5;
        this._archer = 5;
    }

    toJson() {
        return {
            warrior: this.warrior,
            archer: this.archer,
        }
    }

    onLoaded(state) {
        this.warrior = state.warrior;
        this.archer = state.archer;
    }

    get warrior() {
        return this._warrior;
    }
    
    get archer() {
        return this._archer;
    }

    set warrior(v) {
        this.setAndTrigger('warrior', v);
    }

    set archer(v) {
        this.setAndTrigger('archer', v);
    }
}