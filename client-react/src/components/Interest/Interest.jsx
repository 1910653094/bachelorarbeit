import React from 'react';

import './Interest.css';

export const Interest = ({ icon, label }) => {
    return (
        <div className='interest-container'>
            <div className='interest-icon-container'>
                <img src={icon} alt={label} />
            </div>
            <label>
                { label }
            </label>
        </div>
    );
};
