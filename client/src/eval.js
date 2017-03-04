import React from 'react';

import Evaluation from './components/evaluation.js';

import AppModel from './models/app.js';

class Eval extends React.Component {
    constructor() {
        super();
        this.model = new AppModel(this.setState.bind(this));
        this.state = this.model.export();
    }

    render() {
        return (
            <div>
                <Evaluation
                    parameters={this.state.parameters}
                    result={this.state.result}
                    updater={this.model.getValuesUpdater()}
                />
            </div>
        );
    }
}

export default Eval;
