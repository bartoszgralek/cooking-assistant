import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Home from './react/home/Home';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Router, Switch} from 'react-router-dom';
import Login from "./react/login/Login";
import myHistory from "./react/history/History";
import {persistor, store} from "./redux/store";
import {Provider} from "react-redux";
import Welcome from "./react/welcome/Welcome";
import withAuthorization from './react/utils/RouteUtils';
import { PersistGate } from 'redux-persist/integration/react'
import Header from "./react/header/Header";
import RecipeList from "./react/recipe/RecipeList";
import FakeHome from "./FakeHome";
import "./react/style/Scroll.css";
import {NotAuth} from "./react/loader/Unauth";

window.store = store;
window.persistor = persistor;

class Index extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router history={myHistory}>
                        <Switch>
                            <Route exact path="/" component={Login}/>
                            <Route path="/welcome" component={withAuthorization(Header)}/>
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        );
    }

}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
