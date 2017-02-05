import React from 'react';

const ParameterVariable = ({variable}) => (
    <span className="badge badge-default">
        ${variable}
    </span>
);

const ParameterLabel = ({label, onChange}) => (
    <input
        type="text"
        className="form-control form-control-sm"
        value={label}
        onChange={onChange}
    />
);

const ParameterOptions = () => (
    <div className="inline-control-group text-right">
        <label><small>Default value</small></label>
        <input className="form-control form-control-sm" />
    </div>
);

class ParameterConfig extends React.Component {
    changeHandler(event) {
        this.props.parameterUpdater('label')(event.target.value);
    }

    render() {
        return (
            <div>
                <ParameterLabel
                    label={this.props.parameter.label}
                    onChange={this.changeHandler.bind(this)}
                />

                {this.props.expanded ? <ParameterOptions /> : null}
            </div>
        );
    }
};

const ParameterActions = ({toggle, expanded}) => (
    <button className="btn btn-sm btn-secondary" onClick={toggle}>
        {expanded ? <i className="fa fa-chevron-up" /> : <i className="fa fa-chevron-down" />}
    </button>
);

class ParameterRow extends React.Component {
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
                    <ParameterVariable variable={this.props.parameter.variable} />
                </td>
                <td>
                    <ParameterConfig
                        parameter={this.props.parameter}
                        parameterUpdater={this.props.parameterUpdater}
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
            <ParameterRow
                key={i}
                parameter={parameter}
                parameterUpdater={this.props.parametersUpdater(i)}
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

const Parameters = ({parameters, parametersUpdater, addHandler}) => (
    <div className="row">
        <div className="col">
            <h1>Choose parameters</h1>
            <ParametersTable
                parameters={parameters}
                addHandler={addHandler}
                parametersUpdater={parametersUpdater}
            />
        </div>
    </div>
);

export default Parameters;
