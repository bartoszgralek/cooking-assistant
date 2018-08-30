const initState = {
    isLoading: true,
    users: [],
    auth_err: false
};

export const adminReducer = (state = initState, action) => {
    switch(action.type) {
        case 'FETCH_USERS_LOADING':
            return {...state, isLoading: true};
        case 'FETCH_USERS_SUCCESS':
            return {...state, users: action.payload, isLoading: false};
        case 'FETCH_USERS_FAILED':
            return {...state, auth_err: true, isLoading: false};
        default:
            return state;
    }
};