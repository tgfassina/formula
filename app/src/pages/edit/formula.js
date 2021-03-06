import React from 'react'

import './formula.css'

import AppSection from '../../ui/app-section'

const FormulaInput = ({
    placeholder,
    onChange,
}) => (
    <input
        type="text"
        className="form-control formula-input"
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
    />
)

const Formula = ({placeholder, onChange}) => (
    <AppSection>
        <h1>Write formula</h1>
        <FormulaInput
            placeholder={placeholder}
            onChange={onChange}
        />
    </AppSection>
)

export default Formula
