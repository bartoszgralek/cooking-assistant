import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './home/Home';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Router, Switch} from 'react-router-dom';
import Login from "./login/Login";
import Welcome from "./welcome/Welcome";
import myHistory from "./history/History";
import withAuthorization from './utils/RouteUtils';

class Index extends Component {

    render() {
        return (
            <Router history={myHistory}>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/welcome' component={withAuthorization(Welcome)}/>
                </Switch>
            </Router>
        );
    }

}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
