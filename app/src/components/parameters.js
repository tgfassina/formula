import React from 'react'

import AppSection from './parts/app-section.js'
import ParameterRow from './parameter-row.js'

class ParametersTableFooter extends React.Component {
    clickHandler() {
        this.props.onAdd()
    }

    render() {
        return (
            <tr>
                <td colSpan="3">
                    <button
                        className="btn btn-secondary btn-block btn-sm"
                        onClick={this.clickHandler.bind(this)}
                    >
                        <i className="fa fa-plus" /> Add
                    </button>
                </td>
            </tr>
        )
    }
}

const ParametersTableEmpty = () => (
    <tr>
        <td colSpan="3" className="text-muted text-center">
            <em className="empty-table-message">Empty</em>
        </td>
    </tr>
)

class ParametersTable extends React.Component {
    mapTableRows() {
        const mapper = (parameter, i) => (
            <ParameterRow
                key={parameter.variable}
                parameter={parameter}
                updater={this.props.updater(i)}
                onDelete={this.props.deleter(i)}
            />
        )
        const rows = this.props.parameters.map(mapper)
        return rows.length ? rows : <ParametersTableEmpty />
    }

    render() {
        return (
            <table className="table table-bordered table-sm">
                <tbody>
                    {this.mapTableRows()}
                    <ParametersTableFooter onAdd={this.props.onAdd} />
                </tbody>
            </table>
        )
    }
}

const Parameters = ({parameters, onAdd, updater, deleter}) => (
    <AppSection>
        <h1>Choose parameters</h1>
        <ParametersTable
            parameters={parameters}
            onAdd={onAdd}
            updater={updater}
            deleter={deleter}
        />
    </AppSection>
)

export default Parameters
