import math from 'mathjs/index.js';

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

    evaluate(parameters) {
        const expression = this.getExpression(parameters);
        const scope = this.getScope(parameters);

        try {
            const result = math.eval(expression, scope);
            const formatParams = {
                exponential: {lower: 1e-10, upper: 1e10},
                precision: 10,
            };
            return isNaN(result) ? '' : math.format(result, formatParams);
        }
        catch (error) {
            return '';
        }
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
