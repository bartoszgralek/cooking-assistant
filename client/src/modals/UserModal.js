import {hideModal, showModal} from '../redux/modalReducer'
import React from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import '../css/dots.css';
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import './UserModal.css';
import axios from 'axios';

export default class UserModal extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            role: 'ROLE_USER',
            error: null,
            password1: '',
            password2: '',
            loading: false,
            created: false
        };
    }



    validatePasswords = () => {
        const {password1, password2} = this.state;
        if(password1.length > 0 && password2.length > 0){
            if(password1 === password2) return 1;
            return -1
        }

        return 0;
    };

    componentDidMount() {
        if(this.props.mode === 'edit') {
            this.setState({
                username: this.props.user.username,
                password: this.props.user.password,
                role: this.props.user.role
            })
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({
            loading: true,
        });


        if (this.props.mode === 'new') {
            const user = {
                username: this.state.username,
                password: this.state.password,
                role: this.state.role
            };

            axios.post('/users', user)
                .then(
                    response => {
                            this.props.dispatch(showModal('CONFIRM',{text: 'User has been created!', dispatch: this.props.dispatch}))
                            this.props.addUser(response.data);
                        }
                ).catch(() => this.setState({
                loading: false,
                error: "User was not created"
            }));
        }else {
            const user = {
                id: this.props.user.id,
                username: this.state.username,
                password: this.state.password1,
                role: this.state.role
            };

            axios.put('/users', user)
                .then(
                    () => {
                        this.props.dispatch(showModal('CONFIRM',{text: 'User has been updated!', dispatch: this.props.dispatch}));
                        this.props.updateUser(user);
                    }
                ).catch(() => this.setState({
                loading: false,
                error: "User was not created"
            }));
        }
    };


    render() {
        return (
            <Modal isOpen={true}>
            <ModalHeader>{this.props.mode === 'new' ? 'Create new' : 'Edit'} user</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="username" className="mr-sm-2">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="Username" onChange={this.handleChange} value={this.state.username} />
                    </FormGroup>
                    {this.props.mode === 'new' && <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Password" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                    </FormGroup>}

                    {this.props.mode === 'edit' &&
                    <div>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="Password" className="mr-sm-2">New password</Label>
                            <Input type="password" name="password" id="password1" placeholder="Leave blank if no change" onChange={this.handleChange} value={this.state.password1} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="Password" className="mr-sm-2">Repeat password</Label>
                            <Input type="password" name="password" id="password2" placeholder="Repeat password" onChange={this.handleChange} value={this.state.password2} />
                        </FormGroup>
                        {this.validatePasswords() === 1 && <i className="fas fa-check" style={{color: "green"}}> Password match!</i>}
                        {this.validatePasswords() === -1 && <i className="fas fa-times" style={{color: "red"}}> Passwords don't match</i>}
                    </div>}

                    <FormGroup>
                        <Label for="exampleSelect">Select</Label>
                        <Input type="select" name="role" id="role" onChange={this.handleChange} value={this.state.role}>
                            <option selected="ROLE_USER" value="ROLE_USER">USER</option>
                            <option value="ROLE_ADMIN">ADMIN</option>
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Loader visible={this.state.loading} style={{margin: 'auto'}} color="#056571"/>
                <Button color="primary" onClick={this.handleSubmit} disabled={this.state.loading}>{this.props.mode === 'new' ? 'Create' : 'Update'}</Button>{' '}
                <Button color="secondary" onClick={() => this.props.dispatch(hideModal())} disabled={this.state.loading}>Cancel</Button>
                {this.state.error}
            </ModalFooter>
        </Modal>

        );
    }
}