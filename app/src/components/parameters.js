import React from 'react';

const ParameterFlag = ({variable}) => (
    <span className="badge badge-default">
        ${variable}
    </span>
);

const ParameterName = ({label}) => (
    <input
        type="text"
        className="form-control form-control-sm"
        value={label}
        disabled
    />
);

const ParameterOptions = () => (
    <button className="btn btn-sm btn-secondary">
        <i className="fa fa-chevron-down" />
    </button>
);

const ParametersTableRow = ({variable, label}) => (
    <tr>
        <td className="text-right">
            <ParameterFlag variable={variable} />
        </td>
        <td>
            <ParameterName label={label}/>
        </td>
        <td className="text-center table-row-actions">
            <ParameterOptions />
        </td>
    </tr>
);

const ParametersTableFooter = ({clickHandler}) => (
    <tr>
        <td colSpan="3">
            <button
                className="btn btn-secondary btn-block btn-sm"
                onClick={clickHandler}
            >
                <i className="fa fa-plus" /> Add
            </button>
        </td>
    </tr>
);

const ParametersTableView = ({rows, clickHandler}) => (
    <table className="table table-bordered table-sm">
        <tbody>
            {rows}
            <ParametersTableFooter clickHandler={clickHandler} />
        </tbody>
    </table>
);

class ParametersTable extends React.Component {
    constructor(props) {
        super(props);
        this.mapTableRows = this.mapTableRows.bind(this);
    }

    mapTableRows() {
        let mapper = (parameter, i) => (
            <ParametersTableRow
                key={i}
                variable={parameter.variable}
                label={parameter.label}
            />
        );
        return this.props.parameters.map(mapper);
    }

    render() {
        return (
            <ParametersTableView
                rows={this.mapTableRows()}
                clickHandler={this.props.addHandler}
            />
        );
    }
}

const Parameters = ({parameters, addHandler}) => (
    <div className="row">
        <div className="col">
            <h1>Choose parameters</h1>
            <ParametersTable parameters={parameters} addHandler={addHandler} />
        </div>
    </div>
);

export default Parameters;
