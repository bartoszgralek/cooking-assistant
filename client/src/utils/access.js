import axios from 'axios';
import history from "./history";

export const login = (username, password) => {
    axios.defaults.baseURL = 'http://localhost:8080';
    return new Promise((resolve, reject) => {
        axios.get('/login', {
            headers: {
                    'Authorization': 'Basic ' + btoa(username+":"+password)
                }
        }).then(response => {
            console.log(response);
            if(response.status === 200) {

                axios.defaults.headers.common['Authorization'] = "Basic " + btoa(username + ":" + password);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
                localStorage.setItem("role", response.data.role);
                resolve("ok");
            }
        }).catch(() => reject("bad credentials"));
    });
};

export const logout = () => {
    localStorage.clear();
    history.push("/");
};

// autologin self-calling function
(function() {
    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");
    axios.defaults.headers.common['Authorization'] = "Basic " + btoa(username + ":" + password);
    axios.defaults.baseURL = 'http://localhost:8080';
})();



export const updateUser = user => {
  console.log(user);
};