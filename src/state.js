import { uuidv4 } from "./uuidv4";

const STATE_KEY = 'wargame-data';
export class State {
    constructor() {
        this.listeners = {};
        
        this.gold = 0;
        
        const that = this;
        this.units = {
            _warrior: 5,
            _archer: 5,
            get warrior() {
                return this._warrior;
            },
            get archer() {
                return this._archer;
            },
            set warrior(v) {
                const changed = this._warrior !== v;
                this._warrior = v;

                if (changed)
                    that.triggerPropertyChanged('unit.warrior');
            },
            set archer(v) {
                const changed = this._archer !== v;
                this._archer = v;

                if (changed)
                    that.triggerPropertyChanged('unit.archer');
            }
        }
    }

    triggerPropertyChanged(prop) {
        Object.keys(this.listeners).map(id => this.listeners[id]('unit.archer'));
    }

    load() {
        const fromStorage = JSON.parse(localStorage.getItem(STATE_KEY));
        
        if (fromStorage) {
            this.gold = 0;
            this.units.warrior = fromStorage.units.warrior;
            this.units.archer = fromStorage.units.archer;
        }
    }

    save() {
        localStorage.setItem(STATE_KEY, JSON.stringify({
            units: {
                gold: this.gold,
                warrior: this.units.warrior,
                archer: this.units.archer,
            }
        }));
    }

    addOnPropertyChanged(fn) {
        const uuid = uuidv4();

        this.listeners[uuid] = fn;

        return () => {
            delete this.listeners[uuid];
        }
    }
}