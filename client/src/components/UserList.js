import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Button} from "reactstrap";
import {NotAuth} from "./utils/NotAuth";
import {Loader} from "./utils/Loader";
import {showModal} from "../redux/modalReducer";
import axios from "axios";

class UserList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            err: false,
            users: [],
        };

    }

    addUser = user => {
        this.setState({
            users: [...this.state.users, user]
        });
    };

    updateUser = user => {
        const index = this.state.users.findIndex(x => x.id === user.id);
        const newArray = this.state.users.slice();
        newArray[index] = user;
        this.setState({
            users: newArray
        });
    };

    componentDidMount() {
        axios.get('/users')
            .then(response => {
                console.log(response);
                this.setState({users: response.data, loading: false})
            })
            .catch(err => this.setState({err: err, loading: false}))
    }

    deleteUser = user => {
        axios.delete('/users/' + user.id)
            .then(() =>
                this.setState(previous => {
                    return {
                        users: previous.users.filter(el => el.id !== user.id)
                    }
                })
            )
    };

    render() {
        const userList = this.state.users.map(el =>
            {
                return <tr key={el.id}>
                    <td>{el.id}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.username}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.role}</td>
                    <td>
                        <Button color="primary" onClick={() => this.props.editUser(el, this.updateUser)} >Edit</Button>
                        <Button color="danger" onClick={() => this.deleteUser(el)} disabled={localStorage.getItem("username") === el.username}>Delete</Button>
                    </td>
                </tr>
            }
        );

        if(this.state.loading){
            return <Loader/>;
        }
        if(this.props.err) {
            return <NotAuth/>;
        }

        return (
            <div className="list content">
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
                <Button color="success" onClick={() => this.props.newUser(this.addUser)}>Add User</Button>
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        editUser: (user, updateUser) => {
            dispatch(showModal('USER_MODAL',{user, mode: 'edit', dispatch, updateUser: updateUser}));
        },
        newUser: addUser => {
            dispatch(showModal('USER_MODAL', {dispatch, mode: 'new', addUser: addUser}))
        }
    }
};

export default connect(null, mapDispatchToProps)(UserList);
