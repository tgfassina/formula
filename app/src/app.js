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
        this.state = {parameters: []};
    }

    createParameter() {
        this.parameterCount++;
        return new Parameter(this.parameterCount);
    }

    addParameter() {
        let newInput = this.createParameter();
        let newList = this.state.parameters.concat([newInput]);
        this.setState({parameters: newList});
    }

    parameterLabelUpdater(key) {
        return (event) => {
            var inputs = this.state.parameters.slice();
            inputs[key].label = event.target.value;
            this.setState({parameters: inputs});
        }
    }

    parameterValueUpdater(key) {
        return (event) => {
            var inputs = this.state.parameters.slice();
            inputs[key].value = event.target.value;
            this.setState({parameters: inputs});
        };
    }

    render() {
        return (
            <div>
                <Parameters
                    parameters={this.state.parameters}
                    addHandler={this.addParameter.bind(this)}
                    parameterLabelUpdater={this.parameterLabelUpdater.bind(this)}
                />
                <hr />
                <Formula />
                <hr />
                <Evaluation
                    parameters={this.state.parameters}
                    parameterValueUpdater={this.parameterValueUpdater.bind(this)}
                />
            </div>
        );
    }
}

export default App;
