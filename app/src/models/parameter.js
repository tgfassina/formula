class ParameterModel {
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

export default ParameterModel;
