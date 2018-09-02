import React, {Component} from 'react';
import {Loader} from "../loader/Loader";
import './Users.css';
import ButtonWithModal from "../buttons/ButtonWithModal";
import {SENDREQUEST} from "../utils/WebUtils";

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            err: false
        }
    }


    async componentDidMount() {
        const response = await SENDREQUEST("/users", 'GET');
        if(response.ok) {
            const users = await response.json();
            this.setState({
                users: users,
                isLoading: false
            });
        }else {
            this.setState({
                err: true,
                isLoading: false
            });
        }
    }

    render() {
        const userList = this.state.users.map(el => {
                return <tr key={el.id}>
                    <td>{el.id}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.username}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.role}</td>
                    <td><ButtonWithModal user={el} buttonLabel='Edit'/></td>
                </tr>
            }
        );

        if (this.state.isLoading) {
            return <Loader/>;
        }
        if (this.state.err) {
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