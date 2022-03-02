import React from 'react';
import './StepContent.css';

export const StepContent = ({ children, direction = 'column', alignment = 'flex-start' }) => {
    return (
        <div className='step-content-container' style={{ flexDirection: direction, alignItems: alignment }}>
            { children }
        </div>
    );
};
