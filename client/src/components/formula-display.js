import React from 'react'

const FormulaDisplay = ({formula}) => (
    <div>
        <input
            type="text"
            className="form-control text-center"
            disabled="disabled"
            value={formula}
            style={{margin: '2rem 0'}}
        />
    </div>
)

export default FormulaDisplay
