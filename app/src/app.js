import React from 'react';

import './vendor/index.js'

import './styles/custom.css';
import './styles/formula.css';

import Parameters from './components/parameters.js';
import Formula from './components/formula.js';
import Evaluation from './components/evaluation.js';

import ParameterModel from './models/parameter.js';


class App extends React.Component {
    constructor() {
        super();
        this.parameterCount = 0;
        this.state = {parameters: []};
    }

    createParameter() {
        this.parameterCount++;
        return new ParameterModel('X'+this.parameterCount);
    }

    addParameter() {
        let newInput = this.createParameter();
        let newList = this.state.parameters.concat([newInput]);
        this.setState({parameters: newList});
    }

    parametersUpdater(key) {
        return (attribute) => {
            return (value) => {
                var inputs = this.state.parameters.slice();
                inputs[key][attribute] = value;
                this.setState({parameters: inputs});
            }
        };
    }

    render() {
        return (
            <div>
                <Parameters
                    parameters={this.state.parameters}
                    parametersUpdater={this.parametersUpdater.bind(this)}
                    addHandler={this.addParameter.bind(this)}
                />
                <hr />
                <Formula
                    parameters={this.state.parameters}
                />
                <hr />
                <Evaluation
                    parameters={this.state.parameters}
                    parametersUpdater={this.parametersUpdater.bind(this)}
                />
            </div>
        );
    }
}

export default App;
