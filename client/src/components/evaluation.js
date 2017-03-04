import React from 'react'

import AppSection from './parts/app-section.js'

const EvaluationLabelEmpty = () => (
    <label className="text-muted">
        <em>Unnamed</em>
    </label>
)

const EvaluationLabel = ({label}) => (
    label ? <label>{label}</label> : <EvaluationLabelEmpty />
)

class EvaluationParameter extends React.Component {
    changeHandler(event) {
        this.props.onChange(event.target.value)
    }

    render() {
        return (
            <div className="evaluation-parameter">
                <EvaluationLabel label={this.props.parameter.label} />
                <input
                    type="number"
                    className="form-control form-control-sm parameter-input"
                    value={this.props.parameter.value}
                    placeholder={this.props.parameter.defaultValue}
                    onChange={this.changeHandler.bind(this)}
                />
            </div>
        )
    }
}

const EvaluationResult = ({result}) => (
    <code className="result-display" title={result}>
        {result}
    </code>
)

const EvaluationNoParameters = () => (
    <div className="text-right text-muted">
        <em>No parameters</em>
    </div>
)

class EvaluationTester extends React.Component {
    mapParameters() {
        const mapper = (parameter, i) => (
            <EvaluationParameter
                key={parameter.variable}
                parameter={parameter}
                onChange={this.props.updater(parameter.variable)}
            />
        )
        const parameters = this.props.parameters.map(mapper)
        return parameters.length ? parameters : <EvaluationNoParameters />
    }

    render() {
        return (
            <div className="row no-gutters align-items-center">
                <div className="col-4">
                    {this.mapParameters()}
                </div>
                <div className="col-2 text-center">
                    <i className="fa fa-arrow-right fa-2x"></i>
                </div>
                <div className="col-6">
                    <EvaluationResult result={this.props.result} />
                </div>
            </div>
        )
    }
}

const Evaluation = ({parameters, updater, result}) => (
    <AppSection>
        <h1>Evaluate</h1>
        <EvaluationTester
            parameters={parameters}
            updater={updater}
            result={result}
        />
    </AppSection>
)

export default Evaluation
