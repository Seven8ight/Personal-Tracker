const Timer = (): React.ReactNode => {
  return (
    <div id="timetab">
      <div id="timer">
        <div id="time">
          <h2>Focus</h2>
          <p>00:00</p>
        </div>
        <div id="controls">
          <button></button>
          <button>
            <i className="fa-solid fa-play"></i>
          </button>
        </div>
      </div>
      <div id="tasks">
        <h1>Tasks</h1>
      </div>
      <div id="musictab">
        <h1>Music</h1>
      </div>
    </div>
  );
};

export default Timer;
