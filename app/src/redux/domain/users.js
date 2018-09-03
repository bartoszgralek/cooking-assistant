import * as Auth from "../../react/utils/Auth";
import {fetchData, SENDREQUEST} from "../../react/utils/WebUtils";
import {Base64} from "js-base64";

// ########################## ACTIONS  ##########################

const usersFetched = users => ({
    type: "FETCH_USERS_SUCCESS",
    payload: users
});

const usersFailed = () => ({type: 'FETCH_USERS_FAILED'});

const usersLoading = () => ({type: "FETCH_USERS_LOADING"});

export const fetchUsers = () => {
    return async(dispatch) => {
        dispatch({
            type: 'FETCH',
            payload: {
                url: "/users",
                method: 'GET'
            }
        });
    }
};


// ########################## REDUCERS ##########################

const initState = {
    isLoading: true,
    users: [],
    auth_err: false
};

export const usersReducer = (state = initState, action) => {
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


