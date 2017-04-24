import React from 'react'

import AppSection from './parts/app-section.js'
import EvaluationTester from './evaluation-tester.js'

const Evaluation = ({parameters, formula}) => (
    <AppSection>
        <h1>Evaluate</h1>
        <EvaluationTester
            parameters={parameters}
            formula={formula}
        />
    </AppSection>
)

export default Evaluation
