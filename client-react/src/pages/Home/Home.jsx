import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context';
import { StepContent } from '../../layout';
import { Calendar, Card } from '../../components';
import './Home.css';
import { fetchData } from '../../utils';

export const Home = () => {
    const { auth } = useContext(AuthContext);
    const [ selected, setSelected ] = useState('');
    const [ data, setData ] = useState([]);
    const [ possibilities, setPossibilities ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.token) {
            navigate('/login');
        }
    }, [ auth.token, navigate ]);

    useEffect(() => {
        fetchData(process.env.REACT_APP_BACKEND_URL + `/dates?email=${ auth.email }`)
            .then(res => res.json())
            .then(data => {
                const merged = [];
                for (const date of data.dates) {
                    for (const hour of date.hours) {
                        if (hour.available) {
                            merged.push({
                                date: new Date(date.date),
                                from: hour.from,
                                until: hour.until
                            });
                        }
                    }
                }
                console.log(merged);
                setData(merged);
            }).catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const newData = []
            .concat(data)
            .map(d => ({ ...d, key: d.date.toLocaleDateString() }))
            .filter(d => d.key === selected);
        setPossibilities(newData);
        return () => {};
    }, [selected, data]);

    return (
        <StepContent direction='row' alignment='center'>
            <Calendar
                selected={selected}
                setSelected={setSelected}
                availableDays={[]}
                className='home-calendar'
            />
            <div className='possibilities-container'>
                {
                    selected &&
                    <Card dateObj={selected} />
                }
                {
                    possibilities.map((d, idx) =>
                        <Card key={idx} dateObj={d} idx={idx} />
                    )
                }
            </div>
        </StepContent>
    );
};
