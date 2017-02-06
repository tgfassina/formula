import React from 'react';

class FormulaInput extends React.Component {
    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <input
                type="text"
                className="form-control"
                placeholder={this.props.placeholder}
                onChange={this.handleChange.bind(this)}
            />
        );
    }
}

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
                        onChange={this.props.onUpdate}
                    />
                    {false ? <FormulaPreview /> : null}
                </div>
            </div>
        );
    }
}

export default Formula;
