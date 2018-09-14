import React from 'react';

export const changeCard = card => {
    return dispatch => {
        dispatch({
            type: 'SET_NAV',
            payload: card
        })
    }
};

const initState = {
    card: '/welcome'
};

export const navReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_NAV':
            return {...state, card: action.payload};
        default:
            return state;
    }
};