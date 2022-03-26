import { useEffect, useState } from 'react';
import { germanDateStringToDate } from '../../utils';
import './Calendar.css';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'October', 'September', 'October', 'November', 'December'
];
const days = [
    'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'
];

export const Calendar = ({ selected, setSelected, availableDays, className = '' }) => {
    const [ date, setDate ] = useState({
        month: 0,
        year: 0,
    });

    useEffect(() => {
        thisMonth();
        return () => {};
    }, []);

    const previousMonth = () => {
        setDate(prev => {
            return {
                year: prev.month < 1 ? prev.year - 1: prev.year,
                month: prev.month < 1 ? 11 : prev.month - 1
            }
        });
    };
    const thisMonth = () => {
        const today = new Date();
        setDate({
            month: today.getMonth(),
            year: today.getFullYear(),
        });
    };
    const nextMonth = () => {
        setDate(prev => {
            return {
                year: prev.month > 10 ? prev.year + 1 : prev.year,
                month: prev.month > 10 ? 0 : prev.month + 1
            }
        });
    };

    const getCorrectDay = (year, month, i) => {
        let day = new Date(year, month, i).getDay();
        day = day === 0 ? 6 : day - 1;
        return day;
    };

    const daysForCalendar = (year, month) => {
        const daysArr = [];
        const totalDaysMonth = new Date(date.year, date.month + 1, 0).getDate();
        const totalDaysPrevMonth = new Date(date.year, date.month, 0).getDate();

        let firstDay = new Date(year, month).getDay();
        firstDay = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 1; i <= firstDay; i++) {
            const prevMonthDate = totalDaysPrevMonth - firstDay + i;
            const key = new Date(date.year, date.month - 1, prevMonthDate).toLocaleDateString('de-DE');
            daysArr.push({
                date: prevMonthDate,
                key: key,
                month: '',
                day: i-1,
                todayClass: false,
            });
        }

        const today = new Date();
        for (let i = 1; i <= totalDaysMonth; i++) {
            const key = new Date(date.year, date.month, i).toLocaleDateString('de-DE');
            const day = getCorrectDay(year, month, i);

            const todayClass = i === today.getDate() && month === today.getMonth() && year === today.getFullYear()
            daysArr.push({
                date: i,
                key: key,
                day: day,
                month: months[month].substring(0, 3),
                todayClass: todayClass,
            });
        }

        const gridsize = 42;
        // If there is space left over in the grid, then show the dates for the next month
        if (daysArr.length < gridsize) {
            const count = gridsize - daysArr.length;
            for (let i = 1; i <= count; i++) {
                const key = new Date(date.year, date.month + 1, i).toLocaleDateString('de-DE');
                const day = getCorrectDay(year, month + 1, i);
                const nextMonth = month + 1 > 11 ? 0 : month + 1;
                daysArr.push({
                    date: i,
                    key: key,
                    day: day,
                    month: months[nextMonth].substring(0, 3),
                    todayClass: false,
                });
            }
        }

        return daysArr;
    };

    const handleClick = (key) => {
        const date = germanDateStringToDate(key);
        const day = date.getDay();
        setSelected(day === 0 ? '' : key);
    };

    return (
        <div className={'calendar ' + className}>
            <div className='calendar-nav'>
                <h2>{ months[date.month] } { date.year }</h2>
                <div className='date'>
                    <div id="prev" onClick={previousMonth} />
                    <div id='now' onClick={thisMonth}>Today</div>
                    <div id='next' onClick={nextMonth} />
                </div>
            </div>
            <div className='calendar-grid'>
                {
                    days.map((day, idx) =>
                        <div key={idx} className='thead'>{day}</div>
                    )
                }
                {
                    daysForCalendar(date.year, date.month).map(d =>
                        <div
                            key={d.key}
                            onClick={() => handleClick(d.key)}
                            className={
                                (d.todayClass ? 'today ' : '') +
                                (d.day === 6 ? 'grey ' : '') +
                                (d.key === selected ? 'selected ' : '')
                            }
                        >
                            {
                                availableDays.includes(d.key) && (
                                    <span className='circle'/>
                                )
                            }
                            { d.date }
                            { d.date === 1 ? '. ' + d.month : '' }
                        </div>
                    )
                }
            </div>
        </div>
    );
};
