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
    if (!isPlay && type === 'break' && breakLength < 60) {
      setBreakLength(breakLength + 1);
      if (isBreak) {
        setTime((breakLength + 1) * 60);
      }
    }

    if (!isPlay && type === 'session' && breakLength < 60) {
      setSessionLength(sessionLength + 1);
      setTime((sessionLength + 1) * 60);
    }
  };

  const handlerDecrease = (type) => {
    if (!isPlay && type === 'break' && breakLength > 1) {
      setBreakLength(breakLength - 1);
      if (isBreak) {
        setTime((breakLength - 1) * 60);
      }
    }

    if (!isPlay && type === 'session' && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTime((sessionLength - 1) * 60);
    }
  };

  const handlerReset = () => {
    setTime(1500);
    setBreakLength(5);
    setSessionLength(25);
    setIsPlay(false);
    setIsBreak(false);
  };

  useEffect(() => {
    // console.log(convertTime(time));
    let interval;
    if (isPlay) {
      interval = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        }
      }, 1000);
    }

    if (time === 0) {
      clearInterval(interval);
      setTimeout(() => {
        setIsBreak(!isBreak);
        setTime(breakLength * 60);
      }, 1000);
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
          <div id="time-left">{convertTime(time)}</div>
          <div className="length-box">
            <MDBIcon
              id="start_stop"
              icon={isPlay ? 'pause' : 'play'}
              onClick={handlerPlay}
            />
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
  let min = Math.floor(_time / 60);
  let sec = _time - min * 60;
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  return `${min}:${sec}`;
};

//* source Audio
//* https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav
