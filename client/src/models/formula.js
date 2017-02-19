class FormulaModel {
    constructor(stateUpdater) {
        this.stateUpdater = stateUpdater;
        this.expression = '';
    }

    export() {
        return this.expression;
    }

    getUpdater() {
        return (expression) => {
            this.expression = expression;
            this.stateUpdater();
        }
    }
}

export default FormulaModel;
