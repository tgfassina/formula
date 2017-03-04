class ParametersModel {
    constructor(stateUpdater) {
        this.stateUpdater = stateUpdater
        this.count = 0
        this.data = []
        this.scope = {}
    }

    export() {
        return this.data
    }

    exportDefaultFormula() {
        const mapper = (parameter) => (parameter.variable)
        return this.data.map(mapper).join(' + ')
    }

    exportScope() {
        return Object.assign(this.getDefaultScope(), this.scope)
    }

    import(data) {
        this.count = data.length
        this.data = data
        this.stateUpdater()
    }


    getAdder() {
        return () => {
            this.count++

            const newParameter = {
                variable: ['X', this.count].join(''),
                defaultValue: '',
                label: '',
            }

            this.data.push(newParameter)
            this.stateUpdater()
        }
    }

    getUpdater() {
        return (key) => (attribute) => (value) => {
            this.data[key][attribute] = value
            this.stateUpdater()
        }
    }

    getDeleter() {
        return (key) => () => {
            this.data.splice(key, 1)
            this.stateUpdater()
        }
    }

    getScopeUpdater() {
        return (variable) => (value) => {
            this.scope[variable] = value
            this.stateUpdater()
        }
    }

    getDefaultScope() {
        return this.data.reduce((carry, param) => {
            carry[param.variable] = param.defaultValue
            return carry
        }, {})
    }
}

export default ParametersModel
