import { useState, useEffect } from 'react';


function CountdownTimer() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [targetDate, setTargetDate] = useState(null);

  const handleDaysChange = (event) => {
    const { value } = event.target;
    const numValue = parseInt(value);

    if (!isNaN(numValue)) {
      setTargetDate((prevTargetDate) => {
        const now = new Date().getTime();
        const targetTime = now + numValue * 24 * 60 * 60 * 1000;
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

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [targetDate]);

  return (
    <div className='countdown-container'>
      <label>
        Timer:
        <input type="number" name="day" min="1" onChange={handleDaysChange} />
      </label>
      <h1 className='countdown-text'>CountdownTimer: {countdown.days} days, {countdown.hours} hours, {countdown.minutes} minutes, {countdown.seconds} seconds.</h1>
      <style jsx>{`
        .countdown-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .countdown-text {
          font-size: 3rem;
          margin-top: 2rem;
          text-align: center;
        }

        input {
          margin-left: 1rem;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
}

export default CountdownTimer;

