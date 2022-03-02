import React, { useState } from 'react';
import { Input } from '../styles';
import './Card.css';

export const Card = ({ dateObj = {}, idx = 0, selection = false, onChange = () => {} }) => {
    const [ from, setFrom ] = useState('');
    const [ until, setUntil ] = useState('');

    return (
        <div className={'card-container' + (Object.keys(dateObj).length === 0 ? ' big' : '')}>
            {
                Object.keys(dateObj).length > 0 ? (
                    <>
                        <div className='text-container'>
                            <div>From: {dateObj.from}</div>
                            <div>To: {dateObj.until}</div>
                        </div>
                        <input type='radio' checked={selection} onChange={() => onChange(idx)} />
                    </>
                ) : (
                    <>
                        <div className='text-container'>
                            <Input
                                title='From'
                                type='text'
                                value={from}
                                placeholder='From when'
                                onChange={(e) => setFrom(e.target.value)}
                            />
                            <Input
                                title='Until'
                                type='text'
                                value={until}
                                placeholder='Until when'
                                onChange={(e) => setUntil(e.target.value)}
                            />
                        </div>
                        <input type='radio' checked={selection} onChange={() => onChange(idx)} />
                    </>
                )
            }
        </div>
    );
};
