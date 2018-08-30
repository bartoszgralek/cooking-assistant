const initState = {
    menuToggle: false,
};

export const guiReducer = (state = initState, action) => {
    switch(action.type) {
        case 'TOGGLE_MENU':
            state.menuToggle = !state.menuToggle;
            return state;
        default:
            return state;
    }
};

