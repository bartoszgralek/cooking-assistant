import {hideModal, showModal} from '../../redux/domain/modal'
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
            role: 'ROLE_USER',
            error: null
        };
    }

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


        if (this.props.mode === 'new') {
            const user = {
                username: this.state.username,
                password: this.state.password,
                role: this.state.role
            };

            this.props.dispatch({
                type: 'POST',
                payload: {
                    reducer: 'USERS',
                    url: "/users",
                    body: JSON.stringify(user)
                }
            });
        }else {
            const user = {
                id: this.props.user.id,
                username: this.state.username,
                password: this.state.password,
                role: this.state.role
            };

            this.props.dispatch({
                type: 'PUT',
                payload: {
                    reducer: 'USERS',
                    url: "/users",
                    body: JSON.stringify(user)
                }
            });
        }
    };


    render() {
        if(this.props.created) {
            if(this.props.mode === 'new')
                this.props.dispatch(showModal('CONFIRM',{text: 'User has been created!' ,dispatch: this.props.dispatch}));
            else
                this.props.dispatch(showModal('CONFIRM',{text: 'User has been updated!' ,dispatch: this.props.dispatch}));
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
                            <option selected="selected" value="ROLE_USER">USER</option>
                            <option value="ROLE_ADMIN">ADMIN</option>
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
