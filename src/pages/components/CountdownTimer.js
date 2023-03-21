import { useState, useEffect } from 'react';
import styles from '../../styles/CountdownTimer.module.css'

const hourValue =24 //magic number
const minuteValue = 60
const secondValue = 60
const milisecondValue = 1000

function CountdownTimer() {
  
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [targetDate, setTargetDate] = useState(null);

  const handleDaysChange = (event) => {
     const {value} = event.target;
    const numValue = parseInt(value);

    if (!isNaN(numValue)) {
      setTargetDate(() => {
        const now = new Date().getTime();
        const targetTime = now + (numValue * hourValue * minuteValue * secondValue * milisecondValue);
        return new Date(targetTime);
      });
    }
  };

  useEffect(() => {
    let intervalId;

    if (targetDate) {
      intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        const days = Math.floor(distance / (milisecondValue * secondValue * minuteValue * hourValue));
        const hours = Math.floor((distance % (milisecondValue * secondValue * minuteValue * hourValue)) / (milisecondValue * secondValue * minuteValue));
        const minutes = Math.floor((distance % (milisecondValue * secondValue * minuteValue)) / (milisecondValue * secondValue));
        const seconds = Math.floor((distance % (milisecondValue * secondValue)) / milisecondValue);

        setCountdown({ days, hours, minutes, seconds });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [targetDate]);

  return (
    <div className={styles.countdownContainer}>
      <label>
        Timer(Day): 
        <input className={styles.input} type="number" name="day" min="1" onChange={handleDaysChange} />
      </label>
      <h1 className={styles.countdownText}>CountdownTimer: 
      <br/> 
      <br/>
      {countdown.days} d, 
      {countdown.hours} hr, 
      {countdown.minutes} min, 
      {countdown.seconds} sec
      </h1>
      
    </div>
  );
}

export default CountdownTimer;

