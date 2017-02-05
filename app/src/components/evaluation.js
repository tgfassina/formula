import React from 'react';

const EvaluationLabelEmpty = () => (
    <label className="text-muted">
        <em>Unnamed</em>
    </label>
);

const EvaluationLabel = ({label}) => (
    label ? <label>{label}</label> : <EvaluationLabelEmpty />
);

class EvaluationParameter extends React.Component {
    changeHandler(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <div className="evaluation-parameter">
                <EvaluationLabel label={this.props.label} />
                <input
                    type="number"
                    className="form-control form-control-sm parameter-input"
                    value={this.props.value}
                    onChange={this.changeHandler.bind(this)}
                />
            </div>
        );
    }
}

const EvaluationResult = ({result}) => (
    <input
        type="number"
        className="form-control form-control-lg result-display"
        disabled
        value={result}
    />
);

const EvaluationNoParameters = () => (
    <div className="text-right text-muted">
        <em>No parameters</em>
    </div>
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
            <EvaluationParameter
                key={i}
                label={parameter.label}
                value={parameter.value}
                onChange={this.props.onValuesChange(i)}
            />
        );
        return this.props.parameters.map(mapper);
    }

    getParametersData() {
        let parameters = this.mapParameters();
        return parameters.length ? parameters : <EvaluationNoParameters />
    }

    render() {
        return (
            <div className="row align-items-center">
                <div className="col-5">
                    {this.getParametersData()}
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

const Evaluation = ({parameters, onValuesChange}) => (
    <div className="row">
        <div className="col">
            <h1>Evaluate</h1>
            <EvaluationTester
                parameters={parameters}
                onValuesChange={onValuesChange}
            />
        </div>
    </div>
);

export default Evaluation;
