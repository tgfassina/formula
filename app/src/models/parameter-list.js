import ParameterModel from './parameter.js';

class ParameterListModel {
    constructor(stateHandler, stateKey) {
        this.count = 0;
        this.data = [];

        this.stateKey = stateKey;
        this.stateHandler = stateHandler;
    }

    setState() {
        this.stateHandler({[this.stateKey]: this.data});
    }

    adder() {
        this.count++;
        this.data.push(new ParameterModel('X'+this.count));
        this.setState();
    }

    updater(key) {
        return (attribute) => {
            return (value) => {
                this.data[key][attribute] = value;
                this.setState();
            }
        };
    }

    deleter(key) {
        return() => {
            this.data.splice(key, 1);
            this.setState();
        }
    }
}

export default ParameterListModel;
