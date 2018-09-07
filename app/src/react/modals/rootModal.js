import {EditUserModal} from '../../react/modals/editUserModal';
import React from 'react';
import {connect} from "react-redux";
import {EditRecipeModal} from "./editRecipeModal";
import NewUserModal from './newUserModal';
import ConfirmModal from "./confirmModal";

const MODAL_COMPONENTS = {
    'EDIT_USER': EditUserModal,
    'EDIT_RECIPE': EditRecipeModal,
    'USER_MODAL': NewUserModal,
    'CONFIRM': ConfirmModal,
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
