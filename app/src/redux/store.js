import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import {recipesReducer} from "./domain/recipes";
import {accessReducer} from "./domain/access";
import {usersReducer} from "./domain/users";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import reduxReset from 'redux-reset'
import {Base64} from "js-base64";
import {navReducer} from "./domain/nav";
import {modal} from "./domain/modal";

const appReducer = combineReducers({nav: navReducer, recipesReducer,auth: accessReducer, usersReducer, modal});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'nav']
};

const crudMethods = ["POST", "GET", "PUT", "DELETE"];

const isCrud = method => crudMethods.includes(method);

const requestMiddleware = store => next => async(action) => {
    console.log(action);

    if(isCrud(action.type)) {
        const part = action.payload.reducer;

      store.dispatch({
          type: action.type+"_"+part+"_LOADING"
      });

      try {
          const response = await fetch("http://localhost:8080"+action.payload.url, {
              method: action.type,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic ' + Base64.btoa(store.getState().auth.user.username +":"+ store.getState().auth.user.password)
              },
              body: action.payload.body
          });

          if(response.ok) {
              const data = await response.json();
              return next({
                  type: action.type+"_"+part+"_SUCCESS",
                  payload: data
              });
          }else {
              return next({
                  type: action.type+"_"+part+"_FAILED"
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

