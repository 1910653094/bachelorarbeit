import React, { useEffect, useState } from 'react';
import { Calendar, Card } from '../../../components';
import { StepContent } from '../../../layout';

export const SecondContent = () => {
    const [ selected, setSelected ] = useState('');

    const [ possibilities, setPossibilities ] = useState([]);
    const [ selectedCard, setSelectedCardState ] = useState([]);

    useEffect(() => {
        const newData = []
            .concat(data)
            .map(d => ({ ...d, key: d.date.toLocaleDateString() }))
            .filter(d => d.key === selected);
        setPossibilities(newData);
        setSelectedCardState([...Array(newData.length).keys()].map(() => false));
        return () => {};
    }, [selected]);

    const setSelectedCard = idx => {
        let prev = [ ...selectedCard ].map(() => false);
        prev[idx] = true;
        setSelectedCardState(prev);
    };

    return (
        <StepContent direction='row' alignment='center'>
            <Calendar selected={selected} setSelected={setSelected}/>
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


const data = [
    {
        date: new Date(2022, 1, 23),
        from: '11:30am',
        to: '12:30pm'
    },
    {
        date: new Date(2022, 1, 23),
        from: '11:30am',
        to: '12:30pm'
    },
    {
        date: new Date(2022, 1, 23),
        from: '11:30am',
        to: '12:30pm'
    },
    {
        date: new Date(2022, 1, 23),
        from: '11:30am',
        to: '12:30pm'
    },
    {
        date: new Date(2022, 1, 23),
        from: '11:30am',
        to: '12:30pm'
    },
    {
        date: new Date(2022, 1, 23),
        from: '11:30am',
        to: '12:30pm'
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
];
