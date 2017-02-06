import React from 'react';

const ParameterVariable = ({variable}) => (
    <span className="badge badge-default">
        {variable}
    </span>
);

class ParameterLabel extends React.Component {
    changeHandler(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <input
                type="text"
                className="form-control form-control-sm"
                value={this.props.label}
                onChange={this.changeHandler.bind(this)}
            />
        );
    }
}

class ParameterDefaultValue extends React.Component {
    changeHandler(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <div className="inline-control-group text-right">
                <label><small>Default value</small></label>
                <input
                    type="text"
                    className="form-control form-control-sm"
                    value={this.props.defaultValue}
                    onChange={this.changeHandler.bind(this)}
                />
            </div>
        );
    }
}

const ParameterOptions = ({parameter, parameterUpdater}) => (
    <ParameterDefaultValue
        defaultValue={parameter.defaultValue}
        onChange={parameterUpdater('defaultValue')}
    />
);

class ParameterConfig extends React.Component {
    render() {
        return (
            <div>
                <ParameterLabel
                    label={this.props.parameter.label}
                    onChange={this.props.parameterUpdater('label')}
                />

                {this.props.expanded ?
                    <ParameterOptions
                        parameter={this.props.parameter}
                        parameterUpdater={this.props.parameterUpdater}
                    />
                : null}
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

export default ParameterRow;
