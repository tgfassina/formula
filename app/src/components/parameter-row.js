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
                    <div className="parameter-extra">
                        <ParameterOptions
                            parameter={this.props.parameter}
                            parameterUpdater={this.props.parameterUpdater}
                        />
                    </div>
                : null}
            </div>
        );
    }
};

class ParameterActions extends React.Component {
    handleToggle() {
        this.props.onToggle();
    }

    handleDelete() {
        this.props.onDelete();
    }

    render() {
        return (
            <div>
                <button
                    className="btn btn-sm btn-block btn-secondary"
                    onClick={this.handleToggle.bind(this)}
                >
                    {this.props.expanded ?
                        <i className="fa fa-chevron-up" />
                        :
                        <i className="fa fa-chevron-down" />
                    }
                </button>
                {this.props.expanded ?
                    <div className="parameter-extra">
                        <button
                            className="btn btn-sm btn-block btn-secondary"
                            onClick={this.handleDelete.bind(this)}
                        >
                            <i className="fa fa-trash-o" />
                        </button>
                    </div>
                : null}
            </div>
        );
    }
}

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
                        expanded={this.state.expanded}
                        onToggle={this.toggleOptions.bind(this)}
                        onDelete={this.props.parameterDeleter}
                    />
                </td>
            </tr>
        );
    }
}

export default ParameterRow;
