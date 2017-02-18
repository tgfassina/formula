import math from 'mathjs/index.js';

class FormulaModel {
    constructor(stateHandler, stateKey, parameters) {
        this.expression = '';
        this.parameters = parameters;

        this.stateKey = stateKey;
        this.stateHandler = stateHandler;
    }

    setState() {
        this.stateHandler({[this.stateKey]: this.expression});
    }

    getUpdater() {
        return (expression) => {
            this.expression = expression;
            this.setState();
        }
    }

    evaluate() {
        const expression = this.getExpression();
        const scope = this.getScope();

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

    getDefault() {
        const mapper = (parameter) => (parameter.variable);
        return this.parameters.data.map(mapper).join(' + ');
    }

    getExpression() {
        return this.expression || this.getDefault(this.parameters.data);
    }

    getScope() {
        return this.parameters.data.reduce((carry, param) => {
            carry[param.variable] = param.getValue();
            return carry;
        }, {})
    }
}

export default FormulaModel;
