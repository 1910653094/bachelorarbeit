import React, { useEffect, useState } from 'react';
import { Calendar, Card } from '../../../components';
import { StepContent } from '../../../layout';
import { fetchData } from '../../../utils';

export const SecondContent = ({ setForm }) => {
    const [ selected, setSelected ] = useState('');
    const [ data, setData ] = useState([]);
    const [ possibilities, setPossibilities ] = useState([]);
    const [ selectedCard, setSelectedCardState ] = useState([]);

    useEffect(() => {
        // https://stackoverflow.com/questions/56800694/what-is-the-expected-return-of-useeffect-used-for
        // TODO -> load data from db
        fetchData(process.env.REACT_APP_BACKEND_URL + '/dates?email=fabian.peyrat01@gmail.com')
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
        /*setData([
            {
                date: new Date(2022, 1, 23),
                from: '11:30am',
                to: '12:30pm'
            },
            {
                date: new Date(2022, 1, 23),
                from: '12:30am',
                to: '13:30pm'
            },
            {
                date: new Date(2022, 1, 23),
                from: '13:30am',
                to: '14:30pm'
            },
            {
                date: new Date(2022, 1, 23),
                from: '14:30am',
                to: '15:30pm'
            },
            {
                date: new Date(2022, 1, 23),
                from: '15:30am',
                to: '16:30pm'
            },
            {
                date: new Date(2022, 1, 23),
                from: '16:30am',
                to: '17:30pm'
            },
            {
                date: new Date(2022, 1, 25),
                from: '11:30am',
                to: '12:30pm'
            },
            {
                date: new Date(2022, 1, 27),
                from: '11:30am',
                to: '12:30pm'
            }
        ]);*/
        return () => {};
    }, []);


    useEffect(() => {
        const newData = []
            .concat(data)
            .map(d => ({ ...d, key: d.date.toLocaleDateString() }))
            .filter(d => d.key === selected);
        setPossibilities(newData);
        setSelectedCardState([...Array(newData.length).keys()].map(() => false));
        return () => {};
    }, [selected, data]);

    const setSelectedCard = idx => {
        let prev = [...selectedCard].map(() => false);
        prev[idx] = true;
        setSelectedCardState(prev);
        setForm(prev => ({ ...prev, date: possibilities[idx] }));
    };

    return (
        <StepContent direction='row' alignment='center'>
            <Calendar
                selected={selected}
                setSelected={setSelected}
                availableDays={data.map(d => d.date.toLocaleDateString())}
            />
            <div className='possibilities-container'>
                {
                    possibilities.map((d, idx) =>
                        <Card key={idx} dateObj={d} idx={idx} selection={selectedCard[idx]} onChange={setSelectedCard} />
                    )
                }
            </div>
        </StepContent>
    );
};
