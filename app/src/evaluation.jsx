import React from 'react';

const EvaluationInputs = ({name}) => (
    <div className="text-right">
        <pre>{name}</pre>
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

class EvaluationTest extends React.Component {
    constructor(props) {
        super(props);
        this.mapParameters = this.mapParameters.bind(this);
    }

    mapParameters() {
        let mapper = (text, i) => <EvaluationInputs key={i} name={text} />;
        return this.props.parameters.map(mapper);
    }

    render() {
        return (
            <div className="row align-items-center">
                <div className="col-5">
                    {this.mapParameters()}
                </div>
                <div className="col-2 text-center">
                    <i className="fa fa-arrow-right fa-2x"></i>
                </div>
                <div className="col-5">
                    <EvaluationResult />
                </div>
            </div>
        );
    }
}

const Evaluation = ({parameters}) => (
    <div className="row">
        <div className="col">
            <h1>Evaluate</h1>
            <EvaluationTest parameters={parameters} />
        </div>
    </div>
);

export default Evaluation;
