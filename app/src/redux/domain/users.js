// ########################## ACTIONS  ##########################

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

export const findUserById = (array, id) => {
    let user = null;
    for(let i=0;i<array.length;i++) {
        if(array[i].id === id) {
            user = array[i];
            break;
        }
    }
};


// ########################## REDUCERS ##########################

const initState = {
    isLoading: false,
    users: [],
    auth_err: false
};

export const usersReducer = (state = initState, action) => {
    switch(action.type) {
        case 'GET_USERS_LOADING':
            return {...state, isLoading: true};
        case 'GET_USERS_SUCCESS':
            return {...state, users: action.payload, isLoading: false};
        case 'GET_USERS_FAILED':
            return {...state, auth_err: true, isLoading: false};
        default:
            return state;
    }
};


