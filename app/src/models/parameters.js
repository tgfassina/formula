export const getEmptyModel = () => ({
    count: 0,
    collection: 0,
})

const isValidId = (id) => Number.parseInt(id, 10) >= 0

export const getChangeParameter = (model) => (id, parameter) => {
    if (!isValidId(id)) {
        throw new Error('id should be defined')
    }

    const changedCollection = {
        ...model.collection,
        [id]: parameter,
    }

    return { ...model, collection: changedCollection }
}

export const getCreateParameter = (model) => () => {
    const id = model.count

    const parameter = {
        id: id,
        label: '',
        variable: `X${id}`,
        defaultValue: '',
    }

    const changedCollection = {
        ...model.collection,
        [id]: parameter,
    }

    const nextCount = model.count + 1

    return { ...model, count: nextCount, collection: changedCollection }
}

export const getDeleteParameter = (model) => (id) => {
    if (!isValidId(id)) {
        throw new Error('id should be defined')
    }

    const changedCollection = {
        ...model.collection,
    }
    delete changedCollection[id]

    return { ...model, collection: changedCollection }
}
