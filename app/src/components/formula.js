import React from 'react'

import AppSection from './parts/app-section.js'

const FormulaInput = ({
    placeholder,
    onUpdate,
}) => (
    <input
        type="text"
        className="form-control formula-input"
        placeholder={placeholder}
        onChange={(event) => onUpdate(event.target.value)}
    />
)

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
