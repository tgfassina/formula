import React from 'react';

import Parameters from './components/parameters.js';
import Formula from './components/formula.js';
import Evaluation from './components/evaluation.js';

import AppModel from './models/app.js';

class Eval extends React.Component {
    constructor() {
        super();
        this.model = new AppModel(this.setState.bind(this));
        this.state = this.model.export();
    }

    save() {
        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.model.exportForDatabase())
        });
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
                <hr />
                <button
                    className="btn btn-sm btn-secondary pull-right"
                    onClick={this.save.bind(this)}
                >
                    Test save
                </button>
            </div>
        );
    }
}

export default Eval;
