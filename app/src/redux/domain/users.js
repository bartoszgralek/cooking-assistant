import * as Auth from "../../react/utils/Auth";

// ########################## ACTIONS  ##########################

const usersFetched = users => ({
    type: "FETCH_USERS_SUCCESS",
    payload: users
});

const usersFailed = () => ({type: 'FETCH_USERS_FAILED'});

const usersLoading = () => ({type: "FETCH_USERS_LOADING"});

export const fetchUsers = () => {
    return async(dispatch) => {
        dispatch(usersLoading());
        try{
            const response = await Auth.sendRequest("http://localhost:8080/users", "GET");
            if(response.ok) {
                const json = await response.json();
                dispatch(usersFetched(json));
            }else{
                dispatch(usersFailed());
            }
        }catch(err){
            console.log(err);
        }
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


