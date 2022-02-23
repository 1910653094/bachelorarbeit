import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context';
import './Switch.css';

export const Switch = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [ checked, setChecked ] = useState(false);

    useEffect(() => {
        setChecked(theme !== '');
    }, [theme]);

    return (
        <div className='switch-container'>
            <label className='switch'>
                <input type='checkbox' onChange={toggleTheme} checked={checked} />
                <span className='slider round' />
            </label>
        </div>
    );
};
