import React from 'react';

import ParameterRow from './parameter-row.js';

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

const ParametersTableEmpty = () => (
    <tr>
        <td colSpan="3" className="text-muted text-center">
            <em className="empty-table-message">Empty</em>
        </td>
    </tr>
);

class ParametersTable extends React.Component {
    mapTableRows() {
        let mapper = (parameter, i) => (
            <ParameterRow
                key={parameter.variable}
                parameter={parameter}
                parameterUpdater={this.props.parametersUpdater(i)}
                parameterDeleter={this.props.parametersDeleter(i)}
            />
        );
        return this.props.parameters.map(mapper);
    }

    getTableContent() {
        let rows = this.mapTableRows();
        return rows.length ? rows : <ParametersTableEmpty />;
    }

    render() {
        return (
            <table className="table table-bordered table-sm">
                <tbody>
                    {this.getTableContent()}
                    <ParametersTableFooter clickHandler={this.props.addHandler} />
                </tbody>
            </table>
        );
    }
}

const Parameters = ({parameters, parametersUpdater, parametersDeleter, addHandler}) => (
    <div className="col-12">
        <h1>Choose parameters</h1>
        <ParametersTable
            parameters={parameters}
            parametersUpdater={parametersUpdater}
            parametersDeleter={parametersDeleter}
            addHandler={addHandler}
        />
    </div>
);

export default Parameters;
