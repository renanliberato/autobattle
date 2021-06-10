import { ArmyLayout } from "./ArmyLayout.js";
import { Model } from "./Model.js";
import { UnitInventory } from "./UnitInventory.js";

export class GlobalState extends Model {
    constructor() {
        super();
        
        this.STATE_KEY = 'wargame-data';

        this._gold = 10;

        this.army = new ArmyLayout();
        this.units = new UnitInventory();

        this.units.addOnPropertyChanged((prop) => {
            this.triggerPropertyChanged(`units.${prop}`);
        });
    }

    toJson() {
        return {
            gold: this.gold,
            army: this.army.toJson(),
            units: this.units.toJson(),
        }
    }

    onLoaded(state) {
        this.gold = state.gold;
        this.army.onLoaded(state.army);
        this.units.onLoaded(state.units);
    }

    get gold() {
        return this._gold;
    }

    set gold(v) {
        this.setAndTrigger('gold', v);
    }
    
    get army() {
        return this._army;
    }

    set army(v) {
        this.setAndTrigger('army', v);
    }
}