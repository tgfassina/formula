import React from 'react'
import firebase from 'firebase'

import EvaluationTester from './components/evaluation-tester.js'
import FormulaDisplay from './components/formula-display.js'

import AppModel from './models/app.js'

class Eval extends React.Component {
    constructor(props) {
        super(props)
        this.model = new AppModel(this.setState.bind(this))
        this.state = this.model.export()

        firebase.initializeApp({databaseURL: 'https://vardump.firebaseio.com/'})
    }

    componentDidMount() {
        this.load()
    }

    load() {
        firebase
            .database()
            .ref('test')
            .child(this.props.params.key)
            .once('value')
            .then(snap => this.model.import(snap.val().data))
    }

    render() {
        return (
            <div>
                <h1>
                    {
                        this.model.title
                        ||
                        <em className="text-muted">Untitled</em>
                    }
                </h1>
                <FormulaDisplay formula={this.state.formula} />
                <EvaluationTester
                    parameters={this.state.parameters}
                    result={this.state.result}
                    updater={this.model.getValuesUpdater()}
                />
            </div>
        )
    }
}

export default Eval
