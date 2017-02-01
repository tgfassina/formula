import React from 'react';
import ReactDOM from 'react-dom';

import Parameters from './parameters.jsx';
import Formula from './formula.jsx';
import Evaluation from './evaluation.jsx';


const CreateFormula = () => (
    <div>
        <Parameters />
        <hr />
        <Formula />
        <hr />
        <Evaluation />
    </div>
);


ReactDOM.render(
    <CreateFormula />,
    document.getElementById('root')
);
