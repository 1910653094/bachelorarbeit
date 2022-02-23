import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Switch } from '../Switch/Switch';
import { BackArrow } from '../../assets';
import './Header.css';

export const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const back = () => navigate('');

    return (
        <div className='header-container'>
            {
                pathname.includes('contact') && (
                    <BackArrow
                        className='back-arrow'
                        onClick={back}
                    />
                )
            }
            <Switch />
        </div>
    );
};
