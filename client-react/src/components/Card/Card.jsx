import React, { useContext, useState } from 'react';
import { fetchData, germanDateStringToDate } from '../../utils';
import { AuthContext } from '../../context';
import { Button, Input } from '../styles';
import './Card.css';

export const Card = ({ dateObj, idx = -1, selection = false, onChange = () => {} }) => {
    const [ from, setFrom ] = useState('');
    const [ until, setUntil ] = useState('');
    const [ fromError, setFromError ] = useState(false);
    const [ untilError, setUntilError ] = useState(false);

    const { auth } = useContext(AuthContext);

    const checkError = (value) => {
        if (!value) return true;
        return !/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(value);
    };

    const handleFromChange = value => {
        setFrom(value);
        const err = checkError(value);
        setFromError(err);
    };
    const handleUntilChange = value => {
        setUntil(value);
        const err = checkError(value);
        setUntilError(err);
    };

    const handleClick = () => {
        if (fromError || untilError) {
            return;
        }
        const date = germanDateStringToDate(dateObj);

        const dateJSON = JSON.stringify({
            email: auth.email,
            token: auth.token,
            date: {
                date,
                hours: { from, until },
            },
        });
        fetchData(process.env.REACT_APP_BACKEND_URL + '/dates', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: dateJSON,
        })
            .then(res => res.json())
            .then(res => {
                if (res.errors) {
                    alert('An error occurred');
                    console.error(res.errors);
                    return;
                }
                console.log(res);
                // card should disappear and be added to possibilities array
            });
    };

    return (
        <div className={'card-container' + (idx < 0 ? ' big' : '') + ((fromError || untilError) ? ' big-error' : '')}>
            {
                idx >= 0 ? (
                    <>
                        <div className={'text-container' + (idx >= 0 ? ' unset-height' : '')}>
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
                                error={fromError}
                                errorMessage={fromError ? 'Wrong format' : ''}
                                onChange={(e) => handleFromChange(e.target.value)}
                            />
                            <Input
                                title='Until'
                                type='text'
                                value={until}
                                placeholder='Until when'
                                error={untilError}
                                errorMessage={untilError ? 'Wrong format' : ''}
                                onChange={(e) => handleUntilChange(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleClick}>Save</Button>
                    </>
                )
            }
        </div>
    );
};
