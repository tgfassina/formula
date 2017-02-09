import React from 'react';

import AppSection from './parts/app-section.js';

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
            <AppSection>
                <h1>Write formula</h1>
                <FormulaInput
                    placeholder={this.getPlaceholder()}
                    onChange={this.props.onUpdate}
                />
            </AppSection>
        );
    }
}

export default Formula;
