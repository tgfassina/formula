import {
    getCreateParameter,
    getChangeParameter,
    getDeleteParameter,
    getEmptyModel as getEmptyParametersModel,
} from './parameters'

import {
    getChangeFormula
} from './formula'

export const getEmptyModel = () => ({
    formula: '',
    parameters: getEmptyParametersModel(),
    title: '',
})

export const fromModel = (model) => ({
    createParameter: () => ({
        ...model,
        parameters: getCreateParameter(model.parameters)(),
    }),
    changeParameter: (id, parameter) => ({
        ...model,
        parameters: getChangeParameter(model.parameters)(id, parameter),
    }),
    deleteParameter: (id) => ({
        ...model,
        parameters: getDeleteParameter(model.parameters)(id),
    }),
    changeFormula: (formula) => ({
        ...model,
        formula: getChangeFormula(model.formula)(formula)
    })
})
