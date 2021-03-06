import React from 'react'

import firebase from '../../lib/firebase'

import Parameters from './parameters'
import Formula from './formula'
import Evaluation from './evaluation'
import Share from './share'

import {
    getEmptyModel,
    fromModel,
} from '../../models'

class Edit extends React.Component {
    constructor() {
        super()
        this.state = {
            model: getEmptyModel(),
            sharedId: null,
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

    updateTitle(title) {
        this.transformStateModel((model) => {
            return {...model, title: title}
        })
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

    changeFormula(formula) {
        this.transformStateModel((model) => {
            return fromModel(model).changeFormula(formula)
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
        const getFormulaPlaceHolder = (parameters = {}) => (
            Object.values(parameters)
                .map((el) => el.variable)
                .join(' + ')
        )

        const placeholderFormula = getFormulaPlaceHolder(this.state.model.parameters.collection)

        return (
            <div>
                <Parameters
                    parameters={this.state.model.parameters.collection}
                    onCreateParameter={() => this.createParameter()}
                    onChangeParameter={(id, parameter) => this.changeParameter(id, parameter)}
                    onDeleteParameter={(id) => this.deleteParameter(id)}
                />
                <Formula
                    placeholder={getFormulaPlaceHolder(this.state.model.parameters.collection)}
                    onChange={(formula) => this.changeFormula(formula)}
                />
                <Evaluation
                    parameters={this.state.model.parameters.collection}
                    formula={this.state.model.formula || placeholderFormula}
                />
                <Share
                    sharedId={this.state.sharedId}
                    onChange={(title) => this.updateTitle(title)}
                    onSave={() => this.save()}
                    saving={this.state.saving}
                />
            </div>
        )
    }
}

export default Edit
