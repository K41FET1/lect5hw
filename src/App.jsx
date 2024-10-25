import React, { useState, useEffect } from 'react';

const TimerComponent = ({ onDelete }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
      <h2>თაიმერი: {time} წამი</h2>
      <button onClick={startTimer}>დროის დაწყება</button>
      <button onClick={pauseTimer}>პაუზა/გაგრძელება</button>
      <button onClick={resetTimer}>დრესეტება</button>
      <button onClick={onDelete}>კომპონენტის წაშლა</button>
    </div>
  );
};

const App = () => {
  const [timers, setTimers] = useState([]);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const maxTimers = 5;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const addTimer = () => {
    if (timers.length < maxTimers) {
      setTimers([...timers, { id: Date.now() }]);
    }
  };

  const deleteTimer = (id) => {
    setTimers(timers.filter((timer) => timer.id !== id));
  };

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <div style={{ marginBottom: '20px', fontSize: '1.2em' }}>
        <strong>მაუსის კოორდინატები:</strong> X: {mouseCoords.x}, Y: {mouseCoords.y}
      </div>

      {timers.map((timer) => (
        <TimerComponent key={timer.id} onDelete={() => deleteTimer(timer.id)} />
      ))}

      <button
        onClick={addTimer}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        disabled={timers.length >= maxTimers}
      >
        ახალი კომპონენტი
      </button>
    </div>
  );
};

export default App;
