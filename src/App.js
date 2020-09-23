import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="break-label">Break Length</div>
      <div id="break-decrement"></div>
      <div id="break-length">5</div>
      <div id="break-increment">
      </div>
      <div id="session-label">Session Length</div>
      <div id="session-decrement"></div>
      <div id="session-length">25</div>
      <div id="session-increment"></div>
      <div id="timer-label">Session</div>
      <div id="time-left">25:00</div>
      <div id="start_stop"></div>
      <div id="reset"></div>
    </div>
  );
}

export default App;
