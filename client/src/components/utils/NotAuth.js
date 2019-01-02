import React from 'react';
import history from '../../utils/history';
import "../../css/button.css";
export const NotAuth = () =>
    <div className="content"><h2 style={{
    color: '#FF6A5C',
    textAlign: 'center'
}} >
        <i className="fas fa-lock"></i><br/>
    You are not authorized!</h2>
        <button onClick={() => history.push("/")} className="loginbutton">Login</button>
    </div>;

