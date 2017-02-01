import React from 'react';
import ReactDOM from 'react-dom';


const ParameterFlag = ({flagText}) => (
    <span className="badge badge-default">
        ${flagText}
    </span>
);

const ParameterName = () => (
    <input type="text" className="form-control form-control-sm" />
);

const ParameterOptions = () => <i className="fa fa-chevron-down" />;

const ParametersTableRow = ({flagText}) => (
    <tr>
        <td className="text-right">
            <ParameterFlag flagText={flagText} />
        </td>
        <td>
            <ParameterName />
        </td>
        <td className="text-center">
            <ParameterOptions />
        </td>
    </tr>
);

const ParametersTableFooter = ({clickHandler}) => (
    <tr>
        <td colSpan="3">
            <button
                className="btn btn-secondary btn-block"
                onClick={clickHandler}
            >
                Add
            </button>
        </td>
    </tr>
);

class ParametersTable extends React.Component {
    constructor(props) {
        super(props);
        this.tableRows = this.tableRows.bind(this);
        this.addRow = this.addRow.bind(this);

        this.state = {parameters: this.props.parameters || []};
    }

    tableRows() {
        let mapper = (text, i) => <ParametersTableRow key={i} flagText={text} />;
        return this.state.parameters.map(mapper);
    }

    addRow() {
        this.setState({parameters: this.state.parameters.concat(['clicked'])});
    }

    render() {
        return (
            <table className="table table-bordered">
                <tbody>
                    {this.tableRows()}
                    <ParametersTableFooter clickHandler={this.addRow} />
                </tbody>
            </table>
        );
    }
}

const Parameters = () => (
    <div className="row">
        <div className="col">
            <h1>Choose parameters</h1>
            <ParametersTable parameters={['vrau', 'test']}/>
        </div>
    </div>
);


const FormulaInput = () => <input type="text" className="form-control" />;

const FormulaPreview = () => (
    <div className="card">
        <div className="card-block text-center text-muted">
            Human-readable version here
        </div>
    </div>
);

const Formula = () => (
    <div className="row">
        <div className="col">
            <h1>Write formula</h1>
            <FormulaInput />
            <FormulaPreview />
        </div>
    </div>
);


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


const CreateFormula = () => (
    <div>
        <Parameters />
        <hr />
        <Formula />
        <hr />
        <Evaluation />
    </div>
);


ReactDOM.render(
    <CreateFormula />,
    document.getElementById('root')
);
