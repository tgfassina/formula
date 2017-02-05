import React from 'react';

const ParameterVariable = ({variable}) => (
    <span className="badge badge-default">
        ${variable}
    </span>
);

const ParameterName = ({label, changeHandler}) => (
    <input
        type="text"
        className="form-control form-control-sm"
        value={label}
        onChange={changeHandler}
    />
);

const ParameterOptions = () => (
    <button className="btn btn-sm btn-secondary">
        <i className="fa fa-chevron-down" />
    </button>
);

const ParametersTableRow = ({variable, label, labelUpdater}) => (
    <tr>
        <td className="text-right">
            <ParameterVariable variable={variable} />
        </td>
        <td>
            <ParameterName label={label} changeHandler={labelUpdater} />
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
    mapTableRows() {
        let mapper = (parameter, i) => (
            <ParametersTableRow
                key={i}
                variable={parameter.variable}
                label={parameter.label}
                labelUpdater={this.props.labelUpdater(i)}
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

const Parameters = ({parameters, addHandler, parameterLabelUpdater}) => (
    <div className="row">
        <div className="col">
            <h1>Choose parameters</h1>
            <ParametersTable
                parameters={parameters}
                addHandler={addHandler}
                labelUpdater={parameterLabelUpdater}
            />
        </div>
    </div>
);

export default Parameters;
