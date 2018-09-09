import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Loader} from "../loader/Loader";

import './Users.css';
import {Button} from "reactstrap";
import ModalRoot from "../modals/rootModal";
import {showModal} from "../../redux/domain/modal";
import {LoadingDots} from "../loader/Dots";

class Users extends Component{

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const userList = this.props.users.map(el =>
            {
                return <tr key={el.id}>
                    <td>{el.id}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.username}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.role}</td>
                    <td>
                        <Button color="primary" onClick={() => this.props.editUser(el)} >Edit</Button>
                        <Button color="danger" onClick={() => this.props.deleteUserById(el.id)} disabled={this.props.me.id === el.id}>Delete</Button>
                    </td>
                </tr>
            }
        );

        if(this.props.isLoading){
            return <Loader/>;
        }
        if(this.props.auth_err) {
            return <h2>You are not authorized!</h2>;
        }

        return (
            <div className="users">
                <h2>User list</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList}
                    </tbody>
                </table>
                <Button color="success" onClick={this.props.newUser}>Add User</Button>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        users: state.usersReducer.users,
        isLoading: state.usersReducer.isLoading,
        auth_err: state.usersReducer.auth_err,
        me: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => {
            dispatch({
                type: 'GET',
                payload: {
                    reducer: 'USERS',
                    url: "/users",
                }
            });
        },
        editUser: user => {
            dispatch(showModal('USER_MODAL',{user, mode: 'edit', dispatch}));
        },
        deleteUserById: id => {
            dispatch({
                type: 'DELETE',
                payload: {
                    reducer: 'USERS',
                    url: '/users/'+id
                }
            })
        },
        newUser: () => {
            dispatch(showModal('USER_MODAL', {dispatch, mode: 'new'}))
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Users);
