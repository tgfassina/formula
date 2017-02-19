class Parameter {
    constructor(variable) {
        this.variable = variable;
        this.label = '';
        this.value = '';
        this.defaultValue = '';
    }

    getValue() {
        const value = this.value === '' ? this.defaultValue : this.value;
        const zeroFallback = (string) => parseInt(string, 10) || 0;
        return zeroFallback(value);
    }
}

class ParametersModel {
    constructor(stateUpdater) {
        this.stateUpdater = stateUpdater;
        this.count = 0;
        this.data = [];
    }

    export() {
        return this.data;
    }

    getAdder() {
        return () => {
            this.count++;
            this.data.push(new Parameter('X'+this.count));
            this.stateUpdater();
        }
    }

    getUpdater() {
        return (key) => (attribute) => (value) => {
            this.data[key][attribute] = value;
            this.stateUpdater();
        }
    }

    getValueUpdater() {
        return (key) => (value) => {
            this.data[key].value = value;
            this.stateUpdater();
        }
    }

    getDeleter() {
        return (key) => () => {
            this.data.splice(key, 1);
            this.stateUpdater();
        }
    }
}

export default ParametersModel;
