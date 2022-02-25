import React from 'react';

import './Paragraph.css';
import {ContentContainer} from "../ContentContainer/ContentContainer";

export const Paragraph = ({ title, children }) => {
    return (
        <div className='paragraph-container'>
            <h2 className='paragraph-title'>{ title }</h2>
            { children }
        </div>
    );
};
