import React from 'react';

import './vendor/index.js'

import './styles/custom.css';
import './styles/formula.css';

import Parameters from './components/parameters.js';
import Formula from './components/formula.js';
import Evaluation from './components/evaluation.js';

import ParameterModel from './models/parameter.js';

class App extends React.Component {
    constructor() {
        super();
        this.parameterCount = 0;
        this.state = {
            parameters: [],
            formula: ''
        };
    }

    createParameter() {
        this.parameterCount++;
        return new ParameterModel('X'+this.parameterCount);
    }

    addParameter() {
        let newInput = this.createParameter();
        let newList = this.state.parameters.concat([newInput]);
        this.setState({parameters: newList});
    }

    parametersUpdater(key) {
        return (attribute) => {
            return (value) => {
                var inputs = this.state.parameters.slice();
                inputs[key][attribute] = value;
                this.setState({parameters: inputs});
            }
        };
    }

    parametersDeleter(key) {
        return() => {
            var inputs = this.state.parameters.slice();
            inputs.splice(key, 1);
            this.setState({parameters: inputs});
        }
    }

    updateFormula(newFormula) {
        this.setState({formula: newFormula});
    }

    render() {
        return (
            <div className="row">
                <Parameters
                    parameters={this.state.parameters}
                    parametersUpdater={this.parametersUpdater.bind(this)}
                    parametersDeleter={this.parametersDeleter.bind(this)}
                    addHandler={this.addParameter.bind(this)}
                />
                <Formula
                    parameters={this.state.parameters}
                    onUpdate={this.updateFormula.bind(this)}
                />
                <Evaluation
                    parameters={this.state.parameters}
                    parametersUpdater={this.parametersUpdater.bind(this)}
                    formula={this.state.formula}
                />
            </div>
        );
    }
}

export default App;
