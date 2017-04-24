import React from 'react'

import AppSection from './parts/app-section.js'
import ParameterRow from './parameter-row.js'

const ParametersTableFooter = ({
    onAdd,
}) => (
    <tfoot>
        <tr>
            <td colSpan="3">
                <button
                    className="btn btn-secondary btn-block btn-sm"
                    onClick={(event) => onAdd(null, {})}
                >
                    <i className="fa fa-plus" /> Add
                </button>
            </td>
        </tr>
    </tfoot>
)

const ParametersTableEmpty = () => (
    <tr>
        <td colSpan="3" className="text-muted text-center">
            <em className="empty-table-message">Empty</em>
        </td>
    </tr>
)

const ParametersTableBody = ({
    parameters,
    onChangeParameter,
    onDeleteParameter,
}) => {
    const rows = Object.values(parameters).map((parameter = {}, i) => (
        <ParameterRow
            key={i}
            parameter={parameter}
            onDelete={() => onDeleteParameter(i)}
            onChange={(parameter) => onChangeParameter(i, parameter)}
        />
    ))
    return (<tbody>
        { rows.length ? rows : <ParametersTableEmpty /> }
    </tbody>)
}

const Parameters = ({
    parameters,
    onCreateParameter,
    onChangeParameter,
    onDeleteParameter,
}) => (
    <AppSection>
        <h1>Choose parameters</h1>
        <table className="table table-bordered table-sm">
            <ParametersTableBody
                parameters={parameters}
                onChangeParameter={onChangeParameter}
                onDeleteParameter={onDeleteParameter}
            />
            <ParametersTableFooter
                onAdd={() => onCreateParameter()}
            />
        </table>
    </AppSection>
)

export default Parameters
