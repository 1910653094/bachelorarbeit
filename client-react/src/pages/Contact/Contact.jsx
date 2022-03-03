import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirstContent, SecondContent, ThirdContent } from './StepContent';
import StepProgressBar from 'react-step-progress';
import { fetchData } from '../../utils';
import 'react-step-progress/dist/index.css';
import './Contact.css';

const keys = ['company', 'name', 'email', 'description'];

export const Contact = () => {
    const [ form, setForm ] = useState({
        company: '',
        name: '',
        email: '',
        description: '',
        date: {},
    });
    const currForm = useRef(form);

    const [ stepOneIsValid, setStepOneIsValid ] = useState(false);
    const stepOneValidator = useRef(stepOneIsValid);
    stepOneValidator.current = stepOneIsValid;
    const [ stepTwoIsValid, setStepTwoIsValid ] = useState(false);
    const stepTwoValidator = useRef(stepTwoIsValid);
    stepTwoValidator.current = stepTwoIsValid;

    const navigate = useNavigate();

    useEffect(() => {
        let filledAll = true;
        keys.forEach(key => {
            if (!form[key]) {
                filledAll = false;
            }
        });
        setStepOneIsValid(filledAll);

        setStepTwoIsValid(Object.keys(form.date).length !== 0);
        currForm.current = form;
    }, [form]);

    const getData = () => currForm.current;

    const handleSubmit = () => {
        const user = JSON.stringify({
            email: 'fabian.peyrat01@gmail.com',
            date: {
                date: form.date.date,
                hours: {
                    from: form.date.from,
                    until: form.date.until
                }
            },
            company: form.company,
            contact_name: form.name,
            contact_email: form.email,
            description: form.description
        });
        fetchData(process.env.REACT_APP_BACKEND_URL + '/dates/check', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: user,
        })
            .then(res => res.json())
            .then(data => {
                console.info(data.success);
                navigate('/');
            }).catch(err => {
                console.error(err);
                alert('We are very sorry but an error occurred.\nPlease try again!')
            });
    };

    return (
        <div className='contact-container'>
            <StepProgressBar
                startingStep={0}
                steps={[
                    {
                        label: 'Form',
                        name: 'information',
                        content: <FirstContent setForm={setForm} keys={keys} />,
                        validator: () => stepOneValidator.current,
                    },
                    {
                        label: 'Calendar',
                        name: 'Calendar',
                        content: <SecondContent setForm={setForm} />,
                        validator: () => stepTwoValidator.current,
                    },
                    {
                        label: 'Finish',
                        name: 'Finish',
                        content: <ThirdContent getData={getData} />,
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
