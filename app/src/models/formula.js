class FormulaModel {
    constructor(stateHandler, stateKey) {
        this.expression = '';

        this.stateKey = stateKey;
        this.stateHandler = stateHandler;
    }

    setState() {
        this.stateHandler({[this.stateKey]: this.expression});
    }

    updater(expression) {
        this.expression = expression;
        this.setState();
    }

    getDefault(parameters) {
        const mapper = (parameter) => (parameter.variable);
        return parameters.map(mapper).join(' + ');
    }

    getExpression(parameters) {
        return this.expression || this.getDefault(parameters);
    }

    getScope(parameters) {
        return parameters.reduce((carry, param) => {
            carry[param.variable] = param.getValue();
            return carry;
        }, {})
    }
}

export default FormulaModel;
