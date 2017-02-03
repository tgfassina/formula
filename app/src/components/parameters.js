import React from 'react';

const ParameterFlag = ({flagText}) => (
    <span className="badge badge-default">
        ${flagText}
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

const ParametersTableRow = ({flagText, label}) => (
    <tr>
        <td className="text-right">
            <ParameterFlag flagText={flagText} />
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
        let mapper = (input, i) => (
            <ParametersTableRow
                key={i}
                flagText={input.variable}
                label={input.label}
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

const Parameters = ({list, addHandler}) => (
    <div className="row">
        <div className="col">
            <h1>Choose parameters</h1>
            <ParametersTable parameters={list} addHandler={addHandler} />
        </div>
    </div>
);

export default Parameters;
