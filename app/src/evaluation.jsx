import React from 'react';

const EvaluationInputs = ({name, value, changeHandler}) => (
    <div className="evaluation-parameter">
        <label>{name}</label>
        <input
            type="text"
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
        this.updateValue = this.updateValue.bind(this);

        this.state = {values: [124]}
    }

    evaluateResult() {
        // adding the values until we can use the formula
        let reducer = (carry, value) => (carry + value);
        return this.state.values.reduce(reducer, 0);
    }

    mapParameters() {
        let mapper = (text, i) => (
            <EvaluationInputs
                key={i}
                name={text}
                value={this.state.values[i]}
                changeHandler={this.updateValue}
            />
        );
        return this.props.parameters.map(mapper);
    }

    updateValue() {
        console.log('Value should change');
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

const Evaluation = ({parameters}) => (
    <div className="row">
        <div className="col">
            <h1>Evaluate</h1>
            <EvaluationTester parameters={parameters} />
        </div>
    </div>
);

export default Evaluation;
