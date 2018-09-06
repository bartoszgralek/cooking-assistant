
// ########################## ACTIONS  ##########################

const recipesFetched = recipes => ({
    type: "GET_RECIPES_SUCCESS",
    payload: recipes
});

const recipesFailed = () => ({type: 'GET_RECIPES_FAILED'});

const recipesLoading = () => ({type: "GET_RECIPES_LOADING"});

// ########################## REDUCERS ##########################

const initState = {
    isLoading: false,
    recipes: [],
    error: false
};

export const recipesReducer = (state = initState, action) => {
    switch(action.type) {
        case 'GET_RECIPES_LOADING':
            return {...state, isLoading: true};
        case 'GET_RECIPES_SUCCESS':
            return {...state, recipes: action.payload, isLoading: false};
        case 'GET_RECIPES_FAILED':
            return {...state, error: true, isLoading: false};
        case 'DELETE_RECIPES_LOADING':
            return {...state, isLoading: true};
        case 'DELETE_RECIPES_SUCCESS':
            return {...state, recipes: state.recipes.filter(recipe => recipe.id !== action.payload), isLoading: false};
        case 'DELETE_RECIPES_FAILED':
            return {...state, error: true, isLoading: false};
        default:
            return state;
    }
};






