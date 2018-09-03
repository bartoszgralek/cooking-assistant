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
import {Base64} from "js-base64";



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

const requestMiddleware = store => next => async(action) => {
    console.log(action);
  if(action.type === 'FETCH') {

      try {
          const response = await fetch("http://localhost:8080"+action.payload.url, {
              method: action.payload.method,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic ' + Base64.btoa(store.getState().auth.user.username +":"+ store.getState().auth.user.password)
              },
              body: action.payload.body
          });

          const length = action.payload.url.length;
          const part = action.payload.url.substring(1, length).toUpperCase();

          if(response.ok) {
              const data = await response.json();
              return next({
                  type: "FETCH_"+part+"_SUCCESS",
                  payload: data
              });
          }else {
              return next({
                  type: "FETCH_"+part+"_FAILED"
              });
          }
      }catch(err) {
          console.log(err);
      }
  }

  return next(action);

};

const enHanceCreateStore = compose(
    applyMiddleware(thunk, requestMiddleware),
    reduxReset()  // Will use 'RESET' as default action.type to trigger reset
)(createStore);



// ################################ STORE ################################

const persistedReducer = persistReducer(persistConfig, appReducer);
export const store = enHanceCreateStore(persistedReducer);
export const persistor = persistStore(store);

