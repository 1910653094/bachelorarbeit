import React, { useState } from 'react';
import { StepContent } from '../../../layout';
import { Input, TextArea } from '../../../components';

export const FirstContent = ({ setForm, keys }) => {
    const [ company, setCompany ] = useState('');
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ description, setDescription ] = useState('');

    const handleChange = (v, n) => {
        switch (n) {
            case 0:
                setCompany(v);
                break;
            case 1:
                setName(v);
                break;
            case 2:
                setEmail(v);
                break;
            case 3:
                setDescription(v);
                break;
            default:
                break;
        }
        setForm(prev => ({ ...prev, [keys[n]]: v }));
    };

    return (
        <StepContent>
            <Input
                title='Company'
                type='text'
                value={company}
                onChange={e => handleChange(e.target.value, 0)}
            />

            <Input
                title='Contact person'
                type='text'
                value={name}
                onChange={e => handleChange(e.target.value, 1)}
            />

            <Input
                title='Contact email'
                type='text'
                value={email}
                onChange={e => handleChange(e.target.value, 2)}
            />

            <TextArea
                title='Job description'
                cols='30'
                rows='10'
                value={description}
                onChange={e => handleChange(e.target.value, 3)}
            />
        </StepContent>
    );
};
