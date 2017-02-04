import React from 'react';

import './vendor'

import './styles/custom.css';
import './styles/formula.css';

import Parameters from './components/parameters.js';
import Formula from './components/formula.js';
import Evaluation from './components/evaluation.js';

import Parameter from './models/parameter.js';

class App extends React.Component {
    constructor() {
        super();
        this.parameterCount = 0;
        this.state = {parameters: [this.createParameter('natural')]};
    }

    createParameter(label) {
        this.parameterCount++;
        return new Parameter(this.parameterCount, label);
    }

    addParameter() {
        let newInput = this.createParameter('artificial');
        let newList = this.state.parameters.concat([newInput]);
        this.setState({parameters: newList});
    }

    updateValue(i) {
        return (event) => {
            var inputs = this.state.parameters.slice();
            inputs[i].value = event.target.value;
            this.setState({parameters: inputs});
        };
    }

    render() {
        return (
            <div>
                <Parameters
                    parameters={this.state.parameters}
                    addHandler={this.addParameter.bind(this)}
                />
                <hr />
                <Formula />
                <hr />
                <Evaluation
                    parameters={this.state.parameters}
                    updateHandler={this.updateValue.bind(this)}
                />
            </div>
        );
    }
}

export default App;
