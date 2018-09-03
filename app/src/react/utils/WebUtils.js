import React from 'react';

export const fetchData = (url, method, body) => {
    return async(dispatch) => {
        dispatch({
            type: 'FETCH',
            payload: {
                url: url,
                method: method,
                body: body
            }
        })
    }

};