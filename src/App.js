import React, { useState, useEffect } from 'react';
import './App.css';
import { MDBIcon } from 'mdbreact';

function App() {
  const [time, setTime] = useState({
    min: 25,
    sec: 0
  });
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
    }

    if (type === 'session' && breakLength < 60) {
      setSessionLength(sessionLength + 1);
      setTime({ ...time, min: sessionLength + 1 });
    }
  };

  const handlerDecrease = (type) => {
    if (type === 'break' && breakLength > 1) {
      setBreakLength(breakLength - 1);
    }

    if (type === 'session' && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTime({ ...time, min: sessionLength - 1 });
    }
  };

  const handlerReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTime({
      min: 25,
      sec: 0
    });
    setIsPlay(false);
    setIsBreak(false);
  };

  const decreaseTime = () => {
    if (time.sec > 0) {
      return setTime({ ...time, sec: time.sec - 1 });
    }

    if (time.sec === 0) {
      return setTime({ min: time.min - 1, sec: 59 });
    }
  };

  useEffect(() => {
    let interval;
    if (isPlay) {
      interval = setInterval(decreaseTime, 1000);
    }

    if (time.min === 0 && time.sec === 0) {
      setIsBreak(!isBreak);
      setTime({ min: breakLength, sec: 0 });
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlay, time, decreaseTime, isBreak, breakLength]);

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
            {time.min < 10 ? '0' + time.min : time.min}:
            {time.sec < 10 ? '0' + time.sec : time.sec}
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
