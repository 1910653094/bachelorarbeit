import React from 'react';

import './ContentContainer.css';

export const ContentContainer = ({ content }) => (
    <div className='content-container'>
        {
            content.from &&
            <div className='exp-date'>
                { content.from }
                {
                    content.to && (
                        ' - ' + content.to
                    )
                }
            </div>
        }
        <h3>{ content.title }</h3>
        <h4>{ content.subtitle }</h4>
    </div>
);
