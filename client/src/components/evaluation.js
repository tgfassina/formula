import React from 'react'

import AppSection from './parts/app-section.js'
import EvaluationTester from './evaluation-tester.js'

const Evaluation = ({parameters, updater, result}) => (
    <AppSection>
        <h1>Evaluate</h1>
        <EvaluationTester
            parameters={parameters}
            updater={updater}
            result={result}
        />
    </AppSection>
)

export default Evaluation
