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