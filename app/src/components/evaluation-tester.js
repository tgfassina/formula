import React from 'react'

import {
    evaluateExpression,
} from '../lib/evaluator'

const EvaluationLabelEmpty = () => (
    <label className="text-muted">
        <em>Unnamed</em>
    </label>
)

const EvaluationLabel = ({label}) => (
    label ? <label>{label}</label> : <EvaluationLabelEmpty />
)

const EvaluationParameter = ({
    variable,
    onChange,
}) => (
    <div className="evaluation-parameter">
        <EvaluationLabel label={variable.label} />
        <input
            type="number"
            className="form-control form-control-sm parameter-input"
            value={variable.value || ''}
            placeholder={variable.defaultValue}
            onChange={(event) => onChange(event.target.value)}
        />
    </div>
)

const EvaluationResult = ({result}) => (
    <code className="data-display result-display" title={result}>
        {result}
    </code>
)

const EvaluationNoParameters = () => (
    <div className="text-right text-muted">
        <em>No parameters</em>
    </div>
)

const EvaluationParameters = ({
    variables,
    onChangeVariable,
}) => {
    const mapper = (variable, i) => (
        <EvaluationParameter
            key={i}
            variable={variable}
            onChange={(value) => onChangeVariable(i, value)}
        />
    )
    const list = Object.values(variables).map(mapper)
    return list.length ? <div>{list}</div> : <EvaluationNoParameters />
}

const getVariables = (parameters, values) => {
    return Object.values(parameters)
        .map((parameter, index) => ({
            ...parameter,
            value: values[index]
        }))
}

const getVariableToValueMapping = (variables) =>
    Object.values(variables)
        .reduce((acc, variable) => {
            const value = Number.parseInt(variable.value, 10)
            const defaultValue = Number.parseInt(variable.defaultValue, 10)
            acc[variable.variable] = value >= 0 ? value : defaultValue
            return acc
        }, {})

class EvaluationTester extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            values: {},
        }
    }

    changeVariableValue(index, value) {
        const changedValues = {
            ...this.state.values,
            [index]: value,
        }
        this.setState({ values:  changedValues})
    }

    render() {
        const {
            parameters,
            formula,
        } = this.props

        const variables = getVariables(parameters, this.state.values)
        const result = evaluateExpression(formula, getVariableToValueMapping(variables))

        return (
            <div className="row no-gutters align-items-center">
                <div className="col-4">
                    <EvaluationParameters
                        variables={variables}
                        onChangeVariable={(index, value) => this.changeVariableValue(index, value)}
                    />
                </div>
                <div className="col-2 text-center">
                    <i className="fa fa-arrow-right fa-2x"></i>
                </div>
                <div className="col-6">
                    <EvaluationResult result={result} />
                </div>
            </div>
        )
    }
}

export default EvaluationTester
