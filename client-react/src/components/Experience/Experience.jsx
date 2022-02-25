import React from 'react';
import './Experience.css';

export const Experience = ({ experience }) => {
    return (
        <div className='experience'>
            <div className='exp-date'>
                { experience.from } - { experience.to }
            </div>
            <h3>{ experience.company }</h3>
            <h4 className='job'>{ experience.job }</h4>
            <p>{ experience.description }</p>
            <h4>Technologies: <span>{
                experience.technologies.join(', ')
            }</span></h4>
        </div>
    );
};
