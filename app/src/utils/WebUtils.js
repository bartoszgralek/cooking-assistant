import {Base64} from "js-base64";
import React from 'react';
import myHistory from "../history/History";

//capital names of variables indicate shared methods

export const STOREUSER = user => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const GETUSER = () => {
    const string = localStorage.getItem('user');
    console.log("user string " + string);
    const user = JSON.parse(string);
    console.log(user);
    return string;
};

export const SENDREQUEST = async(url, method, body) => {
    const user = GETUSER();
    try {
        const response = await fetch("http://localhost:8080" + url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Base64.btoa(user.username+":"+user.password)
            },
            body: body
        });
        console.log(response);
        return response;
    }catch(err) {
        console.log(err);
    }
};

export const LOGOUT = () => {
    localStorage.clear();
    myHistory.push("/");
};

// todo: rething ISAUTHED method

export const ISAUTHED = () => {
    return true;
};

export const ISADMIN = () => {
    console.log(localStorage.getItem('user').role);
    console.log(localStorage.getItem('user') && localStorage.getItem('user').role === 'ROLE_ADMIN');
    return localStorage.getItem('user') && localStorage.getItem('user').role === 'ROLE_ADMIN';
};
