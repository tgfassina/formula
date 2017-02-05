import React from 'react';

const EvaluationLabel = ({label}) => (
    label ?
        <label>{label}</label>
        :
        <label className="text-muted">
            <em>Unnamed</em>
        </label>
);

const EvaluationInputs = ({label, value, changeHandler}) => (
    <div className="evaluation-parameter">
        <EvaluationLabel label={label} />
        <input
            type="number"
            className="form-control form-control-sm parameter-input"
            value={value}
            onChange={changeHandler}
        />
    </div>
);

const EvaluationResult = ({result}) => (
    <input
        type="number"
        className="form-control form-control-lg result-display"
        disabled
        value={result}
    />
);

class EvaluationTester extends React.Component {
    evaluateResult() {
        // adding the values until we can use the formula
        const getInt = (string) => parseInt(string, 10) || 0;
        let reducer = (carry, parameter) => carry + getInt(parameter.value);
        return this.props.parameters.reduce(reducer, 0);
    }

    mapParameters() {
        let mapper = (parameter, i) => (
            <EvaluationInputs
                key={i}
                label={parameter.label}
                value={parameter.value}
                changeHandler={this.props.valueUpdater(i)}
            />
        );
        return this.props.parameters.map(mapper);
    }

    render() {
        return (
            <div className="row align-items-center">
                <div className="col-5">
                    {this.mapParameters()}
                </div>
                <div className="col-2 text-center">
                    <i className="fa fa-arrow-right fa-2x"></i>
                </div>
                <div className="col-5">
                    <EvaluationResult result={this.evaluateResult()} />
                </div>
            </div>
        );
    }
}

const Evaluation = ({parameters, parameterValueUpdater}) => (
    <div className="row">
        <div className="col">
            <h1>Evaluate</h1>
            <EvaluationTester
                parameters={parameters}
                valueUpdater={parameterValueUpdater}
            />
        </div>
    </div>
);

export default Evaluation;
