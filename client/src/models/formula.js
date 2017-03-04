class FormulaModel {
    constructor(stateUpdater) {
        this.stateUpdater = stateUpdater
        this.data = ''
    }

    export() {
        return this.data
    }

    import(data) {
        this.data = data
        this.stateUpdater()
    }


    getUpdater() {
        return (expression) => {
            this.data = expression
            this.stateUpdater()
        }
    }
}

export default FormulaModel
