import { createStore, combineReducers } from 'redux'
import { modalReducer } from "./modalReducer";

const rootReducer = combineReducers({modalReducer});

export const store = createStore(rootReducer);