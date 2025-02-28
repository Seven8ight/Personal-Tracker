import Quotes from "../SubChildren/Quotes";

const Timer = (): React.ReactNode => {
  return (
    <div id="timetab">
      <div id="timer">
        <div id="time">
          <h2>Focus</h2>
          <p>25:00</p>
        </div>
        <div id="controls">
          <button>
            <i className="fa-solid fa-repeat"></i>
          </button>
          <button>
            <i className="fa-solid fa-play"></i>
          </button>
          <button>
            <i className="fa-solid fa-forward"></i>
          </button>
        </div>
        <Quotes />
      </div>
      <div id="tasks">
        <h1>Tasks</h1>
        <div id="add">
          <input type="text" placeholder="Add task" />
          <button>Add</button>
        </div>
        <div id="tasklist">
          <div id="task">
            <p>Task</p>
            <div id="options">
              <button>
                <i className="fa-solid fa-check"></i>
              </button>
              <button>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="musictab">
        <div id="banner">
          <div id="innerControls">
            <div id="controls">
              <button>
                <i className="fa-solid fa-backward-step"></i>
              </button>
              <button>
                <i className="fa-solid fa-play"></i>
              </button>
              <button>
                <i className="fa-solid fa-forward-step"></i>
              </button>
            </div>
          </div>
          <img src="https://img.freepik.com/premium-photo/illustration-girl-sitting-balcony-with-her-cat-watching-sunset_1260208-167.jpg?semt=ais_hybrid" />
        </div>
        <div id="controls">
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
