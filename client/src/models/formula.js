import math from 'mathjs/index.js';

class FormulaModel {
    constructor(stateUpdater) {
        this.stateUpdater = stateUpdater;
        this.expression = '';
    }

    export() {
        return this.expression;
    }

    getUpdater() {
        return (expression) => {
            this.expression = expression;
            this.stateUpdater();
        }
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
