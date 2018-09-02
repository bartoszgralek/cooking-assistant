import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import {recipesReducer} from "./domain/recipes";
import {accessReducer} from "./domain/login";
import {usersReducer} from "./domain/users";
import {editUserReducer} from "./domain/editUser";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import {logoutReducer} from "./domain/logout";
import reduxReset from 'redux-reset'



//
// const rootReducer = (state, action) => {
//
//     if( action.type === 'USER_LOGOUT') {
//         myHistory.push("/");
//         state = undefined;
//     }
//
//     return appReducer(state, action);
// };




const appReducer = combineReducers({ recipesReducer,auth: accessReducer, usersReducer, editUserReducer});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

const enHanceCreateStore = compose(
    applyMiddleware(thunk),
    reduxReset()  // Will use 'RESET' as default action.type to trigger reset
)(createStore);



// ################################ STORE ################################

const persistedReducer = persistReducer(persistConfig, appReducer);
export const store = enHanceCreateStore(persistedReducer);
export const persistor = persistStore(store);

