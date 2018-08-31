import * as Auth from "../../react/utils/Auth";

// ########################## ACTIONS  ##########################

const recipesFetched = recipes => ({
    type: "FETCH_RECIPES_SUCCESS",
    payload: recipes
});

const recipesFailed = () => ({type: 'FETCH_RECIPES_FAILED'});

const recipesLoading = () => ({type: "FETCH_RECIPES_LOADING"});

export const fetchRecipes = () => {
    return async(dispatch) => {
        dispatch(recipesLoading());
        try{
            const response = await Auth.sendRequest("http://localhost:8080/recipes", "GET");
            if(response.ok) {
                const json = await response.json();
                dispatch(recipesFetched(json));
            }else{
                dispatch(recipesFailed());
            }
        }catch(err){
            console.log(err);
        }
    }

};

// ########################## REDUCERS ##########################

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






