import React from 'react';

const EvaluationInputs = ({name, value, changeHandler}) => (
    <div className="evaluation-parameter">
        <label>{name}</label>
        <input
            type="number"
            className="form-control form-control-sm"
            value={value}
            onChange={changeHandler}
        />
    </div>
);

const EvaluationResult = ({value}) => (
    <input
        type="number"
        className="form-control form-control-lg result-display"
        disabled
        value={value}
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
        let reducer = (carry, input) => (carry + parseInt(input.value, 10));
        return this.props.inputs.reduce(reducer, 0) || 0;
    }

    updateValue(i, event) {
        this.props.updateHandler(i, event.target.value);
    }

    mapParameters() {
        let mapper = (input, i) => (
            <EvaluationInputs
                key={i}
                name={input.label}
                value={input.value}
                changeHandler={this.updateValue.bind(this, i)}
            />
        );
        return this.props.inputs.map(mapper);
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
                    <EvaluationResult value={this.evaluateResult()} />
                </div>
            </div>
        );
    }
}

const Evaluation = ({inputs, updateHandler}) => (
    <div className="row">
        <div className="col">
            <h1>Evaluate</h1>
            <EvaluationTester
                inputs={inputs}
                updateHandler={updateHandler}
            />
        </div>
    </div>
);

export default Evaluation;
