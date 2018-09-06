import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Loader} from "../loader/Loader";

import './Users.css';
import {Button} from "reactstrap";
import ModalRoot from "../modals/rootModal";
import {showModal} from "../../redux/domain/modal";

class Users extends Component{

    componentDidMount() {
        this.props.getUsers();
    }

    render() {

        if(this.props.isLoading){
            return <Loader/>;
        }
        if(this.props.auth_err) {
            return <h2>You are not authorized!</h2>;
        }

        const userList = this.props.users.map(el =>
            {
                return <tr key={el.id}>
                    <td>{el.id}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.username}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.role}</td>
                    <td>
                        <Button color="danger" onClick={() => this.props.editUser(el)} />
                        <ModalRoot/>
                    </td>
                </tr>
            }
        );

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
            dispatch(showModal('EDIT_USER',{user, dispatch}));
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Users);
