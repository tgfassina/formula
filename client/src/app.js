import React from 'react';

import './vendor/index.js'
import './styles/custom.css';
import './styles/formula.css';

import Parameters from './components/parameters.js';
import Formula from './components/formula.js';
import Evaluation from './components/evaluation.js';

import AppModel from './models/app.js';

class App extends React.Component {
    constructor() {
        super();
        this.model = new AppModel(this.setState.bind(this));
        this.state = this.model.export();
    }

    render() {
        return (
            <div>
                <Parameters
                    parameters={this.state.parameters}
                    onAdd={this.model.getParametersAdder()}
                    updater={this.model.getParametersUpdater()}
                    deleter={this.model.getParametersDeleter()}
                />
                <Formula
                    placeholder={this.state.formulaPlaceholder}
                    onUpdate={this.model.getFormulaUpdater()}
                />
                <Evaluation
                    parameters={this.state.parameters}
                    result={this.state.result}
                    updater={this.model.getValuesUpdater()}
                />
            </div>
        );
    }
}

export default App;
