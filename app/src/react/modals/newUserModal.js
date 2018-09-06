import { hideModal } from '../../redux/domain/modal'
import React from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";
import './dots.css';
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'

class NewUserModal extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            role: 'USER',
            error: null,
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

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.dispatch({
            type: 'POST',
            payload: {
                reducer: 'USERS',
                url: "/users",
                body: JSON.stringify(user)
            }
        });
    };


    render() {
        if(this.props.created) {
            this.props.dispatch(hideModal());
        }

        return (
            <Modal isOpen={true}>
            <ModalHeader>Create new user</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="username" className="mr-sm-2">Email</Label>
                        <Input type="text" name="username" id="username" placeholder="Username" onChange={this.handleChange} value={this.state.username} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Password" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Select</Label>
                        <Input type="select" name="role" id="role" onChange={this.handleChange} value={this.state.role}>
                            <option selected="selected" value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Loader visible={this.props.loading} style={{margin: 'auto'}} color="#ffd1dc"/>
                <Button color="primary" onClick={this.handleSubmit}>Create</Button>{' '}
                <Button color="secondary" onClick={() => this.props.dispatch(hideModal())}>Cancel</Button>
            </ModalFooter>


        </Modal>

        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.usersReducer.modalLoading,
        created: state.usersReducer.modalCreated
    }
};

export default connect(mapStateToProps)(NewUserModal);
