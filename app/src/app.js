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
        this.addParameter = this.addParameter.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.createParameter = this.createParameter.bind(this);

        this.parameterCount = 0;

        this.state = {parameters: [this.createParameter('natural')]};
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

    createParameter(label) {
        this.parameterCount++;
        return new Parameter(this.parameterCount, label);
    }

    render() {
        return (
            <div>
                <Parameters
                    parameters={this.state.parameters}
                    addHandler={this.addParameter}
                />
                <hr />
                <Formula />
                <hr />
                <Evaluation
                    parameters={this.state.parameters}
                    updateHandler={this.updateValue}
                />
            </div>
        );
    }
}

export default App;
