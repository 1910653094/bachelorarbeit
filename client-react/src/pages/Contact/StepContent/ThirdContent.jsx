import React from 'react';
import { StepContent } from '../../../layout';

export const ThirdContent = ({ getData }) => {
    const data = getData();

    return (
        <StepContent>
            <div>Company -> { data.company }</div>
            <div>Contact person name -> { data.name }</div>
            <div>Contact person email -> { data.email }</div>
            <div>Job description -> { data.description }</div>
            <div>Meeting date -> { data.date.key }:
                from { data.date.from }, until: { data.date.to }</div>
        </StepContent>
    );
};
