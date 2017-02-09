import React from 'react';

class FormulaInput extends React.Component {
    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <input
                type="text"
                className="form-control formula-input"
                placeholder={this.props.placeholder}
                onChange={this.handleChange.bind(this)}
            />
        );
    }
}

class Formula extends React.Component {
    getPlaceholder() {
        let mapper = (parameter) => (parameter.variable);
        return this.props.parameters.map(mapper).join(' + ');
    }

    render() {
        return (
            <div className="col-12">
                <h1>Write formula</h1>
                <FormulaInput
                    placeholder={this.getPlaceholder()}
                    onChange={this.props.onUpdate}
                />
            </div>
        );
    }
}

export default Formula;
