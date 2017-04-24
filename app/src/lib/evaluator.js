import math from 'mathjs/index.js'

//math library acts silly sometimes
const fixExpression = (formula) => ['(', formula, ')+0'].join('')

export const evaluateExpression = (expression, variables) => {
    const scope = variables

    try {
        const result = math.eval(fixExpression(expression), scope)
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
