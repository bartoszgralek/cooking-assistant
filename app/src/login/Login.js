import React, {Component} from 'react';
import {Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import './Login.css';
import {Loader} from "../loader/Loader";
import {GETUSER, STOREUSER} from "../utils/WebUtils";
import {Base64} from "js-base64";
import myHistory from "../history/History";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            err: false,
            isLoading: false
        };
    }

    validateForm() {
        return this.state.username.length >= 3;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = async(event) => {
        event.preventDefault();
        this.setState({isLoading: true});
        const response = await fetch("http://localhost:8080/login", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Base64.btoa(this.state.username+":"+this.state.password)
            }
        });
        console.log(response);
        if(response.ok){
            const user = await response.json();
            console.log(user);
            STOREUSER(user);
            console.log(GETUSER());
            this.setState({isLoading: false});
            myHistory.push("/welcome");
        }else {
            this.setState({err: true, isLoading: false});
        }
    };

    render() {
        if(this.state.isLoading) {
            return <Loader/>
        }
        return (
            <Container className="Login">
                <h2>Sign In</h2>
                {this.state.err && <h2>Bad credentials!</h2>}
                <Form className="form" onSubmit={this.handleSubmit}>
                    <Col>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                autoFocus
                                type="text"
                                id="username"
                                placeholder="john_doe"
                                value={this.state.username}
                                valid={this.validateForm()}
                                invalid={!this.validateForm()}
                                onChange={this.handleChange}
                            />
                            <FormFeedback valid>
                                That's a tasty looking username you've got there.
                            </FormFeedback>
                            <FormFeedback>
                                Uh oh! Username must be at least 3 characters long.
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="********"
                                value={ this.state.password }
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col className="text-center">
                        <Button
                            color="primary"
                            disabled={!this.validateForm()}
                            type="submit">
                            Submit
                        </Button>
                    </Col>
                </Form>
            </Container>
        );
    }
}