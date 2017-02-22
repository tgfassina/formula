class FormulaModel {
    constructor(stateUpdater) {
        this.stateUpdater = stateUpdater;
        this.data = '';
    }

    export() {
        return this.data;
    }

    getUpdater() {
        return (expression) => {
            this.data = expression;
            this.stateUpdater();
        }
    }
}

export default FormulaModel;
