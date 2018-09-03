import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Loader} from "../loader/Loader";
import {fetchUsers} from "../../redux/domain/users";

import './Users.css';
import ButtonWithModal from "../buttons/ButtonWithModal";

class Users extends Component{

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const userList = this.props.users.map(el =>
            {
                return <tr key={el.id}>
                    <td>{el.id}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.username}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.role}</td>
                    <td><ButtonWithModal user={el} buttonLabel='Edit'/></td>
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
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        users: state.usersReducer.users,
        isLoading: state.usersReducer.isLoading,
        auth_err: state.usersReducer.auth_err
    }
}

export default connect(mapStateToProps,{fetchUsers})(Users);
