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
            <label>Company</label>
            <Input type='text' value={company} onChange={e => handleChange(e.target.value, 0)} />

            <label>Contact person</label>
            <Input type='text' value={name} onChange={e => handleChange(e.target.value, 1)} />

            <label>Contact email</label>
            <Input type='text' value={email} onChange={e => handleChange(e.target.value, 2)} />

            <label>Job description</label>
            <TextArea
                name=''
                id=''
                cols='30'
                rows='10'
                value={description}
                onChange={e => handleChange(e.target.value, 3)}
            />
        </StepContent>
    );
};
