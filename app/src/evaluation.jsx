import React from 'react';

const EvaluationInputs = () => (
    <div className="text-right">
        <pre>X</pre>
        <input type="text" className="form-control form-control-sm" />
    </div>
);

const EvaluationResult = () => (
    <input
        type="text"
        className="form-control form-control sm"
        disabled
        value="666"
    />
);

const EvaluationTest = () => (
    <div className="row align-items-center">
        <div className="col-5">
            <EvaluationInputs />
        </div>
        <div className="col-2 text-center">
            <i className="fa fa-arrow-right fa-2x"></i>
        </div>
        <div className="col-5">
            <EvaluationResult />
        </div>
    </div>
);

const Evaluation = () => (
    <div className="row">
        <div className="col">
            <h1>Evaluate</h1>
            <EvaluationTest />
        </div>
    </div>
);

export default Evaluation;
