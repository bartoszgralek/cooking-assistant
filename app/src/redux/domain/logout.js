import myHistory from "../../react/history/History";

const logoutStart = () => ({
    type: 'USER_LOGOUT_START'
});

const logoutSuccess = () => ({
    type: 'USER_LOGOUT_SUCCESS'
});

const logoutFailed = (err) => ({
    type: 'USER_LOGOUT_FAILED',
    payload: err
});

export const logout = () => {
    return dispatch => {
        dispatch({type: 'RESET'});
        localStorage.clear();
        myHistory.push("/");
    }
};


const initState = {
    isLoading: false,
    err: undefined
};

export const logoutReducer = (state = initState, action) => {
    switch (action.type) {
        case 'USER_LOGOUT_START':
            return {...state, isLoading: true};
        case 'USER_LOGOUT_SUCCESS':
            return {...state, isLoading: false};
        case 'USER_LOGOUT_FAILED':
            return {...state, isLoading: false, err: action.payload};
        default:
            return state;

    }
};