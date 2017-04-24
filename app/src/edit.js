import React from 'react'

import firebase from './firebase'

import Parameters from './components/parameters.js'
import Formula from './components/formula.js'
import Evaluation from './components/evaluation.js'
import Share from './components/share.js'

import {
    getEmptyModel,
    fromModel,
} from './models/app.js'

class Edit extends React.Component {
    constructor() {
        super()
        this.state = {
            model: getEmptyModel(),
            sharedId: false,
            saving: false,
        }
    }

    setSaving(isSaving) {
        this.setState({saving: isSaving})
    }

    transformStateModel(transformer) {
        const model = this.state.model
        const changedModel = transformer(model)
        this.setState({ model: changedModel })
    }

    createParameter() {
        this.transformStateModel((model) => {
            return fromModel(model).createParameter()
        })
    }

    changeParameter(id, parameter) {
        this.transformStateModel((model) => {
            return fromModel(model).changeParameter(id, parameter)
        })
    }

    deleteParameter(id) {
        this.transformStateModel((model) => {
            return fromModel(model).deleteParameter(id)
        })
    }

    updateSharedId(id) {
        this.setState({
            sharedId: id,
        })
    }

    save() {
        const model = this.state.model

        this.setSaving(true)
        firebase
            .database()
            .ref('formulas')
            .push(model)
            .then(ref => this.updateSharedId(ref.key))
            .then(() => this.setSaving(false))
    }

    render() {
        return (
            <div>
                <Parameters
                    parameters={this.state.model.parameters}
                    onCreateParameter={() => this.createParameter()}
                    onChangeParameter={(id, parameter) => this.changeParameter(id, parameter)}
                    onDeleteParameter={(id) => this.deleteParameter(id)}
                />
                <Formula
                    placeholder={this.state.model.formulaPlaceholder}
                    // onUpdate={this.model.getFormulaUpdater()}
                />
                <Evaluation
                    parameters={this.state.model.parameters}
                    // result={this.state.result}
                    // updater={this.model.getValuesUpdater()}
                />
                <Share
                    // onUpdate={this.model.getTitleUpdater()}
                    onSave={this.save.bind(this)}
                    sharedId={this.state.sharedId}
                    saving={this.state.saving}
                />
            </div>
        )
    }
}

export default Edit
