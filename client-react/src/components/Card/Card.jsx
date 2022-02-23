import React from 'react';
import './Card.css';

export const Card = ({ dateObj, idx, selection, onChange }) => {
    return (
        <div className='card-container'>
            <div className='text-container'>
                <div>From: { dateObj.from }</div>
                <div>To: { dateObj.to }</div>
            </div>
            <input type='radio' checked={selection} onChange={() => onChange(idx)} />
        </div>
    );
};
