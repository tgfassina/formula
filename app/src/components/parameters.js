import React from 'react';

const ParameterVariable = ({variable}) => (
    <span className="badge badge-default">
        ${variable}
    </span>
);

const ParameterOptions = () => (
    <div className="inline-control-group text-right">
        <label><small>Default value</small></label>
        <input className="form-control form-control-sm" />
    </div>
);

const ParameterLabel = ({label, changeHandler, expanded}) => (
    <div>
        <input
            type="text"
            className="form-control form-control-sm"
            value={label}
            onChange={changeHandler}
        />

        {expanded ? <ParameterOptions /> : null}
    </div>
);

const ParameterActions = ({toggle, expanded}) => (
    <button className="btn btn-sm btn-secondary" onClick={toggle}>
        {expanded ? <i className="fa fa-chevron-up" /> : <i className="fa fa-chevron-down" />}
    </button>
);

class ParametersTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false};
    }

    toggleOptions() {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        return (
            <tr>
                <td className="text-right">
                    <ParameterVariable variable={this.props.variable} />
                </td>
                <td>
                    <ParameterLabel
                        label={this.props.label}
                        changeHandler={this.props.labelUpdater}
                        expanded={this.state.expanded}
                    />
                </td>
                <td className="text-center table-row-actions">
                    <ParameterActions
                        toggle={this.toggleOptions.bind(this)}
                        expanded={this.state.expanded}
                    />
                </td>
            </tr>
        );
    }
}

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
            <ParametersTableRow
                key={i}
                variable={parameter.variable}
                label={parameter.label}
                labelUpdater={this.props.labelUpdater(i)}
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
