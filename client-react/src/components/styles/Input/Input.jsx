import React, { useState } from 'react';
import { EyeOffIcon, EyeOnIcon } from '../../../assets';
import './Input.css';

export const Input = props => {
    const [ visible, setVisible ] = useState(false);

    const handleClick = () => setVisible(!visible);

    const {
        title,
        placeholder,
        value,
        onChange,
        type,
        errorMessage,
        maxWidth = 320,
    } = props;
    return (
        <div className='custom-input' style={{ maxWidth: maxWidth }} {...props}>
            {
                title &&
                <div className='input-title'>
                    { title }
                </div>
            }
            {
                type === 'password' ? (
                    <div className='password-container'>
                        <input
                            {...props}
                            type={visible ? 'text' : 'password'}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            id='password'
                        />
                        {
                            visible ? (
                                <EyeOnIcon height={25} onClick={handleClick}/>
                            ) : (
                                <EyeOffIcon height={25} onClick={handleClick}/>
                            )
                        }
                    </div>
                ) : (
                    <input
                        {...props}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                )
            }
            {
                errorMessage &&
                <div className='error'>
                    { errorMessage }
                </div>
            }
        </div>
    );
};
