const initState = {
    recipe: undefined,
    isLoading: true,
    err: false
};

export const recipeDetailsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_RECIPE_DETAILS_LOADING':
            return {...state, isLoading: true};
        case 'GET_RECIPE_DETAILS_SUCCESS':
            return {...state, recipe: action.payload, isLoading: false};
        case 'GET_RECIPE_DETAILS_FAILED':
            return {...state, err: true, isLoading: false};
        default:
            return state;
    }
};