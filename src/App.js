import React, { useState, useEffect } from 'react';
import './App.css';
import { MDBIcon } from 'mdbreact';

function App() {
  const [time, setTime] = useState(1500);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [isPlay, setIsPlay] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const handlerPlay = () => {
    setIsPlay(!isPlay);
  };

  const handlerIncrease = (type) => {
    if (type === 'break' && breakLength < 60) {
      setBreakLength(breakLength + 1);
      if (isBreak) {
        setTime(time + 60);
      }
    }

    if (type === 'session' && breakLength < 60) {
      setSessionLength(sessionLength + 1);
      setTime(time + 60);
    }
  };

  const handlerDecrease = (type) => {
    if (type === 'break' && breakLength > 1) {
      setBreakLength(breakLength - 1);
      if (isBreak) {
        setTime(time - 60);
      }

    }

    if (type === 'session' && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTime(time - 60);
    }
  };

  const handlerReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTime(1500);
    setIsPlay(false);
    setIsBreak(false);
  };

  useEffect(() => {
    let interval;
    if (isPlay) {
      interval = setInterval(() => {
        if (time > 0) {
          return setTime(time - 1);
        }
      }, 1000);
    }

    if (time === 0) {
      setIsBreak(!isBreak);
      setTime(breakLength * 60);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlay, time, isBreak, breakLength]);

  return (
    <div className="App">
      <div className="box">
        <div className="box-inner">
          <div id="break-label">Break Length</div>
          <div className="length-box">
            <MDBIcon
              id="break-decrement"
              icon="arrow-alt-circle-down"
              onClick={() => handlerDecrease('break')}
            />
            <div id="break-length">{breakLength}</div>
            <MDBIcon
              id="break-increment"
              icon="arrow-alt-circle-up"
              onClick={() => handlerIncrease('break')}
            />
          </div>
        </div>
        <div className="box-inner">
          <div id="session-label">Session Length</div>
          <div className="length-box">
            <MDBIcon
              id="session-decrement"
              icon="arrow-alt-circle-down"
              onClick={() => handlerDecrease('session')}
            />
            <div id="session-length">{sessionLength}</div>
            <MDBIcon
              id="session-increment"
              icon="arrow-alt-circle-up"
              onClick={() => handlerIncrease('session')}
            />
          </div>
        </div>
        <div className="box-inner">
          <div id="timer-label">{isBreak ? 'Break' : 'Session'}</div>
          <div id="time-left">
            {convertTime(time).min < 10
              ? '0' + convertTime(time).min
              : convertTime(time).min}
            :
            {convertTime(time).sec < 10
              ? '0' + convertTime(time).sec
              : convertTime(time).sec}
          </div>
          <div className="length-box">
            <div id="start_stop">
              <MDBIcon icon={isPlay ? 'pause' : 'play'} onClick={handlerPlay} />
            </div>
            <div id="reset">
              <MDBIcon icon="sync" onClick={handlerReset} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

const convertTime = (_time) => {
  const min = Math.floor(_time / 60);
  const sec = _time - min * 60;
  return { min, sec };
};
