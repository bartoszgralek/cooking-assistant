import React from 'react';
import './dots.css';

export const LoadingDots = ({loading}) => (
    <div>
        {loading ? <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div> : ''}
    </div>
);