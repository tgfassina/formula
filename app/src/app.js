import React from 'react';

import './vendor/index.js'

import './styles/custom.css';
import './styles/formula.css';

import Parameters from './components/parameters.js';
import Formula from './components/formula.js';
import Evaluation from './components/evaluation.js';

import ParameterListModel from './models/parameter-list.js';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            parameters: [],
            formula: ''
        };

        const stateHandler = this.setState.bind(this);
        this.parameters = new ParameterListModel(stateHandler, 'parameters');
    }

    updateFormula(newFormula) {
        this.setState({formula: newFormula});
    }

    render() {
        return (
            <div>
                <Parameters
                    parameters={this.state.parameters}
                    parameterUpdater={this.parameters.updater.bind(this.parameters)}
                    parameterDeleter={this.parameters.deleter.bind(this.parameters)}
                    addHandler={this.parameters.adder.bind(this.parameters)}
                />
                <Formula
                    parameters={this.state.parameters}
                    onUpdate={this.updateFormula.bind(this)}
                />
                <Evaluation
                    parameters={this.state.parameters}
                    parametersUpdater={this.parameters.updater.bind(this.parameters)}
                    formula={this.state.formula}
                />
            </div>
        );
    }
}

export default App;
