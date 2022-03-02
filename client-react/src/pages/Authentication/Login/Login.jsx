import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../../components';
import { fetchData } from '../../../utils';
import './Login.css';

export const Login = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.token) {
            navigate('/account');
        }
    }, [ auth.token, navigate ]);

    const handleLogin = async () => {
        if (!email || !password) {
            const msg = !email ?
                'Email ' + (!password ? 'and password must be provided!' : 'must be provided!') :
                'Password must be provided!';
            setError(msg);
            return;
        }

        const user = JSON.stringify({
            email: email,
            password: password,
        });
        fetchData(process.env.REACT_APP_BACKEND_URL + '/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: user,
        })
            .then(res => res.json())
            .then(res => {
                if (res.errors) {
                    const msg = res.errors.map(err => err.msg + ' ' + err.param).join(' and ');
                    console.log(msg);
                    setError(msg);
                    return;
                } else if (res.error) {
                    setError(res.error);
                    return;
                }

                setAuth(res.email, res.token);
                navigate('/account');
            });
    };

    return (
        <div className='login-wrapper'>
            <div className='login-card'>
                Please login to access the page
                <Input
                    title='Email'
                    type='email'
                    value={email || ''}
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    title='Password'
                    type='password'
                    value={password || ''}
                    placeholder='Enter your password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                {
                    error &&
                    <div className='error-message'>
                        { error }
                    </div>
                }
                <div className='actions'>
                    <Button onClick={handleLogin}>Login</Button>
                </div>
                {/*<p>Do you want to join our dj community? Create an account <Link to='/registration'>now</Link></p>*/}
            </div>
        </div>
    );
};
