import React from 'react';
import {editUser} from "../../redux/domain/editUser";
import {connect} from "react-redux";

const EditUserButton = (props) => {
    return <button type="button" className="btn btn-info btn-sm" data-toggle="modal"
                   data-target="#myModal" onClick={() => props.editUser(props.userId)}>Edit
    </button>;
};

export default connect(null, {editUser})(EditUserButton);
