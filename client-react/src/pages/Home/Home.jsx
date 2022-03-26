import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context';
import { StepContent } from '../../layout';
import { Calendar, Card } from '../../components';
import { fetchData } from '../../utils';
import './Home.css';

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

    const handleAdd = (value) => {
        setPossibilities(prev => [ ...prev, value ]);
        setData(prev => [ ...prev, value ]);
    };

    const handleDelete = (idx) => {
        const obj = possibilities[idx];
        const newData = data.filter(d => JSON.stringify(d) !== JSON.stringify(obj));
        setData(newData);
        setPossibilities(prev => [
            ...prev.slice(0, idx),
            ...prev.slice(idx + 1, prev.length)
        ]);
    };

    return (
        <>
            <div className='home-header'>
                <h1>Meeting dates</h1>
                <p>Add dates to indicate that you have time for a meeting on this day and time</p>
            </div>
            <StepContent direction='row' alignment='center'>
                <Calendar
                    availableDays={data.map(d => d.date.toLocaleDateString())}
                    className='home-calendar'
                    selected={selected}
                    setSelected={setSelected}
                />
                <div className='possibilities-container'>
                    {
                        selected &&
                        <Card dateObj={selected} setPossibilities={handleAdd} />
                    }
                    {
                        possibilities.map((d, idx) =>
                            <Card key={idx} dateObj={d} idx={idx} setPossibilities={handleDelete} />
                        )
                    }
                </div>
            </StepContent>
        </>
    );
};
