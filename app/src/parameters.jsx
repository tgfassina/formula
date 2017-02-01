import React from 'react';

const ParameterFlag = ({flagText}) => (
    <span className="badge badge-default">
        ${flagText}
    </span>
);

const ParameterName = () => (
    <input type="text" className="form-control form-control-sm" />
);

const ParameterOptions = () => <i className="fa fa-chevron-down" />;

const ParametersTableRow = ({flagText}) => (
    <tr>
        <td className="text-right">
            <ParameterFlag flagText={flagText} />
        </td>
        <td>
            <ParameterName />
        </td>
        <td className="text-center">
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

class ParametersTable extends React.Component {
    constructor(props) {
        super(props);
        this.mapTableRows = this.mapTableRows.bind(this);
    }

    mapTableRows() {
        let mapper = (text, i) => <ParametersTableRow key={i} flagText={text} />;
        return this.props.parameters.map(mapper);
    }

    render() {
        return (
            <table className="table table-bordered table-sm">
                <tbody>
                    {this.mapTableRows()}
                    <ParametersTableFooter clickHandler={this.props.addHandler} />
                </tbody>
            </table>
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
