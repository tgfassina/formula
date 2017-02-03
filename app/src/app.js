import React from 'react';

import './custom.css';
import './formula.css';

import Parameters from './parameters.js';
import Formula from './formula.js';
import Evaluation from './evaluation.js';

class App extends React.Component {
    constructor() {
        super();
        this.addParameter = this.addParameter.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.createInput = this.createInput.bind(this);

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
        return {label: label, value: ''};
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
