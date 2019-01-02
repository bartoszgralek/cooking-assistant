import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from "./App";
import {
    Switch,
    Router,
    Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";
import {store} from './redux/store';
import {Provider} from "react-redux";
import {store as myStore} from './redux/store';
import history from './utils/history';

window.store = myStore;

class Index extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route path="/home" component={App}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }

}


ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
