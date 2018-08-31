import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import {recipesReducer} from "./domain/recipes";
import {accessReducer} from "./domain/login";
import {usersReducer} from "./domain/users";
import {editUserReducer} from "./domain/editUser";

const appReducer = combineReducers({ recipesReducer, accessReducer, usersReducer, editUserReducer});

export const logout = () => ({
    type: 'USER_LOGOUT'
});

const rootReducer = (state, action) => {

    if( action.type === 'USER_LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

// ################################ STORE ################################

export const store = createStore(rootReducer, applyMiddleware(thunk));