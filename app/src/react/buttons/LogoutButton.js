import React, {Component} from 'react';
import {Button} from "reactstrap";
import * as Auth from '../utils/Auth';
import browserHistory from '../history/History';

class LogoutButton extends Component{

    handleLogout() {
        Auth.logout();
        browserHistory.push('/');
    }

    render() {
        return <Button color="secondary" onClick={this.handleLogout}>Logout</Button>;
    }
}



export default LogoutButton;