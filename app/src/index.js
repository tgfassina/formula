import React from 'react';
import ReactDOM from 'react-dom';

import Parameters from './parameters.jsx';
import Formula from './formula.jsx';
import Evaluation from './evaluation.jsx';

class CreateFormula extends React.Component {
    constructor() {
        super();
        this.state = {parameterList: ['natural']};

        this.addParameter = this.addParameter.bind(this);
    }

    addParameter() {
        let newList = this.state.parameterList.concat(['artificial']);
        this.setState({parameterList: newList});
    }

    render() {
        return (
            <div>
                <Parameters
                    list={this.state.parameterList}
                    addHandler={this.addParameter}
                />
                <hr />
                <Formula />
                <hr />
                <Evaluation parameters={this.state.parameterList} />
            </div>
        );
    }
}


ReactDOM.render(
    <CreateFormula />,
    document.getElementById('root')
);
