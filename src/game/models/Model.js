import { uuidv4 } from "../../uuidv4";

export class Model {
    constructor() {
        this.listeners = {};
        this.STATE_KEY = uuidv4();
    }

    toJson() {
        return {};
    }

    triggerPropertyChanged(prop) {
        Object.keys(this.listeners).map(id => this.listeners[id](prop));
    }

    load() {
        const fromStorage = JSON.parse(localStorage.getItem(this.STATE_KEY));
        
        if (fromStorage) {
            this.onLoaded(fromStorage);
        }
    }

    save() {
        localStorage.setItem(this.STATE_KEY, JSON.stringify(this.toJson()));
    }

    setAndTrigger(prop, v) {
        const changed = this[`_${prop}`] !== v;
        this[`_${prop}`] = v;

        if (changed)
            this.triggerPropertyChanged(prop);
    }

    addOnPropertyChanged(fn) {
        const uuid = uuidv4();

        this.listeners[uuid] = fn;

        return () => {
            delete this.listeners[uuid];
        }
    }
}