import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {fetchUsers} from "../redux/actions";
import {Loader} from "../loader/Loader";

class UserList extends Component{

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        if(this.props.isLoading){
            return <Loader/>;
        }
        if(this.props.auth_err) {
            return <h2>You are not authorized!</h2>;
        }
        return <ul>
            {this.props.users.map(el => <li key={el.id}>{el.username}</li>)}
        </ul>;
    }

}

function mapStateToProps(state){
    return {
        users: state.adminReducer.users,
        isLoading: state.adminReducer.isLoading,
        auth_err: state.adminReducer.auth_err
    }
}

export default connect(mapStateToProps,{fetchUsers})(UserList);
