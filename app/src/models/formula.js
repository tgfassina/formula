class FormulaModel {
    constructor(stateHandler, stateKey) {
        this.expression = '';

        this.stateKey = stateKey;
        this.stateHandler = stateHandler;
    }

    setState() {
        this.stateHandler({[this.stateKey]: this.expression});
    }

    updater(expression) {
        this.expression = expression;
        this.setState();
    }
}

export default FormulaModel;
