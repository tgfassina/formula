import React from 'react';
import ReactDOM from 'react-dom';

import Parameters from './parameters.jsx';
import Formula from './formula.jsx';
import Evaluation from './evaluation.jsx';

const createInput = (label) => ({label: label, value: ''});

class CreateFormula extends React.Component {
    constructor() {
        super();
        this.addParameter = this.addParameter.bind(this);
        this.updateValue = this.updateValue.bind(this);

        this.state = {inputList: [createInput('natural')]};
    }

    addParameter() {
        let newList = this.state.inputList.concat([createInput('artificial')]);
        this.setState({inputList: newList});
    }

    updateValue(i, value) {
        var inputs = this.state.inputList.slice();
        inputs[i].value = value;
        this.setState({inputList: inputs});
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


ReactDOM.render(
    <CreateFormula />,
    document.getElementById('root')
);
