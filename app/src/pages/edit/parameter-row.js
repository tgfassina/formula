import React from 'react'

const ParameterVariable = ({variable}) => (
    <span className="badge badge-default">
        {variable}
    </span>
)

const ParameterLabel = ({
    label = '',
    onChange,
}) => (
    <input
        type="text"
        className="form-control form-control-sm"
        value={label}
        onChange={(event) => onChange(event.target.value)}
    />
)

const ParameterDefaultValue = ({
    value = '',
    onChange,
}) => (
    <div className="inline-control-group text-right">
        <label><small>Default value</small></label>
        <input
            type="number"
            className="form-control form-control-sm"
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
    </div>
)

const ParameterOptions = ({parameter, onChange}) => (
    <ParameterDefaultValue
        value={parameter.defaultValue}
        onChange={onChange}
    />
)

const ParameterConfig = ({parameter, onChange, expanded}) => (
    <div>
        <ParameterLabel
            label={parameter.label}
            onChange={(label) => onChange({...parameter, label: label})}
        />

        {expanded ?
            <div className="parameter-extra">
                <ParameterOptions
                    parameter={parameter}
                    onChange={(defaultValue) => onChange({...parameter, defaultValue: defaultValue})}
                />
            </div>
        : null}
    </div>
)

class ParameterActions extends React.Component {
    toggleHandler() {
        this.props.onToggle()
    }

    deleteHandler() {
        this.props.onDelete()
    }

    render() {
        return (
            <div>
                <button
                    className="btn btn-sm btn-block btn-secondary"
                    onClick={this.toggleHandler.bind(this)}
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
                            onClick={this.deleteHandler.bind(this)}
                        >
                            <i className="fa fa-trash-o" />
                        </button>
                    </div>
                : null}
            </div>
        )
    }
}

class ParameterRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {expanded: false}
    }

    toggleOptions() {
        this.setState({expanded: !this.state.expanded})
    }

    render() {
        const {
            parameter,
            onChange,
            onDelete,
        } = this.props

        return (
            <tr>
                <td className="text-right">
                    <ParameterVariable variable={parameter.variable} />
                </td>
                <td>
                    <ParameterConfig
                        parameter={parameter}
                        onChange={onChange}
                        expanded={this.state.expanded}
                    />
                </td>
                <td className="text-center table-row-actions">
                    <ParameterActions
                        onToggle={() => this.toggleOptions()}
                        onDelete={onDelete}
                        expanded={this.state.expanded}
                    />
                </td>
            </tr>
        )
    }
}

export default ParameterRow
