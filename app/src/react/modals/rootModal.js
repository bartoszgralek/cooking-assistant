import {EditUserModal} from '../../react/modals/editUserModal';
import React from 'react';
import {connect} from "react-redux";

const MODAL_COMPONENTS = {
    'EDIT_USER': EditUserModal
    /* other modals */
};

const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) {
        return null;
    }

    const SpecificModal = MODAL_COMPONENTS[modalType];
    return <SpecificModal {...modalProps} />
};

export default connect(
    state => state.modal
)(ModalRoot)
