import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './home/Home';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Router, Switch} from 'react-router-dom';
import Login from "./login/Login";
import Welcome from "./welcome/Welcome";
import {PrivateRoute} from "./utils/Auth";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import myHistory from "./History";

window.store = store;

class Index extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router history={myHistory}>
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/login' component={Login}/>
                        <PrivateRoute path='/welcome' component={Welcome}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }

}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
