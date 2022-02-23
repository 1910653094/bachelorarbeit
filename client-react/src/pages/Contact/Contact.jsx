import React, {useEffect, useRef, useState} from 'react';
import { FirstContent, SecondContent } from './StepContent';
import StepProgressBar from 'react-step-progress';

import 'react-step-progress/dist/index.css';
import './Contact.css';
import {StepContent} from "../../layout";

const keys = ['company', 'name', 'email', 'description'];

export const Contact = () => {
    const [ form, setForm ] = useState({
        company: '',
        name: '',
        email: '',
        description: '',
    });
    const [ isValid, setIsValid ] = useState(false);
    const curIsValid = useRef(isValid);
    curIsValid.current = isValid;

    useEffect(() => {
        let filledAll = true;
        keys.forEach(key => {
            if (!form[key]) {
                filledAll = false;
            }
        });
        setIsValid(filledAll);
    }, [form]);

    const handleSubmit = () => {};

    return (
        <div className='contact-container'>
            <StepProgressBar
                startingStep={0}
                steps={[
                    {
                        label: 'Form',
                        name: 'information',
                        content: <FirstContent setForm={setForm} keys={keys} />,
                        validator: () => curIsValid.current,
                    },
                    {
                        label: 'Calendar',
                        name: 'Calendar',
                        content: <SecondContent />
                    },
                    {
                        label: 'Finish',
                        name: 'Finish',
                        content: <StepContent />
                    }
                ]}
                onSubmit={handleSubmit}
                wrapperClass='step-progress-bar'
                labelClass='step-indicator'
                primaryBtnClass='primaryBtnClass'
                secondaryBtnClass='step-indicator'
            />
        </div>
    );
};
