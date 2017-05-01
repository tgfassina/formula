import React from 'react'

import AppSection from '../../ui/app-section'
import EvaluationTester from '../../ui/evaluation-tester'

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
