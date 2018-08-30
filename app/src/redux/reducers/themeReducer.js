const initState = {
    base: '#77dd77',
    base_lighter: "#90dd90",
    base_darker: "#4add4b",
    pink: "#ffd1dc",
    white: "#eee"
};

export const themeReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE_THEME':
            return action.payload;
        default:
            return state;
    }
};