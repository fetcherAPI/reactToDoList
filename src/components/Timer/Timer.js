import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Timer.css";

export function TimerOwn({ totalTime }) {
  const [time, setTime] = useState(totalTime);
  const [isRunning, setRunning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning && time > 0) {
        setTime((time) => time - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  function onPlay() {
    setRunning(true);
  }

  function onPause() {
    setRunning(false);
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <div className='description--timer'>
      <button onClick={onPlay} className='icon-play'></button>
      <button onClick={onPause} className='icon-pause'></button>
      <p>{`${minutes}:${seconds}`}</p>
    </div>
  );
}

TimerOwn.propTypes = {
  totalTime: PropTypes.number,
};

TimerOwn.defaultProps = {
  totalTime: 0,
};
