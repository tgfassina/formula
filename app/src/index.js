import React from 'react';
import ReactDOM from 'react-dom';

class ParameterFlag extends React.Component {
    render() {
        return (
            <span className="badge badge-default">${this.props.flagId}</span>
        );
    }
}

class ParameterName extends React.Component {
    render() {
        return (
            <input type="text" className="form-control form-control-sm" />
        );
    }
}

class ParameterOptions extends React.Component {
    render() {
        return (
            <i className="fa fa-chevron-down" />
        );
    }
}

class ParametersTableRow extends React.Component {
    render() {
        return (
            <tr>
                <td className="text-right">
                    <ParameterFlag flagId={this.props.flagId} />
                </td>
                <td>
                    <ParameterName />
                </td>
                <td className="text-center">
                    <ParameterOptions />
                </td>
            </tr>
        );
    }
}

class ParametersTableFooter extends React.Component {
    render() {
        return (
            <tr>
                <td colSpan="3">
                    <button className="btn btn-secondary btn-block">Add</button>
                </td>
            </tr>
        );
    }
}

class ParametersTable extends React.Component {
    tableRows() {
        let mapper = (i) => <ParametersTableRow key={i} flagId={i} />;
        return this.props.parameters.map(mapper);
    }

    render() {
        return (
            <table className="table table-bordered">
                <tbody>
                    {this.tableRows()}
                    <ParametersTableFooter />
                </tbody>
            </table>
        );
    }
}

class Parameters extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <h1>Choose parameters</h1>
                    <ParametersTable parameters={['test']} />
                </div>
            </div>
        );
    }
}


class FormulaInput extends React.Component {
    render() {
        return (
            <input type="text" className="form-control" />
        );
    }
}

class FormulaPreview extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-block text-center text-muted">
                    Human-readable version here
                </div>
            </div>
        );
    }
}

class Formula extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <h1>Write formula</h1>
                    <FormulaInput />
                    <FormulaPreview />
                </div>
            </div>
        );
    }
}


class EvaluationInputs extends React.Component {
    render() {
        return (
            <div className="text-right">
                <pre>X</pre>
                <input type="text" className="form-control form-control-sm" />
            </div>
        );
    }
}

class EvaluationResult extends React.Component {
    render() {
        return (
            <input
                type="text"
                className="form-control form-control sm"
                disabled
                value="666"
            />
        );
    }
}

class EvaluationTest extends React.Component {
    render() {
        return (
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
    }
}

class Evaluation extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <h1>Evaluate</h1>
                    <EvaluationTest />
                </div>
            </div>
        );
    }
}


class CreateFormula extends React.Component {
    render() {
        return (
            <div>
                <Parameters />
                <hr />
                <Formula />
                <hr />
                <Evaluation />
            </div>
        );
    }
}

ReactDOM.render(
    <CreateFormula />,
    document.getElementById('root')
);
