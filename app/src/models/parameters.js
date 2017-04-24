export const getEmptyModel = () => ({})

const isValidId = (id) => Number.parseInt(id, 10) >= 0

export const getChangeParameter = (model) => (id, parameter) => {
    if (!isValidId(id)) {
        throw new Error('id should be defined')
    }

    const changedCollection = {
        ...model,
        [id]: parameter,
    }

    return changedCollection
}

export const getCreateParameter = (model) => () => {
    const id = Object.values(model).length

    const parameter = {
        label: '',
        variable: `X${id + 1}`,
        defaultValue: '',
    }

    const changedCollection = {
        ...model,
        [id]: parameter,
    }

    return changedCollection
}

export const getDeleteParameter = (model) => (id) => {
    if (!isValidId(id)) {
        throw new Error('id should be defined')
    }

    const changedCollection = {
        ...model,
    }
    delete changedCollection[id]

    return changedCollection
}
