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

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            console.log(action.modalProps);
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