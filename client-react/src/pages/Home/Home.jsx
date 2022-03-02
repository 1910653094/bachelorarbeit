import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context';
import {Calendar, Card} from '../../components';
import './Home.css';
import {StepContent} from "../../layout";

export const Home = () => {
    const { auth } = useContext(AuthContext);
    const [ selected, setSelected ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.token) {
            navigate('/login');
        }
    }, [ auth.token, navigate ]);

    return (
        <StepContent direction='row' alignment='center'>
            <Calendar
                selected={selected}
                setSelected={setSelected}
                availableDays={[]}
            />
            <div className='possibilities-container'>
                {
                    /*possibilities.map((d, idx) =>
                        <Card key={idx} dateObj={d} idx={idx} selection={selectedCard[idx]} onChange={setSelectedCard} />
                    )*/
                    selected &&
                        <Card />
                }
            </div>
        </StepContent>
    );
};
// make SU unclickable
