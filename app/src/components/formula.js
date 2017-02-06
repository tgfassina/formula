import React from 'react';

const FormulaInput = ({placeholder}) => (
    <input
        type="text"
        className="form-control"
        placeholder={placeholder}
    />
);

const FormulaPreview = () => (
    <div className="card formula-display">
        <div className="card-block text-center text-muted">
            Human-readable version here
        </div>
    </div>
);

class Formula extends React.Component {
    getPlaceholder() {
        let mapper = (parameter) => (parameter.variable);
        return this.props.parameters.map(mapper).join(' + ');
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <h1>Write formula</h1>
                    <FormulaInput
                        placeholder={this.getPlaceholder()}
                    />
                    <FormulaPreview />
                </div>
            </div>
        );
    }
}

export default Formula;
