import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='container'>
            Hello World!
            <button onClick={() => navigate('/contact')}>Contact Me!</button>
        </div>
    );
};
