import React from 'react';
import {connect} from "react-redux";
import UserModal from './UserModal';
import ConfirmModal from "./ConfirmModal";
import RecipeModal from "./RecipeModal";

const MODAL_COMPONENTS = {
    'USER_MODAL': UserModal,
    'RECIPE_MODAL': RecipeModal,
    'CONFIRM': ConfirmModal,
    /* other modals */
};

const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) {
        return null;
    }
    console.log(modalType);

    const SpecificModal = MODAL_COMPONENTS[modalType];
    return <SpecificModal {...modalProps} />
};

export default connect(
    state => state.modalReducer
)(ModalRoot)
