import Quotes from "../SubChildren/Quotes";
import { useTimes } from "../Contexts/PomodoroSettings";
import { ChangeEvent, useEffect, useState } from "react";
import { useMusicPlayer } from "../Contexts/MusicHandler";
import { usePhotos } from "../Contexts/PicturesHandler";

type times = "longBreak" | "shortBreak" | "focus";
type task = {
  id: number;
  task: string;
  status: "Complete" | "Incomplete";
};

const Timer = (): React.ReactNode => {
  //Time
  const [currentTimeOption, setCurrent] = useState<times>("focus"),
    { defaults } = useTimes(),
    changeTimeOption = () => {
      if (currentTimeOption == "focus") setCurrent("longBreak");
      else if (currentTimeOption == "longBreak") setCurrent("shortBreak");
      else setCurrent("focus");
    },
    resetTimeOption = () => {
      setPause(true);
      setMinutes(defaults[currentTimeOption]);
      setSeconds(0);
    };

  const [minutes, setMinutes] = useState<number>(defaults[currentTimeOption]),
    [seconds, setSeconds] = useState<number>(0),
    [pause, setPause] = useState<boolean>(true);

  useEffect(() => {
    setMinutes(defaults[currentTimeOption]);
  }, [currentTimeOption, defaults]);
  useEffect(() => {
    const timeInterval: NodeJS.Timeout = setInterval(() => {
      if (pause == false) {
        setSeconds((seconds) => seconds - 1);
        if (seconds == 0) {
          setSeconds(59);
          setMinutes((minutes) => minutes - 1);
        }
        if (minutes == 0) clearInterval(timeInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [minutes, seconds, pause]);

  //Tasks
  const [tasks, setTasks] = useState<task[]>([]),
    [input, setInput] = useState<string>(""),
    [taskCount, setCount] = useState<number>(tasks.length);

  const taskHandler = () => {
      setInput("");
      setCount((count) => count + 1);
      setTasks((current) => [
        ...current,
        {
          id: taskCount + 1,
          task: input,
          status: "Incomplete",
        },
      ]);
    },
    updateTask = (taskId: number) => {
      setTasks((current) =>
        current.map((task) => {
          if (task.id == taskId) {
            return {
              ...task,
              id: task.id,
              status: task.status == "Complete" ? "Incomplete" : "Complete",
            };
          }
          return task;
        })
      );
    },
    deleteTask = (taskId: number) => {
      setTasks((current) => current.filter((task) => task.id != taskId));
    };
  //Music Handler
  const {
    audioRef,
    total,
    index,
    indexHandler,
    playing,
    playHandler,
    timeHandler,
  } = useMusicPlayer();

  const nextPreviousHandler = (action: "Next" | "Back") => {
    if (action == "Next") {
      if (index + 1 == total) indexHandler(0);
      else indexHandler((current) => current + 1);
      timeHandler(0);
    } else {
      if (index - 1 < 0) indexHandler(total - 1);
      else indexHandler((current) => current - 1);
      timeHandler(0);
    }
  };
  //Photos
  const photos = usePhotos(),
    photo = photos?.photos[5];

  return (
    <div id="timetab">
      <div id="timer">
        <div id="time">
          <h2>
            {currentTimeOption == "focus"
              ? "Focus"
              : currentTimeOption == "longBreak"
              ? "Long Break"
              : "Short Break"}
          </h2>
          <p>
            {minutes}:
            {seconds < 10 ? seconds.toString().padStart(2, "0") : seconds}
          </p>
        </div>
        <div id="controls">
          <button>
            <i className="fa-solid fa-repeat" onClick={resetTimeOption}></i>
          </button>
          <button onClick={() => setPause((current) => !current)}>
            {pause == true && <i className="fa-solid fa-play"></i>}
            {pause == false && <i className="fa-solid fa-pause"></i>}
          </button>
          <button>
            <i className="fa-solid fa-forward" onClick={changeTimeOption}></i>
          </button>
        </div>
        <Quotes />
      </div>
      <div id="tasks">
        <h1>Tasks</h1>
        <div id="add">
          <input
            type="text"
            placeholder="Add task"
            value={input}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setInput(event.target.value)
            }
          />
          <button onClick={taskHandler}>Add</button>
        </div>
        <div id="tasklist">
          {tasks.length > 0 &&
            tasks.map((task) => (
              <div key={task.id} id="task">
                <p>{task.task}</p>
                <div id="options">
                  <button onClick={() => updateTask(task.id)}>
                    {task.status == "Incomplete" && (
                      <i className="fa-solid fa-check"></i>
                    )}
                    {task.status == "Complete" && (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "green" }}
                      ></i>
                    )}
                  </button>
                  <button onClick={() => deleteTask(task.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          {tasks.length == 0 && (
            <div className="text-center font-[Cookie] text-2xl p-2 relative top-[92px]">
              <p>No tasks added</p>
            </div>
          )}
        </div>
      </div>
      <div id="musictab">
        <div id="banner">
          <div id="innerControls">
            <div id="controls">
              <button onClick={() => nextPreviousHandler("Back")}>
                <i className="fa-solid fa-backward-step"></i>
              </button>
              <button
                onClick={() => {
                  playHandler(!playing);
                  if (audioRef?.current.currentTime)
                    timeHandler(audioRef.current.currentTime);
                }}
              >
                {playing == false && <i className="fa-solid fa-play"></i>}
                {playing == true && <i className="fa-solid fa-pause"></i>}
              </button>
              <button onClick={() => nextPreviousHandler("Next")}>
                <i className="fa-solid fa-forward-step"></i>
              </button>
            </div>
          </div>
          <img
            src={
              photos != null
                ? photo?.src.original
                : "https://img.freepik.com/premium-photo/illustration-girl-sitting-balcony-with-her-cat-watching-sunset_1260208-167.jpg?semt=ais_hybrid"
            }
          />
        </div>
        <div id="controls">
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
