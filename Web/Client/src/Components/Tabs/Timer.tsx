import Quotes from "../SubChildren/Quotes";
import { useTimes } from "../Contexts/PomodoroSettings";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMusicPlayer } from "../Contexts/MusicHandler";
import { usePhotos } from "../Contexts/PicturesHandler";

type times = "longBreak" | "shortBreak" | "focus";
type task = {
  id: number;
  task: string;
  status: "Complete" | "Incomplete";
};
export type taskData = {
  day: string;
  tasks: number;
};
export type timeData = {
  day: string;
  timeInHrs: number;
};
// type currentTime = {
//   type: times;
//   minutes: number;
//   seconds: number;
//   paused: boolean;
// };

export const dayValue = (): string => {
  switch (new Date().getDay()) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Invalid";
  }
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
        if (minutes == 0 && seconds == 0) clearInterval(timeInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [minutes, seconds, pause]);

  //Tasks
  const [tasks, setTasks] = useState<task[]>([]),
    [input, setInput] = useState<string>(""),
    taskRef = useRef<HTMLInputElement | null>(null),
    [taskCount, setCount] = useState<number>(tasks.length);

  const taskHandler = () => {
      if (input != "") {
        setCount((count) => count + 1);
        setTasks((current) => [
          ...current,
          {
            id: taskCount + 1,
            task: input,
            status: "Incomplete",
          },
        ]);
        setInput("");
      } else {
        if (taskRef.current)
          taskRef.current.placeholder = "Enter a value first";
      }
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
      setTasks((current) =>
        current
          .filter((task) => task.id != taskId)
          .map((task) => {
            if (taskId > task.id) return task;
            else
              return {
                id: task.id - 1,
                task: task.task,
                status: task.status,
              };
          })
      );
    };

  useEffect(() => {
    setCount(tasks.length);
  }, [tasks]);

  // --> local storage, present tasks
  useEffect(() => {
    let presentTasks = window.localStorage.getItem("PresentTasks");
    if (presentTasks == null)
      window.localStorage.setItem("PresentTasks", JSON.stringify(tasks));
  }, [tasks]);

  //Local storage
  const [tasksdone, setDone] = useState<taskData[]>([]),
    [finishedTasks, setCounter] = useState<number>(0);
  // --> Get any data present
  useEffect(() => {
    let taskGetter = window.localStorage.getItem("TasksDone"),
      presentTasks = window.localStorage.getItem("PresentTasks");

    if (taskGetter != null) setDone(JSON.parse(taskGetter) as taskData[]);

    if (presentTasks != null)
      if ((JSON.parse(presentTasks) as task[]).length != 0)
        setTasks(JSON.parse(presentTasks));
  }, []);
  useEffect(() => {
    setCounter(tasks.filter((task) => task.status == "Complete").length);
  }, [tasks, finishedTasks]);
  // --> Update summary data in total
  useEffect(() => {
    //Present Tasks and total tasks done
    if (tasksdone.length == 0) {
      setDone([
        {
          day: dayValue(),
          tasks: tasks.filter((task) => task.status == "Complete").length,
        },
      ]);
    } else {
      let finder = tasksdone.find((days) => days.day == dayValue());
      if (finder) {
        setDone(
          tasksdone.map((days) => {
            if (days.day == finder.day) {
              return {
                day: finder.day,
                tasks: finishedTasks,
              };
            } else {
              return days;
            }
          })
        );
      }
    }
    window.localStorage.setItem("TasksDone", JSON.stringify(tasksdone));
    window.localStorage.setItem("PresentTasks", JSON.stringify(tasks));
  }, [tasks, minutes]);

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
            ref={taskRef}
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
