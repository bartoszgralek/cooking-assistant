import * as Auth from "../../react/utils/Auth";
import browserHistory from "../../react/history/History";

// ########################## ACTIONS  ##########################

const loginLoading = (username, password) => ({
    type: 'LOGIN_LOADING',
    payload: {username, password}
});

const loginSuccess = (role) => ({
    type: 'LOGIN_SUCCESS',
    payload: role
});

const loginFailed = () => ({
    type: 'LOGIN_FAILED',
    payload: 'Bad credentials!'
});

export const login = (username, password) => {
    return async(dispatch) => {
        dispatch(loginLoading(username, password));
        try{
            const response = await Auth.login(username, password);
            if(response.ok) {
                const data = await response.json();
                console.log(data);
                Auth.storeData(username, password, data.role);
                dispatch(loginSuccess(data.role));
                browserHistory.push("/welcome");
            }else{
                dispatch(loginFailed());
            }
        }catch(err) {
            console.log(err);
        }
    }
};

// ########################## REDUCERS ##########################

const initState = {
    isLoading: false,
    role: undefined,
    auth_err: false
};

export const accessReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_LOADING':
            return {...state, isLoading: true};
        case 'LOGIN_SUCCESS':
            return {...state, isLoading: false, role: action.payload};
        case 'LOGIN_FAILED':
            return {...state, isLoading: false, auth_err: action.payload};
        default:
            return state;

    }
};


