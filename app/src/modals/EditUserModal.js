import React, {Component} from 'react';
import {connect} from "react-redux";
import {editUser} from "../../redux/domain/editUser";
import {Loader} from "../loader/Loader";

class EditUserModal extends Component {


    render() {
        if(this.props.isLoading) {
            return <Loader/>;
        }
        if(this.props.err) {
            return <h2>Error during user load</h2>;
        }

        return (this.props.user && <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">

                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">{this.props.user.id}</h4>
                    </div>
                    <div className="modal-body">
                        <p>{this.props.user.username}</p>
                        <p>{this.props.user.role}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        user: state.editUserReducer.user,
        err: state.editUserReducer.err,
        isLoading: state.editUserReducer.isLoading
    }
};

export default connect(mapStateToProps, {editUser})(EditUserModal);