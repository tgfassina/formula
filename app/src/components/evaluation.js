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
                <EvaluationLabel label={this.props.parameter.label} />
                <input
                    type="number"
                    className="form-control form-control-sm parameter-input"
                    value={this.props.parameter.value}
                    placeholder={this.props.parameter.defaultValue}
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
        let reducer = (carry, parameter) => carry + parameter.getValue();
        return this.props.parameters.reduce(reducer, 0);
    }

    mapParameters() {
        let mapper = (parameter, i) => (
            <EvaluationParameter
                key={i}
                parameter={parameter}
                onChange={this.props.parametersUpdater(i)('value')}
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

const Evaluation = ({parameters, parametersUpdater}) => (
    <div className="row">
        <div className="col">
            <h1>Evaluate</h1>
            <EvaluationTester
                parameters={parameters}
                parametersUpdater={parametersUpdater}
            />
        </div>
    </div>
);

export default Evaluation;
