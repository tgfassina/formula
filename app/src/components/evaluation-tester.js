import React from 'react'

const EvaluationLabelEmpty = () => (
    <label className="text-muted">
        <em>Unnamed</em>
    </label>
)

const EvaluationLabel = ({label}) => (
    label ? <label>{label}</label> : <EvaluationLabelEmpty />
)

const EvaluationParameter = ({
    parameter,
    onChange,
}) => (
    <div className="evaluation-parameter">
        <EvaluationLabel label={parameter.label} />
        <input
            type="number"
            className="form-control form-control-sm parameter-input"
            value={parameter.value}
            placeholder={parameter.defaultValue}
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

class EvaluationTester extends React.Component {
    mapParameters() {
        const mapper = (parameter = {}, i) => (
            <EvaluationParameter
                key={i}
                parameter={parameter}
                // onChange={this.props.updater(parameter.variable)}
            />
        )
        const parameters = Object.values(this.props.parameters).map(mapper)
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

export default EvaluationTester
