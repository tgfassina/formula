import React from 'react'

import AppSection from './parts/app-section.js'

class FormulaInput extends React.Component {
    handleChange(event) {
        this.props.onUpdate(event.target.value)
    }

    render() {
        return (
            <input
                type="text"
                className="form-control formula-input"
                placeholder={this.props.placeholder}
                onChange={this.handleChange.bind(this)}
            />
        )
    }
}

const Formula = ({placeholder, onUpdate}) => (
    <AppSection>
        <h1>Write formula</h1>
        <FormulaInput
            placeholder={placeholder}
            onUpdate={onUpdate}
        />
    </AppSection>
)

export default Formula
