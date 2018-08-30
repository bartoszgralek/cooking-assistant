import {combineReducers} from "redux";
import {guiReducer} from "./guiReducer";
import {recipesReducer} from "./recipesReducer";
import {accessReducer} from "./accessReducer";
import {adminReducer} from "./adminReducer";

export const appReducer = combineReducers({guiReducer, recipesReducer, accessReducer, adminReducer});



export const rootReducer = (state, action) => {

    if( action.type === 'USER_LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};