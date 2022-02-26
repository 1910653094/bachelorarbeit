import React from 'react';

import './Paragraph.css';

export const Paragraph = ({ title, children }) => {
    return (
        <div className='paragraph-container'>
            <h2 className='paragraph-title'>{ title }</h2>
            { children }
        </div>
    );
};
