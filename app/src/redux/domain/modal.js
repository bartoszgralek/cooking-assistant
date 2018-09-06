import React from 'react';

export const showModal = (modalType, modalProps) => ({
    type: 'SHOW_MODAL',
    modalType: modalType,
    modalProps: modalProps
});

export const hideModal = () => ({
   type: 'HIDE_MODAL'
});

const initialState = {
    modalType: null,
    modalProps: {}
};

export const modal = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            };
        case 'HIDE_MODAL':
            return initialState;
        default:
            return state;
    }
};