// ########################## ACTIONS  ##########################

import {showModal} from "./modal";

const usersFetched = users => ({
    type: "GET_USERS_SUCCESS",
    payload: users
});

const usersFailed = () => ({type: 'GET_USERS_FAILED'});

const usersLoading = () => ({type: "GET_USERS_LOADING"});

export const getUsers = () => {
    return async(dispatch) => {
        dispatch({
            type: 'GET',
            payload: {
                url: "/users",
                body: null
            }
        });
    }
};

// ########################## REDUCERS ##########################

const initState = {
    isLoading: false,
    users: [],
    auth_err: false,
    modalLoading: false,
    modalCreated: false
};

export const usersReducer = (state = initState, action) => {
    switch(action.type) {
        case 'GET_USERS_LOADING':
            return {...state, isLoading: true};
        case 'GET_USERS_SUCCESS':
            return {...state, users: action.payload, isLoading: false};
        case 'GET_USERS_FAILED':
            return {...state, auth_err: true, isLoading: false};
        case 'POST_USERS_LOADING':
            return {...state, modalLoading: true};
        case 'POST_USERS_SUCCESS':
            return {...state, modalLoading: false, modalCreated: true};
        case 'POST_USERS_FAILED':
            return {...state, modalLoading: false, auth_err: true};
        default:
            return state;
    }
};


