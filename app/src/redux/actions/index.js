import {TOGGLE_MENU} from "../constans/index";
import * as Auth from '../../utils/Auth';
import browserHistory from "../../History";
import Theme from '../../colors/index';

export const toggle_menu = () => ({type: TOGGLE_MENU});

export const logout = () => ({type: 'USER_LOGOUT'});

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

const usersFetched = users => ({
    type: "FETCH_USERS_SUCCESS",
    payload: users
});

const usersFailed = () => ({type: 'FETCH_USERS_FAILED'});

const usersLoading = () => ({type: "FETCH_USERS_LOADING"});

export const fetchUsers = () => {
    return async(dispatch) => {
        dispatch(usersLoading());
        try{
            const response = await Auth.sendRequest("http://localhost:8080/users", "GET");
            if(response.ok) {
                const json = await response.json();
                dispatch(usersFetched(json));
            }else{
                dispatch(usersFailed());
            }
        }catch(err){
            console.log(err);
        }
    }
};

export const loginLoading = (username, password) => ({
    type: 'LOGIN_LOADING',
    payload: {username, password}
});

export const loginSuccess = (role) => ({
    type: 'LOGIN_SUCCESS',
    payload: role
});

export const loginFailed = () => ({
   type: 'LOGIN_FAILED',
   payload: 'Bad credentials!'
});

export const login = (username, password) => {
    return async(dispatch) => {
        dispatch(loginLoading(username, password));
        try{
            const response = await Auth.login(username, password);
            if(response.ok) {
                const data = await response.json();
                console.log(data);
                Auth.storeData(username, password, data.role);
                dispatch(loginSuccess(data.role));
                browserHistory.push("/welcome");
            }else{
                dispatch(loginFailed());
            }
        }catch(err) {
            console.log(err);
        }
    }
};

export const change_theme = (base, base_lighter, base_darker, second, third) => ({
    type: 'CHANGE_THEME',
    payload: {base, base_lighter, base_darker, second, third}
});