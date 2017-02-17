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
    getPlaceholderFormula() {
        const mapper = (parameter) => (parameter.variable);
        return this.props.parameters.map(mapper).join(' + ');
    }

    getExpression() {
        const length = this.props.formula.length;
        const formula = this.props.formula;
        const placeholder = this.getPlaceholderFormula();
        return length ? formula : placeholder;
    }

    evaluateResult() {
        const expression = this.getExpression();

        const scope = this.props.parameters.reduce((carry, param) => {
            carry[param.variable] = param.getValue();
            return carry;
        }, {});

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

    mapParameters() {
        let mapper = (parameter, i) => (
            <EvaluationParameter
                key={i}
                parameter={parameter}
                onChange={this.props.updater(i)}
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
            <div className="row no-gutters align-items-center">
                <div className="col-4">
                    {this.getParametersData()}
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

const Evaluation = ({parameters, updater, formula}) => (
    <AppSection>
        <h1>Evaluate</h1>
        <EvaluationTester
            parameters={parameters}
            updater={updater}
            formula={formula}
        />
    </AppSection>
);

export default Evaluation;
