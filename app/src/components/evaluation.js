import React from 'react';

const EvaluationInputs = ({label, value, changeHandler}) => (
    <div className="evaluation-parameter">
        <label>{label}</label>
        <input
            type="number"
            className="form-control form-control-sm"
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
    constructor(props) {
        super(props);
        this.mapParameters = this.mapParameters.bind(this);
        this.evaluateResult = this.evaluateResult.bind(this);
    }

    evaluateResult() {
        // adding the values until we can use the formula
        const getInt = (string) => parseInt(string, 10) || 0;
        let reducer = (carry, parameter) => carry + getInt(parameter.value);
        return this.props.parameters.reduce(reducer, 0);
    }

    updateValue(i, event) {
        this.props.updateHandler(i, event.target.value);
    }

    mapParameters() {
        let mapper = (parameter, i) => (
            <EvaluationInputs
                key={i}
                label={parameter.label}
                value={parameter.value}
                changeHandler={this.updateValue.bind(this, i)}
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

const Evaluation = ({parameters, updateHandler}) => (
    <div className="row">
        <div className="col">
            <h1>Evaluate</h1>
            <EvaluationTester
                parameters={parameters}
                updateHandler={updateHandler}
            />
        </div>
    </div>
);

export default Evaluation;
