import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
    const navigate = useNavigate();

    const skills = [
        {
            name: 'JavaScript',
            rating: 8
        },
        {
            name: 'CSS',
            rating: 7
        }
    ];

    return (
        <div className='container'>
            <div className='email-contact-container'>
                Email
                <p>fabian.peyrat01@gmail.com</p>
                or
                <p>contact me
                    <span onClick={() => navigate('/contact')}>here</span>
                </p>
            </div>
            <div className='container-left'></div>
            <div className='container-right'>
                <div className='name-container'>
                    <h1>Fabian</h1>
                    <h1>Peyrat</h1>
                    <h1>Full-Stack Developer</h1>
                </div>
                <div className='skills-container'>
                    <h2>Skills</h2>
                    {
                        skills.map(skill =>
                            <div className='skill'>
                                { skill.name }
                                <div className='dots-container'>
                                    {
                                        [...Array(10).keys()].map(i =>
                                            <div className={'dot ' + (i <= skill.rating ? 'fill' : '')}/>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
