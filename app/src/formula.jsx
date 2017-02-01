import React from 'react';

const FormulaInput = () => <input type="text" className="form-control" />;

const FormulaPreview = () => (
    <div className="card">
        <div className="card-block text-center text-muted">
            Human-readable version here
        </div>
    </div>
);

const Formula = () => (
    <div className="row">
        <div className="col">
            <h1>Write formula</h1>
            <FormulaInput />
            <FormulaPreview />
        </div>
    </div>
);

export default Formula;
