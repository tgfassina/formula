import ParametersModel from './parameters.js'
import FormulaModel from './formula.js'
import EvaluatorModel from './evaluator.js'

class AppModel {
    constructor(stateHandler) {
        this.stateHandler = stateHandler

        this.parameters = new ParametersModel(this.getStateUpdater())
        this.formula = new FormulaModel(this.getStateUpdater())
        this.title = ''

        this.evaluator = new EvaluatorModel(
            this.getStateUpdater(),
            this.parameters,
            this.formula
        )
    }

    export() {
        return {
            parameters: this.parameters.export(),
            formulaPlaceholder: this.parameters.exportDefaultFormula(),
            formula: this.formula.export(),
            result: this.evaluator.export(),
            title: this.title,
        }
    }

    exportForDatabase() {
        return {
            data: {
                parameters: this.parameters.export(),
                formula: this.formula.export(),
                title: this.title,
            },
        }
    }

    import(data) {
        this.parameters.import(data.parameters)
        this.formula.import(data.formula)
        this.title = data.title
        this.getStateUpdater()()
    }


    getStateUpdater() {
        return () => (this.stateHandler(this.export()))
    }

    getParametersAdder() {
        return this.parameters.getAdder()
    }

    getParametersUpdater() {
        return this.parameters.getUpdater()
    }

    getParametersDeleter() {
        return this.parameters.getDeleter()
    }

    getValuesUpdater() {
        return this.parameters.getScopeUpdater()
    }

    getFormulaUpdater() {
        return this.formula.getUpdater()
    }

    getTitleUpdater() {
        return (title) => {
            this.title = title
            this.getStateUpdater()()
        }
    }
}

export default AppModel