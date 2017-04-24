import React from 'react'

import firebase from './firebase'

import EvaluationTester from './components/evaluation-tester.js'
import FormulaDisplay from './components/formula-display.js'

const EmptyTitle = () => (
    <em className="text-muted">Untitled</em>
)

const EvalData = ({
    title,
    formula,
    parameters,
}) => (
    <div>
        <h1>{title || <EmptyTitle />}</h1>
        <FormulaDisplay formula={formula} />
        <EvaluationTester
            parameters={parameters}
            formula={formula}
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

        this.state = {
            model: {},
            loaded: false,
        }
    }

    componentWillMount() {
        firebase
            .database()
            .ref('formulas')
            .child(this.props.params.key)
            .once('value')
            .then(snap => this.setState({ model: snap.val() }))
            .then(() => this.setState({loaded: true}))
    }

    render() {
        return (
            <div>
                {this.state.loaded ?
                    <EvalData
                        title={this.state.model.title}
                        formula={this.state.model.formula}
                        parameters={this.state.model.parameters.collection}
                    />
                : <EvalLoading />}
            </div>
        )
    }
}

export default Eval
