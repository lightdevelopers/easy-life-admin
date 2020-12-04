const initalState = {
    restaurants: null,
}

const reducers = (state = initalState, action) => {
    switch(action.type) {
        case "GET_ALL_RESTAURANTS":
            return {
                ...state,
                restaurants: action.payload
            }
    }
    return {
        ...state
    }
}

export default reducers;