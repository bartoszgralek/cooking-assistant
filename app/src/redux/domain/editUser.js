
// ########################## ACTIONS  ##########################


const userFetched = (user) => ({
    type: 'EDIT_USER',
    payload: user
});

const userLoad = () => ({
    type: 'EDIT_LOAD',

});

const userFailed = () => ({
    type: 'EDIT_FAILED',
    payload: 'Could not fetch user'
});

export const editUser = (userId) => {


};


// ########################## REDUCERS ##########################

const initState = {
    user: undefined,
    err: undefined,
    isLoading: false
};

export const editUserReducer = (state = initState, action) => {
    switch(action.type) {
        case 'EDIT_LOAD':
            return {...state, isLoading: true};
        case 'EDIT_USER':
            return {...state, user: action.payload, isLoading: false};
        case 'EDIT_FAILED':
            return {...state, err: action.payload, isLoading: false};
        default:
            return state;
    }
};


