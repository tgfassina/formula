import React from 'react';

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
        this.createInput = this.createInput.bind(this);

        this.parameterCount = 0;

        this.state = {inputList: [this.createInput('natural')]};
    }

    addParameter() {
        let newInput = this.createInput('artificial');
        let newList = this.state.inputList.concat([newInput]);
        this.setState({inputList: newList});
    }

    updateValue(i, value) {
        var inputs = this.state.inputList.slice();
        inputs[i].value = value;
        this.setState({inputList: inputs});
    }

    createInput(label) {
        this.parameterCount++;
        return new Parameter(this.parameterCount, label);
    }

    render() {
        return (
            <div>
                <Parameters
                    list={this.state.inputList}
                    addHandler={this.addParameter}
                />
                <hr />
                <Formula />
                <hr />
                <Evaluation
                    inputs={this.state.inputList}
                    updateHandler={this.updateValue}
                />
            </div>
        );
    }
}

export default App;
