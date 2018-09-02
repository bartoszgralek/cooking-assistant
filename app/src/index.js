import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './react/home/Home';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Router, Switch} from 'react-router-dom';
import Login from "./react/login/Login";
import Welcome from "./react/welcome/Welcome";
import {PrivateRoute} from "./react/utils/Auth";
import {Provider} from "react-redux";
import {store, persistor} from "./redux/store";
import myHistory from "./react/history/History";
import { PersistGate } from 'redux-persist/integration/react'
import withAuthorization from './react/utils/Auth';

window.store = store;
window.persistor = persistor;

class Index extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router history={myHistory}>
                        <Switch>
                            <Route path='/' exact component={Home}/>
                            <Route path='/login' component={Login}/>
                            <Route path='/welcome' component={withAuthorization(Welcome)}/>
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        );
    }

}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
