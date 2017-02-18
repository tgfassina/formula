import React from 'react';

import AppSection from './parts/app-section.js';
import math from 'mathjs/index.js';

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
    <code className="result-display" title={result}>
        {result || '–'}
    </code>
);

const EvaluationNoParameters = () => (
    <div className="text-right text-muted">
        <em>No parameters</em>
    </div>
);

class EvaluationTester extends React.Component {
    evaluateResult() {
        const expression = this.props.getExpression(this.props.parameters);
        const scope = this.props.getScope(this.props.parameters);

        try {
            const result = math.eval(expression, scope);
            const formatParams = {
                exponential: {lower: 1e-10, upper: 1e10},
                precision: 10,
            };
            return isNaN(result) ? '' : math.format(result, formatParams);
        }
        catch (error) {
            return '';
        }

    }

    getParameters() {
        const mapper = (parameter, i) => (
            <EvaluationParameter
                key={i}
                parameter={parameter}
                onChange={this.props.updater(i)}
            />
        );
        const parameters = this.props.parameters.map(mapper);
        return parameters.length ? parameters : <EvaluationNoParameters />
    }

    render() {
        return (
            <div className="row no-gutters align-items-center">
                <div className="col-4">
                    {this.getParameters()}
                </div>
                <div className="col-2 text-center">
                    <i className="fa fa-arrow-right fa-2x"></i>
                </div>
                <div className="col-6">
                    <EvaluationResult result={this.evaluateResult()} />
                </div>
            </div>
        );
    }
}

const Evaluation = ({parameters, updater, getExpression, getScope}) => (
    <AppSection>
        <h1>Evaluate</h1>
        <EvaluationTester
            parameters={parameters}
            updater={updater}
            getExpression={getExpression}
            getScope={getScope}
        />
    </AppSection>
);

export default Evaluation;
