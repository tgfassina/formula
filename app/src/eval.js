import React from 'react'

import firebase from './firebase'

import EvaluationTester from './components/evaluation-tester.js'
import FormulaDisplay from './components/formula-display.js'

import AppModel from './models/app.js'

const EmptyTitle = () => (
    <em className="text-muted">Untitled</em>
)

const EvalData = ({title, formula, parameters, result, updater}) => (
    <div>
        <h1>{title || <EmptyTitle />}</h1>
        <FormulaDisplay formula={formula} />
        <EvaluationTester
            parameters={parameters}
            result={result}
            updater={updater}
        />
    </div>
)

const EvalLoading = () => (
    <h2 className="text-center">
        <i className="fa fa-spinner fa-spin" />
    </h2>
)

class Eval extends React.Component {
    constructor(props) {
        super(props)
        this.model = new AppModel(this.setState.bind(this))
        this.state = this.model.export()
    }

    componentDidMount() {
        this.setState({loaded: false})
        this.load()
    }

    load() {
        firebase
            .database()
            .ref('formulas')
            .child(this.props.params.key)
            .once('value')
            .then(snap => this.model.import(snap.val().data))
            .then(() => this.setState({loaded: true}))
    }

    render() {
        return (
            <div>
                {this.state.loaded ?
                    <EvalData
                        title={this.model.title}
                        formula={this.state.formula}
                        parameters={this.state.parameters}
                        result={this.state.result}
                        updater={this.model.getValuesUpdater()}
                    />
                : <EvalLoading />}
            </div>
        )
    }
}

export default Eval
