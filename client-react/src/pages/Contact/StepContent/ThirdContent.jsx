import React, { useEffect, useState } from 'react';
import { ContentContainer, StepContent } from '../../../layout';

export const ThirdContent = ({ getData }) => {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        const formData = getData();
        const keys = [
            [
                {
                    title: 'Company',
                    key: 'company'
                },
                {
                    title: 'Contact person name',
                    key: 'name'
                },
                {
                    title: 'Contact person email',
                    key: 'email'
                },
                {
                    title: 'Job description',
                    key: 'description'
                }
            ],
            [
                {
                    title: 'Meeting date',
                    key: 'key'
                },
                {
                    title: 'From',
                    key: 'from'
                },
                {
                    title: 'Until',
                    key: 'until'
                },
            ]
        ];
        setData(keys.map(key =>
            key.map(k => ({ title: k.title, subtitle: formData?.date[k.key] || formData[k.key] }) )));
    }, [getData]);

    return (
        <StepContent direction='row'>
            {
                data.map(split =>
                    <div className='form-half-container'>
                        {
                            split.map(s =>
                                <ContentContainer content={s} />
                            )
                        }
                    </div>
                )
            }
        </StepContent>
    );
};
