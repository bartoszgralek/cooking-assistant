import React, {Component} from 'react';
import "../css/login.css";
import {login} from "../utils/access";
import {Loader} from './utils/Loader';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            error: null,
            response: null
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        login(this.state.username, this.state.password)
            .then(() => this.props.history.push("/home"))
            .catch(error => {
                if (!error.response) {
                    console.log(error.response);
                    // network error
                    this.setState({
                        error: 'No connection',
                        loading: false});
                } else {
                    this.setState({
                        error: error.response.data.message,
                        loading: false});
                }
            });
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    render() {
        if(this.state.loading) {
            return <Loader/>;
        }

        if(this.state.error === "No connection") {
            return <p className="content">{this.state.error + " " + this.state.response}</p>;
        }

        return (
            <div className="welcome">
                <h2>•&nbsp;Yokka&nbsp;•</h2>
                <form onSubmit={this.handleSubmit} className="login">
                    <label htmlFor="username"><b>Username</b></label>
                    <input value={this.state.username} onChange={this.handleChange} type="text" placeholder="Enter Username" name="username" id="username" required/>

                    <label htmlFor="psw"><b>Password</b></label>
                    <input value={this.state.password} onChange={this.handleChange} type="password" placeholder="Enter Password" name="password" id="password" required/>

                    <button type="submit">Login</button>
                    <p>{this.state.error}</p>
                </form>
            </div>

        );
    }
}

export default Login