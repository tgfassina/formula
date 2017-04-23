import React from 'react'

import firebase from './firebase'

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
        this.state = {
            ...this.state,
            sharedId: false,
            saving: false,
        }
    }

    save() {
        this.setState({saving: true})
        firebase
            .database()
            .ref('formulas')
            .push(this.model.exportForDatabase())
            .then(ref => this.setState({
                sharedId: ref.key,
                saving: false,
            }))
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
                    sharedId={this.state.sharedId}
                    saving={this.state.saving}
                />
            </div>
        )
    }
}

export default Edit
