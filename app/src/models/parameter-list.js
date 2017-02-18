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

    getAdder() {
        return () => {
            this.count++;
            this.data.push(new ParameterModel('X'+this.count));
            this.setState();
        }
    }

    getUpdater() {
        return (key) => (attribute) => (value) => {
            this.data[key][attribute] = value;
            this.setState();
        }
    }

    getValueUpdater() {
        return (key) => (value) => {
            this.data[key].value = value;
            this.setState();
        }
    }

    getDeleter() {
        return (key) => () => {
            this.data.splice(key, 1);
            this.setState();
        }
    }
}

export default ParameterListModel;
