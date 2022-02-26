import React from 'react';
import './Skill.css';

export const Skill = ({ skill }) => {
    return (
        <div className='skill'>
            { skill.name }
            <div className='dots-container'>
                {
                    [ ...Array(11).keys() ].map(i =>
                        <div key={i} className={'dot' + (i <= skill.rating ? ' fill' : '')} />
                    )
                }
            </div>
        </div>
    );
};
