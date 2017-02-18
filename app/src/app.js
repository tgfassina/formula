import React from 'react';

import './vendor/index.js'

import './styles/custom.css';
import './styles/formula.css';

import Parameters from './components/parameters.js';
import Formula from './components/formula.js';
import Evaluation from './components/evaluation.js';

import ParameterListModel from './models/parameter-list.js';
import FormulaModel from './models/formula.js';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            parameters: [],
            formula: ''
        };

        const stateHandler = this.setState.bind(this);
        this.parameters = new ParameterListModel(stateHandler, 'parameters');
        this.formula = new FormulaModel(stateHandler, 'formula');
    }

    render() {
        return (
            <div>
                <Parameters
                    parameters={this.state.parameters}
                    onAdd={this.parameters.getAdder()}
                    updater={this.parameters.getUpdater()}
                    deleter={this.parameters.getDeleter()}
                />
                <Formula
                    placeholder={this.formula.getDefault(this.state.parameters)}
                    onUpdate={this.formula.getUpdater()}
                />
                <Evaluation
                    parameters={this.state.parameters}
                    updater={this.parameters.getValueUpdater()}
                    result={this.formula.evaluate(this.state.parameters)}
                />
            </div>
        );
    }
}

export default App;
