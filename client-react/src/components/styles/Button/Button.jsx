import React from 'react';

import './Button.css';

export const Button = ({ children, onClick }) => {
    return (
        <button className='actn-btn' onClick={onClick}>
            { children }
        </button>
    );
};
