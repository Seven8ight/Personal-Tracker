//Stores background-specified, timer on, and tasks applied for the moment and handles local storage
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTimes } from "./PomodoroSettings";

type timer = {
  type: "short break" | "long break" | "focus";
  minutes: number;
  seconds: number;
};
type task = {
  name: string;
  status: "Complete" | "Incomplete";
};
type data = {
  summaryTasks: dayTasks[];
  summaryTHandler: Dispatch<SetStateAction<dayTasks[]>>;
  summaryTimes: timeTaken[];
  summaryTimeHandler: Dispatch<SetStateAction<timeTaken[]>>;
  presentTasks: task[];
  activeTasksHandler: Dispatch<SetStateAction<task[]>>;
  timer: timer;
  timeHandler: Dispatch<SetStateAction<timer>>;
  backgroundId: number | null;
  backgroundHandler: Dispatch<SetStateAction<number | null>>;
};
type dayTasks = {
  Day: string;
  taskCount: number;
};
type timeTaken = {
  Day: string;
  timeInhours: number;
};
//timer and tasks hold for days
const Storage = createContext<data>({
  summaryTasks: [],
  summaryTHandler: () => {},
  summaryTimes: [],
  summaryTimeHandler: () => {},
  presentTasks: [],
  activeTasksHandler: () => {},
  timer: {
    type: "focus",
    minutes: 45,
    seconds: 0,
  },
  timeHandler: () => {},
  backgroundId: 1,
  backgroundHandler: () => {},
});

export const useStorage = () => {
  const {
    summaryTasks,
    summaryTHandler,
    summaryTimes,
    summaryTimeHandler,
    presentTasks,
    activeTasksHandler,
    timer,
    timeHandler,
    backgroundId,
    backgroundHandler,
  } = useContext(Storage);

  return {
    summaryTasks,
    summaryTHandler,
    summaryTimes,
    summaryTimeHandler,
    presentTasks,
    activeTasksHandler,
    timer,
    timeHandler,
    backgroundId,
    backgroundHandler,
  };
};

const StorageHandler = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const { defaults } = useTimes();
  //Current tasks
  const [tasks, setTasks] = useState<task[]>([]),
    [timer, setTimer] = useState<timer>({
      type: "focus",
      minutes: defaults.focus,
      seconds: 0,
    }),
    [backgroundId, setBId] = useState<number | null>(null);
  //Summary Data
  const [DayTasks, setDTasks] = useState<dayTasks[]>([]),
    [DayTimes, setTimes] = useState<timeTaken[]>([]);

  //Getter
  useEffect(() => {
    let backgroundId = window.localStorage.getItem("BackgroundId"),
      tasksSoFar = window.localStorage.getItem("TasksDone"),
      timeSoFar = window.localStorage.getItem("TimeSoFar");
    if (typeof backgroundId == "string") setBId(Number.parseInt(backgroundId));

    if (typeof tasksSoFar == "string")
      if ((JSON.parse(tasksSoFar) as dayTasks[]).length != 0)
        setDTasks(JSON.parse(tasksSoFar) as dayTasks[]);

    if (typeof timeSoFar == "string")
      if ((JSON.parse(timeSoFar) as timeTaken[]).length != 0)
        setTimes(JSON.parse(timeSoFar) as timeTaken[]);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("Summary Tasks", JSON.stringify(DayTasks));
    window.localStorage.setItem("Present Tasks", JSON.stringify(tasks));
    window.localStorage.setItem(
      "BackgroundId",
      typeof backgroundId == "number" ? backgroundId.toString() : (1).toString()
    );
    window.localStorage.setItem("Summary Time", JSON.stringify(DayTimes));
    window.localStorage.setItem("Present Time", JSON.stringify(timer));
  }, [backgroundId, DayTasks, DayTimes, tasks, timer]);

  useEffect(() => {
    if (backgroundId != null)
      window.localStorage.setItem("backgroundId", backgroundId.toString());
  }, [backgroundId]);

  return (
    <Storage.Provider
      value={{
        summaryTasks: DayTasks,
        summaryTHandler: setDTasks,
        summaryTimes: DayTimes,
        summaryTimeHandler: setTimes,
        presentTasks: tasks,
        activeTasksHandler: setTasks,
        timer: timer,
        timeHandler: setTimer,
        backgroundId: backgroundId,
        backgroundHandler: setBId,
      }}
    >
      {children}
    </Storage.Provider>
  );
};

export default StorageHandler;
