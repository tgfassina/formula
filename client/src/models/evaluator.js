import math from 'mathjs/index.js';

class EvaluatorModel {
    constructor(stateUpdater, parameters, formula) {
        this.result = '-';
        this.formula = formula;
        this.parameters = parameters;

        this.stateUpdater = stateUpdater;
    }

    export() {
        return this.evaluate(this.parameters.export());
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

    getExpression() {
        return this.formula.export() || this.parameters.exportDefaultFormula();
    }

    getScope() {
        return this.parameters.export().reduce((carry, param) => {
            carry[param.variable] = param.getValue();
            return carry;
        }, {})
    }
}

export default EvaluatorModel;
