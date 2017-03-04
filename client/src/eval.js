import React from 'react'

import EvaluationTester from './components/evaluation-tester.js'

import AppModel from './models/app.js'

class Eval extends React.Component {
    constructor(props) {
        super(props)
        this.model = new AppModel(this.setState.bind(this))
        this.state = this.model.export()
    }

    componentDidMount() {
        this.load()
    }

    load() {
        fetch('/load/'+this.props.params.key, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => this.model.import(data.data))
    }

    render() {
        return (
            <div>
                <h1>{this.model.title}</h1>
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
