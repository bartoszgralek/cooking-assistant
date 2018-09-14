import React, {Component} from 'react';
import {Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import './Login.css';
import {connect} from "react-redux";
import {Loader} from "../loader/Loader";
import {access, login} from "../../redux/domain/access";

import {persistor} from "../../redux/store";
import {Header} from "../header/Header";
import {Top} from "../header/Top";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error: null
        };
    }

    validateForm() {
        return this.state.username.length >= 3 || this.state.username.length <= 1;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = async(event) => {
        event.preventDefault();
        await this.props.login(this.state.username, this.state.password);
        if(!this.props.auth_err) {
            persistor.persist();
        }
        this.setState({error: this.props.auth_err})
    };

    render() {

        return (
            <div className="around">

             <Top/>
                {this.props.isLoading ? <Loader/> :
            <Container className="Login">

                <h2>Sign In</h2>
                {<div style={{color: 'red'}}>{this.state.error}</div>}
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
                                invalid={!this.validateForm()}
                                onChange={this.handleChange}
                            />

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

            </Container>}
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        auth_err: state.auth.auth_err
    }
};

export default connect(mapStateToProps, {login})(Login);