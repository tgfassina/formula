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
    getPlaceholderFormula() {
        let mapper = (parameter) => (parameter.variable);
        return this.props.parameters.map(mapper).join(' + ');
    }

    evaluateResult() {
        let expression = this.props.formula.length ?
            this.props.formula
            :
            this.getPlaceholderFormula();

        let scope = this.props.parameters.reduce((carry, param) => {
            carry[param.variable] = param.getValue();
            return carry;
        }, {});

        try {
            let result = math.eval(expression, scope);
            return isNaN(result) ? '' : result;
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

const Evaluation = ({parameters, parametersUpdater, formula}) => (
    <AppSection>
        <h1>Evaluate</h1>
        <EvaluationTester
            parameters={parameters}
            parametersUpdater={parametersUpdater}
            formula={formula}
        />
    </AppSection>
);

export default Evaluation;
