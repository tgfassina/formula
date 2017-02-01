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
                className="btn btn-secondary btn-block"
                onClick={clickHandler}
            >
                Add
            </button>
        </td>
    </tr>
);

class ParametersTable extends React.Component {
    constructor(props) {
        super(props);
        this.tableRows = this.tableRows.bind(this);
        this.addRow = this.addRow.bind(this);

        this.state = {parameters: this.props.parameters || []};
    }

    tableRows() {
        let mapper = (text, i) => <ParametersTableRow key={i} flagText={text} />;
        return this.state.parameters.map(mapper);
    }

    addRow() {
        this.setState({parameters: this.state.parameters.concat(['clicked'])});
    }

    render() {
        return (
            <table className="table table-bordered">
                <tbody>
                    {this.tableRows()}
                    <ParametersTableFooter clickHandler={this.addRow} />
                </tbody>
            </table>
        );
    }
}

const Parameters = () => (
    <div className="row">
        <div className="col">
            <h1>Choose parameters</h1>
            <ParametersTable parameters={['vrau', 'test']}/>
        </div>
    </div>
);

export default Parameters;
