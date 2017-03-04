import React from 'react'

import Parameters from './components/parameters.js'
import Formula from './components/formula.js'
import Evaluation from './components/evaluation.js'
import Share from './components/share.js'

import AppModel from './models/app.js'

class Edit extends React.Component {
    constructor() {
        super()
        this.model = new AppModel(this.setState.bind(this))
        this.state = this.model.export()
    }

    save() {
        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.model.exportForDatabase()),
        })
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
                <Share
                    onUpdate={this.model.getTitleUpdater()}
                    onSave={this.save.bind(this)}
                />
            </div>
        )
    }
}

export default Edit
