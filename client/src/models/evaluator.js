import math from 'mathjs/index.js'

class EvaluatorModel {
    constructor(stateUpdater, parameters, formula) {
        this.stateUpdater = stateUpdater
        this.parameters = parameters
        this.formula = formula
    }

    export() {
        return this.evaluate()
    }

    evaluate() {
        const expression = this.getExpression()
        const scope = this.parameters.exportScope()

        try {
            const result = math.eval(expression, scope)
            const formatParams = {
                exponential: {lower: 1e-10, upper: 1e10},
                precision: 10,
            }

            if (isNaN(result)) {
                throw new Error()
            }

            return math.format(result, formatParams)
        }
        catch (error) {
            return '-'
        }
    }

    getExpression() {
        let exp = this.formula.export() || this.parameters.exportDefaultFormula()
        return ['(', exp, ')+0'].join('') //math library acts silly sometimes
    }
}

export default EvaluatorModel
