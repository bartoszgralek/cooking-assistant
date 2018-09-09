import myHistory from "../../react/history/History";
import {Base64} from 'js-base64';
// ########################## ACTIONS  ##########################

const loginLoading = () => ({
    type: 'LOGIN_LOADING'
});

const loginSuccess = user => ({
    type: 'LOGIN_SUCCESS',
    payload: user
});

const loginFailed = () => ({
    type: 'LOGIN_FAILED',
    payload: 'Bad credentials!'
});

export const login = (username, password) => {
    return async(dispatch) => {
        dispatch(loginLoading(username, password));
        try{
            const response = await fetch("http://localhost:8080/login", {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + Base64.btoa(username+":"+password)
                }
            });

            if(response.ok) {
                const data = await response.json();
                console.log(data);
                dispatch(loginSuccess({...data, password: password}));
                myHistory.push("/welcome");
            }else{
                dispatch(loginFailed());
            }
        }catch(err) {
            console.log(err);
        }
    }
};

export const updateUser = user => {
    return dispatch => {
        dispatch({
            type: 'UPDATE_USER',
            payload: user
        })
    }
};

// ########################## REDUCERS ##########################

const initState = {
    isLoading: false,
    user: undefined,
    auth_err: false,
    card: 'home'
};

export const accessReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_LOADING':
            return {...state, isLoading: true};
        case 'LOGIN_SUCCESS':
            return {...state, isLoading: false, user: action.payload};
        case 'LOGIN_FAILED':
            return {...state, isLoading: false, auth_err: action.payload};
        case 'SET_NAV':
            return {...state, card: action.payload};
        case 'UPDATE_USER':
            return state.user.id === action.payload.id ? {...state, user: action.payload} : state;
        default:
            return state;

    }
};


