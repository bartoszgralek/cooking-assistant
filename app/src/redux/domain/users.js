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
        case 'DELETE_USERS_LOADING':
            return {...state, isLoading: true};
        case 'DELETE_USERS_SUCCESS':
            return {...state, users: state.users.filter(user => user.id !== action.payload), isLoading: false};
        case 'DELETE_USERS_FAILED':
            return {...state, error: true, isLoading: false};
        case 'POST_USERS_LOADING':
            return {...state, modalLoading: true};
        case 'POST_USERS_SUCCESS':
            return {...state, modalLoading: false, modalCreated: true, users: [...state.users, action.payload]};
        case 'POST_USERS_FAILED':
            return {...state, modalLoading: false, auth_err: true};
        case 'POST_USERS_CONFIRMED':
            return {...state, modalCreated: false};
        case 'PUT_USERS_LOADING':
            return {...state, modalLoading: true};
        case 'PUT_USERS_SUCCESS':
            const index = state.users.findIndex(x => x.id === action.payload.id);
            const newArray = state.users.slice();
            newArray[index] = action.payload;
            return {...state, modalLoading: false, modalCreated: true, users: newArray};
        case 'PUT_USERS_FAILED':
            return {...state, modalLoading: false, auth_err: true};
        case 'PUT_USERS_CONFIRMED':
            return {...state, modalCreated: false};
        default:
            return state;
    }
};


