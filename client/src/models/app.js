import ParametersModel from './parameters.js';
import FormulaModel from './formula.js';

class AppModel {
    constructor(stateHandler) {
        this.stateHandler = stateHandler;

        this.parameters = new ParametersModel(this.getStateUpdater());
        this.formula = new FormulaModel(this.getStateUpdater());
    }

    getInitialState() {
        return {
            parameters: [],
            formulaPlaceholder: '',
            result: '-'
        };
    }

    getStateUpdater() {
        return () => (
            this.stateHandler({
                parameters: this.parameters.export(),
                formulaPlaceholder: this.formula.getDefault(this.parameters.export()),
                result: this.formula.evaluate(this.parameters.export())
            })
        );
    }

    getParametersAdder() {
        return this.parameters.getAdder();
    }

    getParametersUpdater() {
        return this.parameters.getUpdater();
    }

    getParametersDeleter() {
        return this.parameters.getDeleter();
    }

    getValuesUpdater() {
        return this.parameters.getValueUpdater();
    }

    getFormulaUpdater() {
        return this.formula.getUpdater();
    }
}

export default AppModel;
