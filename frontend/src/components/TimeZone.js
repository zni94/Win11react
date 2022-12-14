import { useEffect, useState } from 'react';
import { promise } from '../modules/promise';
import { removeActive } from '../modules/activeControl';
import { calendarClickEvent } from '../modules/controlCalendar';

const TimeZone = () => {
  const [date, setDate] = useState(new Date());

  const [hours, setHours] = useState(date.getHours());
  const [minutes, setMinutes] = useState(date.getMinutes());
  const [seconds, setSeconds] = useState(date.getSeconds());

  useEffect(() => {
    const times = setInterval(() => {
      promise(setDate(new Date())).then(() => {
        setHours(date.getHours());
        setMinutes(date.getMinutes());
        setSeconds(date.getSeconds());
      });
    }, 1000);

    return () => clearInterval(times);
  }, [date, hours, minutes, seconds]);

  const onClick = () => {
    removeActive('icon-container');
    removeActive('window-container');
    calendarClickEvent();
  };

  return (
    <div className={'time-zone-container'} onClick={onClick}>
      <div>
        {hours > 12 ? `오후  ${hours - 12}` : `오전  ${hours}`}:
        {minutes < 10 ? `0${minutes}` : minutes}
      </div>
      <div>
        {date.getFullYear()}-
        {date.getUTCMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1}
        -{date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}
      </div>
    </div>
  );
};

export default TimeZone;
