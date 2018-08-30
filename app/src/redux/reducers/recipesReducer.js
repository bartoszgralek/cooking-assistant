const initState = {
    isLoading: true,
    recipes: [],
    error: false
};

export const recipesReducer = (state = initState, action) => {
    switch(action.type) {
        case 'FETCH_RECIPES_LOADING':
            return {...state, isLoading: true};
        case 'FETCH_RECIPES_SUCCESS':
            return {...state, recipes: action.payload, isLoading: false};
        case 'FETCH_RECIPES_FAILED':
            return {...state, error: true, isLoading: false};
        default:
            return state;
    }
};